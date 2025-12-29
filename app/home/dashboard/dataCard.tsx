import * as React from "react";
import { Card, Grid2, Typography } from "@mui/material";

interface DataCardProps {
  cardTitle: string;
  cardData: number;
  icon: React.ReactNode;
  unit?: string;
}

export default function DataCard({ cardTitle, cardData, icon }: DataCardProps) {
  return (
    <Card sx={{ width: "auto", padding: 2, borderRadius: 2 }}>
      <Grid2 container>
        <Grid2 size={4}>{icon}</Grid2>
        <Grid2 size={8}>
          <Typography color="textSecondary" marginBottom={1}>
            {cardTitle}
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {cardDataFormater(cardData)}
          </Typography>
        </Grid2>
      </Grid2>
    </Card>
  );
}

function cardDataFormater(cardData: number): string {
  let unit: string = "";
  if (cardData >= 1000000000000) {
    cardData /= 1000000000000;
    unit = "M";
  } else if (cardData >= 1000000000) {
    cardData /= 1000000000;
    unit = "B";
  } else if (cardData >= 1000000) {
    cardData /= 1000000;
    unit = "T";
  }

  if (Number.isInteger(cardData)) return cardData + unit;

  return cardData.toFixed(2) + unit;
}
