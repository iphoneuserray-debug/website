import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BarChart from "./chart/barChart";
import { Paper } from "@mui/material";
import BubbleChart from "./chart/bubbleChart";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

// Accessibility helpers for tab ids
function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

// Switchable chart tabs (bar/bubble)
export default function ChartTab() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper
            sx={{
                bgcolor: "background.paper",
                width: "90vw",
                minHeight: "600px",
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Bar Chart" {...a11yProps(0)} />
                    <Tab label="Bubble Chart" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <BarChart/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <BubbleChart/>
            </TabPanel>
        </Paper>
    );
}
