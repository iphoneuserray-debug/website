import * as React from "react";
import { Box, Card, Grid2, Stack, Typography } from "@mui/material";
import { digitFormater } from "@/app/api/digitFormater";

interface DataCardProps {
    cardTitle: string;
    cardData: number;
    icon: React.ReactNode;
}

/**
 * Datacard shows well-formated number for important property
 * @param param0
 * @returns Datacard component
 */
export default function DataCard({
    cardTitle,
    cardData,
    icon,
}: DataCardProps): React.ReactNode {
    const value = digitFormater(cardData);

    return (
        <Card sx={{ padding: 2, width: "33vw" }}>
            <Stack direction={"row"} spacing={2} alignContent={"center"}>
                <div>{icon}</div>
                <Box>
                    <Typography color="textSecondary" marginBottom={1}>
                        {cardTitle}
                    </Typography>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "flex-end",
                        }}
                    >
                        <Typography color="textPrimary" variant="h3">
                            {value.num}
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                            {value.unit}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        </Card>
    );
}
