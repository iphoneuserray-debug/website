import * as React from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import SelectBoard from "./selectBoard";
import CompanyData from "@/app/api/CompanyData";
import SubTab from "./subTab";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({
    companyData: CompanyData,
}: {
    companyData: CompanyData | undefined;
}): React.ReactNode {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    if (CompanyData === undefined)
        return (
            <Paper elevation={1}>
                <p>Data fetch failed</p>
            </Paper>
        );

    return (
        <Paper elevation={1}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs for multiple dimensional tables"
                >
                    <Tab label="Level" {...a11yProps(0)} />
                    <Tab label="Country" {...a11yProps(1)} />
                    <Tab label="City" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <SubTab dimension="level" companyData={CompanyData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SubTab dimension="country" companyData={CompanyData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <SubTab dimension="city" companyData={CompanyData} />
            </CustomTabPanel>
        </Paper>
    );
}
