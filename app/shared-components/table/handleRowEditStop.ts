import { GridRowEditStopReasons } from "@mui/x-data-grid";
import { GridEventListener } from "@mui/x-data-grid";

export const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
    }
};