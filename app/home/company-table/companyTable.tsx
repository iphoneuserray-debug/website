import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const UserType = {
  Regular: 0,
  Detail: 1,
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 2,
  },
  {
    field: "level",
    headerName: "Level",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
  {
    field: "country",
    headerName: "Country",
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "annualRevenuePerEmployee",
    headerName: "Annual Revennue Per Employee",
    type: "number",
    headerAlign: "center",
    align: "right",
    valueGetter: (value, row) => {
      return row.annualRevenue / row.employee;
    },
    flex: 1,
  },
  {
    field: "city",
    headerName: "City",
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 1.5,
  },
  {
    field: "foundedYear",
    headerName: "Founded Year",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "annualRevenue",
    headerName: "Annual Revenue",
    type: "number",
    headerAlign: "center",
    align: "right",
    flex: 1,
  },
  {
    field: "employee",
    headerName: "Employee",
    type: "number",
    headerAlign: "center",
    align: "right",
    flex: 1,
  },
];

export default function ColumnSelectorDisabledGrid() {
  const [userType, setUserType] = React.useState(UserType.Regular);

  const rows = [
    {
      id: 1,
      name: "TechNova Solutions",
      level: 3,
      country: "United States",
      city: "San Francisco",
      foundedYear: 2015,
      annualRevenue: 8500000,
      employee: 145,
    },
    {
      id: 2,
      name: "Global Motors Inc",
      level: 4,
      country: "Germany",
      city: "Stuttgart",
      foundedYear: 1980,
      annualRevenue: 42500000,
      employee: 2800,
    },
    {
      id: 3,
      name: "BioHealth Pharma",
      level: 2,
      country: "Switzerland",
      city: "Zurich",
      foundedYear: 2008,
      annualRevenue: 12000000,
      employee: 320,
    },
    {
      id: 4,
      name: "Green Energy Corp",
      level: 3,
      country: "Denmark",
      city: "Copenhagen",
      foundedYear: 2012,
      annualRevenue: 7500000,
      employee: 180,
    },
    {
      id: 5,
      name: "FinSecure Bank",
      level: 5,
      country: "United Kingdom",
      city: "London",
      foundedYear: 1995,
      annualRevenue: 68000000,
      employee: 4200,
    },
  ];

  const columnVisibilityModel = React.useMemo(() => {
    if (userType === UserType.Detail) {
      return {
        name: true,
        level: true,
        country: true,
        annualRevenuePerEmployee: true,
        city: true,
        foundedYear: true,
        annualRevenue: true,
        employee: true,
      };
    }
    return {
      name: true,
      level: true,
      country: true,
      annualRevenuePerEmployee: true,
      city: false,
      foundedYear: false,
      annualRevenue: false,
      employee: false,
    };
  }, [userType]);

  return (
    <Box
      height="auto"
      width="100%"
      sx={{ display: "grid", justifyItems: "end", pb: 1 }}
    >
      <FormControl
        sx={{
          width: "200px",
          pb: 1,
        }}
      >
        <InputLabel id="demo-simple-select-label">Table Type</InputLabel>
        <Select
          labelId="demo-user-type-label"
          id="demo-user-type"
          value={userType}
          label="User Type"
          size="small"
          onChange={(event: SelectChangeEvent<number>) => {
            setUserType(event.target.value as number);
          }}
        >
          <MenuItem value={UserType.Regular}>Regular</MenuItem>
          <MenuItem value={UserType.Detail}>Detail</MenuItem>
        </Select>
      </FormControl>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnSelector
        columnVisibilityModel={columnVisibilityModel}
        sx={{ width: 900, height: 450 }}
        showToolbar
      />
    </Box>
  );
}
