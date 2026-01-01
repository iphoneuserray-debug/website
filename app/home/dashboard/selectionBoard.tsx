import { useState } from "react";
import Selector from "./selector";
import { Stack } from "@mui/material";
import RangeSlider from "./slider";

export default function SelectBoard() {
  const [level, setLevel] = useState<Array<string>>([]);
  const [country, setCountry] = useState<Array<string>>([]);
  const [city, setCity] = useState<Array<string>>([]);
  const [foundYear, setFoundYear] = useState<number[]>([0, 2050]);
  const [annualRevenue, setAnnualRevenue] = useState<number[]>([0, 2050]);
  const [employee, setEmployee] = useState<number[]>([0, 2050]);

  return (
    <Stack spacing={2}>
      <Selector field="level" handleChange={setLevel} />
      <Selector field="country" handleChange={setCountry} />
      <Selector field="city" handleChange={setCity} />
      <RangeSlider
        field="Found Year"
        min={0}
        max={2025}
        handleChange={setFoundYear}
      />
      <RangeSlider
        field="Annual Revenue"
        min={0}
        max={2025}
        handleChange={setAnnualRevenue}
      />
      <RangeSlider
        field="Employee"
        min={0}
        max={2025}
        handleChange={setEmployee}
      />
    </Stack>
  );
}
