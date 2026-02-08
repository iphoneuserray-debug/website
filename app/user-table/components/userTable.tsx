"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridRowId,
    GridRowModel,
    GridSlots,
} from "@mui/x-data-grid";
import { Role } from "@/app/types/account.interface";
import { useEffect } from "react";
import { ActionHandlers, ActionHandlersContext } from "../../shared-components/table/actionHandlers";
import getGridColDef from "./gridColDef";
import EditToolbar from "../../shared-components/table/editToolbar";
import { handleRowEditStop } from "../../shared-components/table/handleRowEditStop";
import request from "@/app/utils/request";

export default function UserTable({ userRole, userId }: { userRole: Role, userId: string }) {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [loading, setLoading] = React.useState(true);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {},
    );

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await request(`/users`);
                setRows(data);
            } catch (err) {
                console.error("Failed to load users:", err);
                setRows([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
                try {
                    await request(`/users/${id}`, {
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
                    const editedRow = prevRows.find((row) => row.id === id);
                    if (editedRow!.isNew) {
                        return prevRows.filter((row) => row.id !== id);
                    }
                    return prevRows;
                });
            },
        }),
        [],
    );

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = {
            ...newRow,
            isNew: false,
            id: newRow.id,
            age: typeof newRow.age === "number" ? newRow.age : Number(newRow.age) || 0,
            email: newRow.email,
            name: newRow.name,
            status: newRow.status ?? "Offline",
        };
        const { isNew, ...payload } = updatedRow;
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)),
        );

        try {
            await request(`/users`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            console.error("Failed to save user:", err);
        }
        return updatedRow;
    };

    function randomId() {
        return `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }

    return (
        <Box
            sx={{
                width: "100%",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            <ActionHandlersContext.Provider value={actionHandlers}>
                <DataGrid
                    sx={{ width: 900, height: 450 }}
                    rows={rows}
                    columns={getGridColDef(userRole, userId).filter(Boolean)}
                    loading={loading}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    isCellEditable={(params) => {
                        const canEditRow =
                            (userRole === "User" && userId === params.row.id) ||
                            (userRole === "Manager" &&
                                (userId === params.row.id ||
                                    params.row.role === "User")) ||
                            userRole === "Admin";

                        if (!canEditRow) return false;

                        if (params.field === "email") {
                            return Boolean(params.row?.isNew);
                        }

                        return true;
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
                                id: randomId(),
                                name: "",
                                age: 0,
                                email: "",
                                role: "User",
                                status: "Offline",
                                isNew: true,
                            }
                        },
                    }}

                />
            </ActionHandlersContext.Provider>
        </Box>
    );
}
