import * as React from "react";
import { Autocomplete, Box, Slider, Stack, TextField } from "@mui/material";
import { useRef } from "react";
/* 
    Selectable input feild 
    Input: selection field and array of selectable feild
*/
export default function Selector({
  field,
  value,
  handleChange,
}: {
  field?: string;
  value?: string[];
  handleChange: (obj: Array<string>) => void;
}) {
  value = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const inputRef = useRef(null);

  return (
    <Autocomplete
      multiple
      options={value}
      ref={inputRef}
      onChange={(event, newValue) => handleChange(newValue)}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={field} placeholder={field} />
      )}
    />
  );
}
