import * as React from "react";
import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";

export default function SubTabPage() {
  const label = "country";
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: companyCount,
      },
    ],
  };
  return (
    <Box>
      <Bar data={data} />
    </Box>
  );
}
