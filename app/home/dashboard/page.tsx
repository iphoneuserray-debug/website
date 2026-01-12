"use client";
import * as React from "react";
import { useEffect } from "react";
import { CircularProgress, Paper, Stack } from "@mui/material";
import MenuAppBar from "../menuAppBar";
import DataCard from "./components/dataCard";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import CompanyData from "@/app/api/CompanyData";
import { Doughnut, Line } from "react-chartjs-2";
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
import ChartTab from "./chartTab";

export default function DashboardPage() {
    const [companyData, setCompanyData] = React.useState<CompanyData>();
    const [loading, setLoading] = React.useState(true);

    let companyCount = NaN;
    let totalEmployee = NaN;
    let totalRevenue = NaN;
    let countryCount = NaN;
    let level = new Array<number>();
    let yearList = new Array<string>();
    let companyByYear = new Array<number>();
    let levelList = new Array<string>();

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await CompanyData.getInstance();
                setCompanyData(data);
            } catch (error) {
                console.error("Error loading CSV data:", error);
                setCompanyData(undefined);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);
    if (loading) {
        return (
            <MenuAppBar>
                <CircularProgress />
            </MenuAppBar>
        );
    }

    if (companyData === undefined) {
        return (
            <MenuAppBar>
                <h1>Data Fetch Error</h1>
            </MenuAppBar>
        );
    }
    if (companyData !== undefined) {
        companyCount = companyData.totalCompany;
        totalEmployee = companyData.totalEmployee;
        totalRevenue = companyData.totalRevenue;
        countryCount = companyData.country.length;
        level = companyData.levelData;
        const result = companyData.getAccumulativeCompanyByYearData();
        yearList = result.yearList;
        companyByYear = result.companyByYear;
        levelList = companyData.level
            .slice()
            .map((value) => "Level " + value.toString());
    }

    Chart.register(
        ArcElement,
        Tooltip,
        Legend,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title
    );

    const doughnutData = {
        datasets: [
            {
                label: "# of Company",
                data: level,
                backgroundColor: [
                    "rgba(99, 255, 146, 1)",
                    "rgba(54, 163, 235, 1)",
                    "rgba(255, 207, 86, 1)",
                    "rgba(255, 86, 86, 1)",
                ],
            },
        ],

        labels: levelList,
    };

    const options = {
        responsive: true,
        cutout: "60%",
        radius: "80%",
    };

    const lineData = {
        labels: yearList,

        datasets: [
            {
                label: "Company number per year",
                data: companyByYear,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                fill: true,
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    return (
        <MenuAppBar>
            <Stack alignItems={"center"} spacing={2}>
                <Paper elevation={1} sx={{ width: "75vw" }}>
                    <Line data={lineData} />
                </Paper>
                <Stack spacing={3} direction={"row"} alignContent={"baseline"}>
                    <Stack padding={2} spacing={3}>
                        <DataCard
                            cardTitle="Company Number"
                            cardData={companyCount}
                            icon={
                                <ApartmentRoundedIcon
                                    color="info"
                                    sx={{ fontSize: 90 }}
                                />
                            }
                        />
                        <DataCard
                            cardTitle="Revenue"
                            cardData={totalRevenue}
                            icon={
                                <PaidRoundedIcon
                                    color="info"
                                    sx={{ fontSize: 90 }}
                                />
                            }
                        />
                        <DataCard
                            cardTitle="Country"
                            cardData={countryCount}
                            icon={
                                <PublicRoundedIcon
                                    color="info"
                                    sx={{ fontSize: 90 }}
                                />
                            }
                        />
                        <DataCard
                            cardTitle="Employee"
                            cardData={totalEmployee}
                            icon={
                                <PeopleAltRoundedIcon
                                    color="info"
                                    sx={{ fontSize: 90 }}
                                />
                            }
                        />
                    </Stack>

                    <Paper elevation={1} sx={{ width: "40vw" }}>
                        <Doughnut data={doughnutData} options={options} />
                    </Paper>
                </Stack>
                <ChartTab companyData={companyData} />
            </Stack>
        </MenuAppBar>
    );
}
