import { useEffect, useState } from "react";
import Selector from "./selector";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import RangeSlider from "./slider";
import CompanyData from "@/app/api/CompanyData";
import { Filter } from "../../../api/requestProps";

export default function SelectBoard({
    setFilter,
    companyData,
}: {
    setFilter: (value: React.SetStateAction<Filter | undefined>) => void;
    companyData: CompanyData;
}) {
    const [level, setLevel] = useState<Array<string>>([]);
    const [country, setCountry] = useState<Array<string>>([]);
    const [city, setCity] = useState<Array<string>>([]);
    const [foundYear, setFoundYear] = useState<number[]>([-1, -1]);
    const [annualRevenue, setAnnualRevenue] = useState<number[]>([-1, -1]);
    const [employee, setEmployee] = useState<number[]>([-1, -1]);

    const handleClick = () => {
        const filter: Filter = {
            level: level
                .slice()
                .map((value) => parseInt(value.replace(/\D/g, ""))),
            country: country,
            city: city,
            founded_year: {
                min: foundYear[0],
                max: foundYear[1],
            },
            annual_revenue: {
                min: annualRevenue[0],
                max: annualRevenue[1],
            },
            employees: {
                min: employee[0],
                max: employee[1],
            },
        };
        console.log(filter);
        setFilter(filter);
    };

    const handleRefresh = () => {
        setLevel([]);
        setCountry([]);
        setCity([]);
        setFoundYear([-1, -1]);
        setAnnualRevenue([-1, -1]);
        setEmployee([-1, -1]);
        const filter: Filter = {
            level: [],
            country: [],
            city: [],
            founded_year: {
                min: -1,
                max: -1,
            },
            annual_revenue: {
                min: -1,
                max: -1,
            },
            employees: {
                min: -1,
                max: -1,
            },
        };
        setFilter(filter);
    };

    return (
        <Stack spacing={1}>
            <Box height={20}></Box>
            <Selector
                field="level"
                value={companyData.level
                    .slice()
                    .map((value) => "Level " + value.toString())}
                handleChange={setLevel}
            />
            <Selector
                field="country"
                value={companyData.country}
                handleChange={setCountry}
            />
            <Selector
                field="city"
                value={companyData.city}
                handleChange={setCity}
            />
            <RangeSlider
                field="Found Year"
                min={companyData.yearRange[0]}
                max={companyData.yearRange[1]}
                handleChange={setFoundYear}
            />
            <RangeSlider
                field="Annual Revenue"
                min={companyData.revenueRengeAndEmployeeRange.revenue.min}
                max={companyData.revenueRengeAndEmployeeRange.revenue.max}
                handleChange={setAnnualRevenue}
            />
            <RangeSlider
                field="Employee"
                min={companyData.revenueRengeAndEmployeeRange.employee.min}
                max={companyData.revenueRengeAndEmployeeRange.employee.max}
                handleChange={setEmployee}
            />

            <Button variant="contained" onClick={handleClick} size="small">
                Done
            </Button>
            <Button variant="outlined" onClick={handleRefresh} size="small">
                Refresh
            </Button>
        </Stack>
    );
}
