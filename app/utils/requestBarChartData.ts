import { Company } from "@/app/types/company.interface";
import { ChartData } from "chart.js";
import { RequstProps } from "../types/filter.interface";
import request from "./request";

export async function requestBarChartData(requestProps: RequstProps):
    Promise<ChartData<"bar", (number | [number, number] | null)[], unknown>> {
    const result = new Map<number | string, number>();
    let companies: Company[];
    try {
        const url = requestProps.filter ? `?filter=${encodeURIComponent(JSON.stringify(requestProps.filter))}` : ``;
        companies = await request(`/companies${url}`);
    } catch (error) {
        console.error("Error loading bar chart data:", error);
        return { datasets: [] };
    }

    for (const row of companies) {

        const dimesionValue = row[requestProps.dimension];
        if (!result.has(dimesionValue)) {
            result.set(dimesionValue, 1);
        } else {
            const newValue = result.get(dimesionValue)! + 1;
            result.set(dimesionValue, newValue)
        }
    };

    return parseChartData(result);

}

// Parse map into chart data
function parseChartData(map: Map<string | number, number>): ChartData<"bar", (number | [number, number] | null)[], unknown> {
    if (!map || map.size === 0) {
        return {
            labels: [],
            datasets: [{ data: [] }]
        };
    }
    // Sort labels
    const unsorted = Array.from(map.keys());
    let sorted: (string | number)[];
    const sortedData = new Array<number>();

    if (unsorted.length > 0 && typeof unsorted[0] === 'number') {
        sorted = unsorted.sort((a, b) => (a as number) - (b as number));
    } else {
        sorted = (unsorted as string[]).sort();
    }

    for (const key of sorted) {
        const value = map.get(key);
        if (value !== undefined) {
            sortedData.push(value);
        }
    }

    const labels = sorted.map(key => key.toString());

    const data = {
        labels: labels,
        datasets: [{ data: sortedData, backgroundColor: '#55b1e2a1' }],

    };
    return data;
}