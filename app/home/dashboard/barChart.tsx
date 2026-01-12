import * as React from "react";
import { Button, ButtonGroup, Grid2 } from "@mui/material";
import { useState } from "react";
import SelectBoard from "./components/selectBoard";
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

export default function barChart({
    companyData,
}: {
    companyData: CompanyData;
}) {
    const [dimension, setDimension] = useState<"level" | "country" | "city">(
        "level"
    );
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
    }, [filter, dimension]);

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
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <ButtonGroup
                    variant="text"
                    aria-label="Dimension Button Group"
                    fullWidth
                >
                    <Button onClick={() => setDimension("level")}>Level</Button>
                    <Button onClick={() => setDimension("country")}>
                        Country
                    </Button>
                    <Button onClick={() => setDimension("city")}>City</Button>
                </ButtonGroup>
            </Grid2>
            <Grid2 size={9}>
                <Bar options={options} data={data} />
            </Grid2>
            <Grid2 size={3}>
                <SelectBoard setFilter={setFilter} companyData={companyData} />
            </Grid2>
        </Grid2>
    );
}
