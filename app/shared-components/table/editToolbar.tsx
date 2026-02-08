import {
    GridSlotProps,
    GridRowModes,
    ToolbarButton,
    Toolbar,
    GridToolbarQuickFilter,
    GridRowModesModel,
    GridRowsProp,
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";

declare module "@mui/x-data-grid" {
    interface ToolbarPropsOverrides {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        setRowModesModel: (
            newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
        ) => void;
        editable: boolean;
        newInitialRow: any;
    }
}

export default function EditToolbar(props: GridSlotProps["toolbar"]) {
    const { setRows, setRowModesModel, editable, newInitialRow } = props;

    const handleClick = () => {
        const focusField = newInitialRow?.fieldToFocus ?? "name";
        setRows((oldRows) => [
            ...oldRows,
            newInitialRow,
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newInitialRow.id ?? newInitialRow.company_code]: { mode: GridRowModes.Edit, fieldToFocus: focusField },
        }));
    };

    return (
        <Toolbar>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                }}
            >
                <Tooltip title="Search">
                    <GridToolbarQuickFilter debounceMs={200} />
                </Tooltip>
                {editable ? (
                    <Tooltip title="Add record">
                        <ToolbarButton onClick={handleClick}>
                            <AddIcon fontSize="small" />
                        </ToolbarButton>
                    </Tooltip>
                ) : null}
            </Box>
        </Toolbar>
    );
}
