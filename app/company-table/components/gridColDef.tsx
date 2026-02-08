import { Role } from "@/app/types/account.interface";
import { GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import ActionsCell from "../../shared-components/table/actionCell";

export default function getGridColDef(userRole: Role): GridColDef[] {
    const edit = userRole === "Manager" || userRole === "Admin";

    return [
        {
            field: "company_code",
            headerName: "Code",
            type: "string",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            editable: false
        },
        {
            field: "company_name",
            headerName: "Name",
            type: "string",
            headerAlign: "center",
            align: "center",
            flex: 2,
            minWidth: 150,
            editable: true,
        },
        {
            field: "level",
            headerName: "Level",
            type: "number",
            headerAlign: "center",
            align: "center",
            flex: 0.8,
            minWidth: 80,
            editable: true,
        },
        {
            field: "country",
            headerName: "Country",
            type: "string",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            editable: true,
        },
        {
            field: "annualRevenuePerEmployee",
            headerName: "Annual Revenue Per Employee",
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
            flex: 1.2,
            minWidth: 90,
            editable: false
        },
        {
            field: "city",
            headerName: "City",
            type: "string",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            editable: true,
        },
        {
            field: "founded_year",
            headerName: "Founded Year",
            type: "number",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 90,
            editable: true,
        },
        {
            field: "annual_revenue",
            headerName: "Annual Revenue",
            type: "number",
            headerAlign: "center",
            align: "right",
            flex: 1.2,
            minWidth: 90,
            editable: true,
        },
        {
            field: "employees",
            headerName: "Employee",
            type: "number",
            headerAlign: "center",
            align: "right",
            flex: 1,
            minWidth: 100,
            editable: true,
        },
        ...(edit ? [{
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 120,
            cellClassName: "actions",
            renderCell: (params: GridRenderCellParams) =>
                (<ActionsCell props={params} deletable={userRole === "Admin" || userRole === "Manager"} />),
        }] : []),
    ];
}