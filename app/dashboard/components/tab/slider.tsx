import * as React from "react";
import Slider from "@mui/material/Slider";
import { Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function RangeSlider({
    field,
    min,
    max,
    handleChange,
    selected,
}: {
    field?: string;
    min: number;
    max: number;
    handleChange: (obj: number[]) => void;
    selected?: number[];
}) {
    const [value, setValue] = useState<number[]>([min, max]);

    useEffect(() => {
        setValue([min, max]);
        handleChange([min, max]);
    }, [min, max]);

    useEffect(() => {
        if (!selected) return;
        if (selected[0] === -1 && selected[1] === -1) {
            setValue([min, max]);
        } else {
            setValue(selected);
        }
    }, [selected, min, max]);

    return (
        <Stack spacing={0.1}>
            <Typography>{field}</Typography>
            <Slider
                aria-label={field}
                size="small"
                value={value}
                onChange={(event, newValue) => {
                    if (Array.isArray(newValue)) {
                        setValue(newValue as number[]);
                        handleChange(newValue as number[]);
                    }
                }}
                valueLabelDisplay="auto"
                min={min}
                max={max}
            />
        </Stack>
    );
}
