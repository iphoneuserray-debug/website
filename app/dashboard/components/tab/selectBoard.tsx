import { useState, useEffect } from "react";
import Selector from "./selector";
import { Box, Button, Stack } from "@mui/material";
import RangeSlider from "./slider";
import { Filter } from "../../../types/filter.interface";
import request from "@/app/utils/request";

interface Panel {
    level: number[];
    country: string[];
    city: string[];
    year: { min: number; max: number };
    revenue: { min: number; max: number };
    employee: { min: number; max: number };
};

export default function SelectBoard({
    setFilter,
}: {
    setFilter: (value: React.SetStateAction<Filter | undefined>) => void;
}) {
    const [level, setLevel] = useState<Array<string>>([]);
    const [country, setCountry] = useState<Array<string>>([]);
    const [city, setCity] = useState<Array<string>>([]);
    const [foundYear, setFoundYear] = useState<number[]>([-1, -1]);
    const [annualRevenue, setAnnualRevenue] = useState<number[]>([-1, -1]);
    const [employee, setEmployee] = useState<number[]>([-1, -1]);
    const [panel, setPanel] = useState<Panel | undefined>(undefined);

    useEffect(() => {
        const loadPanel = async () => {
            try {
                const data = await request(`/companies/panel`);
                setPanel(data as Panel);
            } catch (err) {
                console.error("Failed to load panel:", err);
                setPanel(undefined);
            }
        };
        loadPanel();
    }, []);

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
        setFilter(filter);
    };

    const handleRefresh = () => {
        setLevel([]);
        setCountry([]);
        setCity([]);
        setFoundYear([-1, -1]);
        setAnnualRevenue([-1, -1]);
        setEmployee([-1, -1]);
        setFilter(undefined);
    };

    return (
        <Stack spacing={1}>
            <Box height={20}></Box>
            <Selector
                field="level"
                value={
                    panel
                        ? panel.level
                            .slice()
                            .map((value) => "Level " + value.toString())
                        : []
                }
                handleChange={setLevel}
                selected={level}
            />
            <Selector
                field="country"
                value={panel ? panel.country : []}
                handleChange={setCountry}
                selected={country}
            />
            <Selector
                field="city"
                value={panel ? panel.city : []}
                handleChange={setCity}
                selected={city}
            />
            <RangeSlider
                field="Found Year"
                min={panel ? panel.year.min : -1}
                max={panel ? panel.year.max : -1}
                handleChange={setFoundYear}
                selected={foundYear}
            />
            <RangeSlider
                field="Annual Revenue"
                min={panel ? panel.revenue.min : -1}
                max={panel ? panel.revenue.max : -1}
                handleChange={setAnnualRevenue}
                selected={annualRevenue}
            />
            <RangeSlider
                field="Employee"
                min={panel ? panel.employee.min : -1}
                max={panel ? panel.employee.max : -1}
                handleChange={setEmployee}
                selected={employee}
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
