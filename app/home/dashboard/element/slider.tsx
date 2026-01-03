import * as React from "react";
import Slider from "@mui/material/Slider";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function RangeSlider({
    field,
    min,
    max,
    handleChange,
}: {
    field?: string;
    min: number;
    max: number;
    handleChange: (obj: number[]) => void;
}) {
    let value = [min, max];
    return (
        <Stack spacing={0.1}>
            <Typography>{field}</Typography>
            <Slider
                aria-label={field}
                size="small"
                onChange={(event, newValue) => {
                    if (Array.isArray(newValue)) {
                        handleChange(newValue);
                    }
                }}
                valueLabelDisplay="auto"
                min={min}
                max={max}
                defaultValue={value}
            />
        </Stack>
    );
}
