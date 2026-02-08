import * as React from "react";
import { Button, ButtonGroup, Grid2 } from "@mui/material";
import { useState } from "react";
import SelectBoard from "../selectBoard";
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
import { Bar } from "react-chartjs-2";
import { requestBarChartData } from "../../../../utils/requestBarChartData.ts";
import { Filter, RequstProps } from "../../../../types/filter.interface.ts";

export default function barChart() {
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

    // When filter changes, request bar-chart data from backend
    React.useEffect(() => {
        const load = async () => {
            const request: RequstProps = {
                dimension: dimension,
                filter: filter,
            };

            const newdata = await requestBarChartData(request);
            setData(newdata);

        };
        load();
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
                <SelectBoard setFilter={setFilter} />
            </Grid2>
        </Grid2>
    );
}