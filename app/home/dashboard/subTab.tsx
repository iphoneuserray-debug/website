import * as React from "react";
import { Box, Grid2 } from "@mui/material";
import { useState } from "react";
import SelectBoard from "./selectBoard";
import {
    Filter,
    handleUndefinedFilter,
    parseChartData,
    requestBarChartData,
    RequstProps,
} from "../../api/requestProps";
import {
    BarElement,
    CategoryScale,
    Chart,
    ChartData,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import CompanyData from "@/app/api/CompanyData";
import { Bar } from "react-chartjs-2";

export default function SubTab({
    dimension,
    companyData,
}: {
    dimension: "level" | "country" | "city";
    companyData: CompanyData;
}) {
    const [filter, setFilter] = useState<Filter>();
    const [data, setData] = useState<
        ChartData<"bar", (number | [number, number] | null)[], unknown>
    >({
        labels: [],
        datasets: [{ data: [] }],
    });

    // When filter change set data for bar chart
    React.useEffect(() => {
        console.log(filter);
        setFilter(handleUndefinedFilter(filter));
        const request: RequstProps = {
            dimension: dimension,
            filter: filter as Filter,
        };
        const map = requestBarChartData(request, companyData);
        setData(parseChartData(map));
    }, [filter]);

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Company Count by ${dimension}`,
            },
            legend: {
                display: false,
            },
        },
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
    };
    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    return (
        <Grid2 container spacing={2} width={"80vw"}>
            <Grid2 size={9} spacing={2}>
                <Bar options={options} data={data} />
            </Grid2>
            <Grid2 size={3}>
                <SelectBoard setFilter={setFilter} companyData={companyData} />
            </Grid2>
        </Grid2>
    );
}
