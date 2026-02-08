import { Role } from "@/app/types/account.interface";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ActionsCell from "../../shared-components/table/actionCell";

export default function getGridColDef(userRole: Role, userId: string): GridColDef[] {
    let roleEditable: boolean;
    if (userRole === "Admin") roleEditable = true;
    else roleEditable = false;
    const edit = (params: GridRenderCellParams): boolean => {
        return (
            (userRole === "User" && userRole === params.row.id) ||
            (userRole === "Manager" &&
                (userId === params.row.id ||
                    params.row.role === "User")) ||
            userRole === "Admin"
        );
    };
    return [
        { field: "id", headerName: "id", type: "string", editable: false },
        { field: "name", headerName: "Name", width: 180, editable: true },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            width: 80,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "email",
            headerName: "Email",
            type: "string",
            width: 180,
            editable: true,
        },
        {
            field: "role",
            headerName: "Role",
            width: 120,
            editable: roleEditable,
            type: "singleSelect",
            valueOptions: ["Admin", "Manager", "User"],
        },
        {
            field: "status",
            headerName: "Status",
            width: 90,
            editable: true,
            type: "singleSelect",
            valueOptions: ["Online", "Offline"],
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            renderCell: (params: GridRenderCellParams) =>
                edit(params) ? (
                    <ActionsCell props={params} deletable={userRole === "Admin"} />
                ) : null,
        },
    ];
}