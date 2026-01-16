"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlotProps,
    Toolbar,
    ToolbarButton,
    GridSlots,
    gridEditRowsStateSelector,
    useGridSelector,
    useGridApiContext,
    GridActionsCell,
    GridRenderCellParams,
    GridActionsCellItem,
} from "@mui/x-data-grid";

import { randomId } from "@mui/x-data-grid-generator";
import { Account } from "@/app/api/account";
import { initialRows } from "@/app/api/user";

declare module "@mui/x-data-grid" {
    interface ToolbarPropsOverrides {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        setRowModesModel: (
            newModel: (oldModel: GridRowModesModel) => GridRowModesModel
        ) => void;
    }
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [
            ...oldRows,
            { id, name: "", age: "", role: "", isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    return (
        <Toolbar>
            <Tooltip title="Add record">
                <ToolbarButton onClick={handleClick}>
                    <AddIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>
        </Toolbar>
    );
}

interface ActionHandlers {
    handleCancelClick: (id: GridRowId) => void;
    handleDeleteClick: (id: GridRowId) => void;
    handleEditClick: (id: GridRowId) => void;
    handleSaveClick: (id: GridRowId) => void;
}

const ActionHandlersContext = React.createContext<ActionHandlers>({
    handleCancelClick: () => {},
    handleDeleteClick: () => {},
    handleEditClick: () => {},
    handleSaveClick: () => {},
});

function ActionsCell({
    props,
    role,
}: {
    props: GridRenderCellParams;
    role: "Admin" | "User" | "Manager";
}) {
    const apiRef = useGridApiContext();
    const rowModesModel = useGridSelector(apiRef, gridEditRowsStateSelector);
    const isInEditMode = typeof rowModesModel[props.id] !== "undefined";

    const {
        handleSaveClick,
        handleCancelClick,
        handleEditClick,
        handleDeleteClick,
    } = React.useContext(ActionHandlersContext);

    return (
        <GridActionsCell {...props}>
            {isInEditMode ? (
                <React.Fragment>
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        material={{ sx: { color: "primary.main" } }}
                        onClick={() => handleSaveClick(props.id)}
                    />
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={() => handleCancelClick(props.id)}
                        color="inherit"
                    />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleEditClick(props.id)}
                        color="inherit"
                    />
                    {role === "Admin" ? (
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => handleDeleteClick(props.id)}
                            color="inherit"
                        />
                    ) : null}
                </React.Fragment>
            )}
        </GridActionsCell>
    );
}

function getGridColDef(userInfo: Account): GridColDef[] {
    let roleEditable: boolean;
    if (userInfo.role === "Admin") roleEditable = true;
    else roleEditable = false;
    const edit = (params: GridRenderCellParams): boolean => {
        return (
            (userInfo.role === "User" && userInfo.id === params.row.id) ||
            (userInfo.role === "Manager" &&
                (userInfo.id === params.row.id ||
                    params.row.role === "User")) ||
            userInfo.role === "Admin"
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
                    <ActionsCell props={params} role={userInfo.role} />
                ) : null,
        },
    ];
}

export default function UserTable({ userInfo }: { userInfo: Account }) {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

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
            handleDeleteClick: (id: GridRowId) => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
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
        []
    );

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
        );
        return updatedRow;
    };

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
                    rows={rows}
                    columns={getGridColDef(userInfo)}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    isCellEditable={(params) => {
                        return (
                            (userInfo.role === "User" &&
                                userInfo.id === params.row.id) ||
                            (userInfo.role === "Manager" &&
                                (userInfo.id === params.row.id ||
                                    params.row.role === "User")) ||
                            userInfo.role === "Admin"
                        );
                    }}
                    onRowModesModelChange={setRowModesModel}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    showToolbar={userInfo.role !== "User"}
                    slots={{ toolbar: EditToolbar as GridSlots["toolbar"] }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    sx={{ width: 900, height: 450 }}
                />
            </ActionHandlersContext.Provider>
        </Box>
    );
}
