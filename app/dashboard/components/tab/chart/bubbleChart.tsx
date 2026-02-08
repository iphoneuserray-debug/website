import { Filter } from "../../../../types/filter.interface";
import { Box, Grid2, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectBoard from "../selectBoard";
import { TreeNode } from "../../../../types/tree.interface";
import Bubble from "./bubble";
import { Company } from "@/app/types/company.interface";
import { digitFormater } from "@/app/utils/digitFormater";
import request from "@/app/utils/request";

async function getRelation(filter: Filter | undefined): Promise<TreeNode> {
    try {
        const url = filter ? `?filter=${encodeURIComponent(JSON.stringify(filter))}` : ``;
        return await request(`/relations${url}`);
    } catch (error) {
        console.error("Error loading bubble chart data:", error);
        throw error;
    }
}

export default function BubbleChart() {
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = useState<Filter>();
    const [data, setData] = useState<TreeNode>();
    const [currentNode, setCurrentNode] = useState<Company>();
    const [cardText, setCardText] = useState<String>();
    const [rows, setRows] = useState<Company[]>([]);
    const [level, setLevel] = useState<number>(0);

    // Async function handler
    React.useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const result = (await request(`/companies`)) as Company[];
                setRows(result);

                const levelNum = await request(`/companies/level`);
                const level = Number(levelNum);
                setLevel(level);
                setData(await getRelation(filter));
            } catch (error) {
                console.error("Error loading CSV data:", error);
                setData(undefined);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                setData(await getRelation(filter));
            } catch (error) {
                console.error("Error loading bar chart data:", error);
            }
        };
        load();
    }, [filter]);

    // Show the company info on right handside
    useEffect(() => {
        JSON.stringify(currentNode);
        if (!currentNode) {
            setCardText("");
            return;
        }
        const annual_revenue = digitFormater(currentNode.annual_revenue);
        const employees = digitFormater(currentNode.employees);
        setCardText(
            "Company: " +
            currentNode.company_name +
            "\nLevel: " +
            currentNode.level +
            "\nCountry: " +
            currentNode.country +
            "\nCity: " +
            currentNode.city +
            "\nFounded Year: " +
            currentNode.founded_year +
            "\nAnnual Revenue: " +
            annual_revenue.num +
            annual_revenue.unit +
            "\nEmployees: " +
            employees.num +
            employees.unit
        );
    }, [currentNode]);

    if (loading)
        return (
            <Box sx={{ width: "100%" }}>
                <LinearProgress />
            </Box>
        );
    if (data === undefined) return <></>;

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={9}>
                <Bubble
                    data={data}
                    changeHandler={setCurrentNode}
                    rows={rows}
                    level={level}
                />
            </Grid2>
            <Grid2 size={3} sx={{ display: "flex", flexDirection: "column" }}>
                <SelectBoard setFilter={setFilter} />
                <Box
                    sx={{
                        whiteSpace: "pre-wrap",
                        mt: "auto",
                    }}
                >
                    {cardText}
                </Box>
            </Grid2>
        </Grid2>
    );
}
