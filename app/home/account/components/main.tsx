import { Grid2 } from "@mui/material";
import InfoCard from "./infoCard";
import Portrait from "./portrait";

export default function Main() {
    return (
        <main>
            <Grid2 container spacing={3} width={"80vw"} ml={5}>
                <Grid2 size={3}>
                    <Portrait role="Admin" />
                </Grid2>
                <Grid2 size={9}>
                    <InfoCard />
                </Grid2>
            </Grid2>
        </main>
    );
}
