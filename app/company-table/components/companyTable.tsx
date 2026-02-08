import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { DataGrid, GridRowId, GridRowModel, GridRowModes, GridSlots } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import EditToolbar from "../../shared-components/table/editToolbar";
import { Role } from "@/app/types/account.interface";
import getGridColDef from "./gridColDef";
import { GridRowsProp } from "@mui/x-data-grid";
import { GridRowModesModel } from "@mui/x-data-grid";
import { ActionHandlers, ActionHandlersContext } from "../../shared-components/table/actionHandlers";
import { randomId } from "@mui/x-data-grid-generator";
import { handleRowEditStop } from "../../shared-components/table/handleRowEditStop";
import request from "@/app/utils/request";

const ViewMode = {
    Regular: 0,
    Detail: 1,
};

export default function CompanyTable({ userRole }: { userRole: Role }) {
    const [viewMode, setViewMode] = React.useState(ViewMode.Regular);
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [loading, setLoading] = React.useState(true);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {},
    );

    React.useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setLoading(true);
                const data = await request(`/companies`);
                setRows(data);
            } catch (error) {
                console.error("Error loading companies:", error);
                setRows([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    // Set visibility in two different mode: essential and detailed
    const columnVisibilityModel = React.useMemo(() => {
        if (viewMode === ViewMode.Detail) {
            return {
                company_code: true,
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
    }, [viewMode]);

    const actionHandlers = React.useMemo<ActionHandlers>(
        () => ({
            handleEditClick: (id: GridRowId) => {
                setRowModesModel((prevRowModesModel) => ({
                    ...prevRowModesModel,
                    [id]: { mode: GridRowModes.Edit },
                }));
            },
            handleSaveClick: (id: GridRowId) => {
                setRowModesModel((prevRowModesModel) => ({
                    ...prevRowModesModel,
                    [id]: { mode: GridRowModes.View },
                }));
            },
            handleDeleteClick: async (id: GridRowId) => {
                setRows((prevRows) => prevRows.filter((row) => (row.company_code ?? row.id) !== id));
                try {
                    await request(`/companies/${id}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    });
                } catch (err) {
                    console.error("Failed to delete user:", err);
                }
            },
            handleCancelClick: (id: GridRowId) => {
                setRowModesModel((prevRowModesModel) => {
                    return {
                        ...prevRowModesModel,
                        [id]: {
                            mode: GridRowModes.View,
                            ignoreModifications: true,
                        },
                    };
                });

                setRows((prevRows) => {
                    const editedRow = prevRows.find((row) => (row.company_code ?? row.id) === id);
                    if (editedRow && editedRow.isNew) {
                        return prevRows.filter((row) => (row.company_code ?? row.id) !== id);
                    }
                    return prevRows;
                });
            },
        }),
        [],
    );

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false } as any;
        if (!updatedRow.company_code && updatedRow.id) {
            updatedRow.company_code = updatedRow.id;
        }

        setRows((prevRows) =>
            prevRows.map((row) => ((row.company_code ?? row.id) === (updatedRow.company_code ?? updatedRow.id) ? updatedRow : row)),
        );

        try {
            const {
                isNew,
                id,
                fieldToFocus,
                annualRevenuePerEmployee,
                ...payload
            } = updatedRow;
            await request(`/companies`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            console.error("Failed to save company:", err);
        }

        return updatedRow;
    };

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
                <InputLabel id="demo-simple-select-label">
                    Table Type
                </InputLabel>
                <Select
                    labelId="view-mode"
                    id="view-mode"
                    value={viewMode}
                    label="View Mode"
                    size="small"
                    onChange={(event: SelectChangeEvent<number>) => {
                        setViewMode(event.target.value as number);
                    }}
                >
                    <MenuItem value={ViewMode.Regular}>Regular</MenuItem>
                    <MenuItem value={ViewMode.Detail}>Detail</MenuItem>
                </Select>
            </FormControl>
            <ActionHandlersContext.Provider value={actionHandlers}>
                <DataGrid
                    sx={{ width: 900, height: 450 }}
                    rows={rows}
                    columns={getGridColDef(userRole).filter(Boolean)}
                    loading={loading}
                    getRowId={(row: any) => row.company_code}
                    columnVisibilityModel={columnVisibilityModel}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    isCellEditable={(params) => {
                        return (
                            userRole === "Manager" ||
                            userRole === "Admin"
                        );
                    }}
                    onRowModesModelChange={setRowModesModel}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    showToolbar
                    slots={{ toolbar: EditToolbar as GridSlots["toolbar"] }}
                    slotProps={{
                        toolbar: {
                            setRows,
                            setRowModesModel,
                            editable: userRole !== "User",
                            newInitialRow: {
                                company_code: randomId(),
                                fieldToFocus: "company_name",
                                isNew: true,
                                company_name: "",
                                level: 1,
                                country: "",
                                city: "",
                                founded_year: 0,
                                annual_revenue: 1,
                                employees: 1,
                            },
                        },
                    }}
                />
            </ActionHandlersContext.Provider>
        </Box>
    );
}
