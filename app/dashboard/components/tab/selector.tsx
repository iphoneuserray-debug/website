import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function Selector({
    field,
    value,
    handleChange,
    selected = [],
}: {
    field: string;
    value: string[];
    handleChange: (obj: Array<string>) => void;
    selected?: string[];
}) {
    return (
        <Autocomplete
            multiple
            options={value}
            value={selected}
            onChange={(event, newValue) => handleChange(newValue)}
            filterSelectedOptions
            size="small"
            renderInput={(params) => (
                <TextField {...params} label={field} placeholder={field} />
            )}
        />
    );
}
