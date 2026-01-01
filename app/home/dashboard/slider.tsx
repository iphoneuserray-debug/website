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
  const [text, setText] = useState(min + "~" + max);
  let value = [min, max];
  return (
    <Stack spacing={1}>
      <Typography>{field}</Typography>
      <Typography>{text}</Typography>
      <Slider
        aria-label={field}
        onChange={(event, newValue) => {
          if (Array.isArray(newValue)) {
            setText(newValue[0] + "~" + newValue[1]);
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
