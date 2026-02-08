import { GridRowId } from "@mui/x-data-grid";
import React from "react";

export interface ActionHandlers {
    handleCancelClick: (id: GridRowId) => void;
    handleDeleteClick: (id: GridRowId) => void;
    handleEditClick: (id: GridRowId) => void;
    handleSaveClick: (id: GridRowId) => void;
}

export const ActionHandlersContext = React.createContext<ActionHandlers>({
    handleCancelClick: () => {},
    handleDeleteClick: () => {},
    handleEditClick: () => {},
    handleSaveClick: () => {},
});