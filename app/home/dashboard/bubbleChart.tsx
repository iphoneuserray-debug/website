import CompanyData from "@/app/api/CompanyData";
import {
    Filter,
    handleUndefinedFilter,
    relationFiltered,
} from "@/app/api/requestProps";
import { Box, Grid2, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectBoard from "./components/selectBoard";
import CompanyRelation from "@/app/api/CompanyRelation";
import { TreeNode } from "@/app/api/tree";
import Bubble from "./bubble";
import { RowData } from "@/app/api/rowData";
import { json } from "d3";
import { digitFormater } from "@/app/api/digitFormater";

export default function BubbleChart({
    companyData,
}: {
    companyData: CompanyData;
}) {
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = useState<Filter>();
    const [data, setData] = useState<TreeNode>();
    const [companyRelation, setCompanyRelation] = useState<CompanyRelation>();
    const [currentNode, setCurrentNode] = useState<RowData>();
    const [cardText, setCardText] = useState<String>();

    // Async function handler
    React.useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const companyRelation = await CompanyRelation.getInstance();
                setCompanyRelation(companyRelation);
                const data = companyRelation.getRelation();
                setData(data);
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
        if (filter === undefined) {
            setFilter(handleUndefinedFilter(filter));
        }
    }, []);

    useEffect(() => {
        if (!filter) return;
        const filtered = relationFiltered(filter!, companyData);
        setData(companyRelation?.getRelation(filtered));
    }, [filter]);

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
                    companyData={companyData}
                    changeHandler={setCurrentNode}
                />
            </Grid2>
            <Grid2 size={3} sx={{ display: "flex", flexDirection: "column" }}>
                <SelectBoard setFilter={setFilter} companyData={companyData} />
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
