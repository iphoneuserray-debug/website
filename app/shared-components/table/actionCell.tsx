import {
    GridRenderCellParams,
    useGridApiContext,
    useGridSelector,
    gridEditRowsStateSelector,
    GridActionsCell,
    GridActionsCellItem,
} from "@mui/x-data-grid";
import React from "react";
import { ActionHandlersContext } from "./actionHandlers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

export default function ActionsCell({
    props,
    deletable,
}: {
    props: GridRenderCellParams;
    deletable: boolean;
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
                    {deletable ? (
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
