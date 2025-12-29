import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import readCompanyCsv, { RowData } from "../../api/companyCsvReader";

const UserType = {
  Regular: 0,
  Detail: 1,
};

const columns: GridColDef[] = [
  {
    field: "company_code",
    headerName: "Code",
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 2,
  },
  {
    field: "company_name",
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
      return row.annual_revenue / row.employees;
    },
    valueFormatter: (value?: number) => {
      if (value == null) {
        return "";
      }
      return `${value.toFixed(2).toLocaleString()}`;
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
    field: "founded_year",
    headerName: "Founded Year",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "annual_revenue",
    headerName: "Annual Revenue",
    type: "number",
    headerAlign: "center",
    align: "right",
    flex: 1,
  },
  {
    field: "employees",
    headerName: "Employee",
    type: "number",
    headerAlign: "center",
    align: "right",
    flex: 1,
  },
];

export default function ColumnSelectorDisabledGrid() {
  const [userType, setUserType] = React.useState(UserType.Regular);
  const [rows, setRows] = React.useState<RowData[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await readCompanyCsv();
        setRows(data.rows);
      } catch (error) {
        console.error("Error loading CSV data:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columnVisibilityModel = React.useMemo(() => {
    if (userType === UserType.Detail) {
      return {
        company_code: false,
        company_name: true,
        level: true,
        country: true,
        annualRevenuePerEmployee: true,
        city: true,
        founded_year: true,
        annual_revenue: true,
        employees: true,
      };
    }
    return {
      company_code: false,
      company_name: true,
      level: true,
      country: true,
      annualRevenuePerEmployee: true,
      city: false,
      founded_year: false,
      annual_revenue: false,
      employees: false,
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
        loading={loading}
        getRowId={(row) => row.company_code}
        disableColumnSelector
        columnVisibilityModel={columnVisibilityModel}
        sx={{ width: 900, height: 450 }}
        showToolbar
      />
    </Box>
  );
}
