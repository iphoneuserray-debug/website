import * as React from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import MultipleSelectChip from "./selector";
import SelectBoard from "./selectionBoard";

interface requst {
  dimension: "level" | "country" | "city";
  filter: {
    level: number[];
    country: string[];
    city: string[];
    founded_year: {
      start: number;
      end: number;
    };
    annual_revenue: {
      min: number;
      max: number;
    };
    employees: {
      min: number;
      max: number;
    };
  };
}

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

export default function BasicTabs(): React.ReactNode {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        <SelectBoard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Paper>
  );
}
