"use client";

import { Box, Grid2, Typography } from "@mui/material";
import MenuAppBar from "../menuAppBar";
import Main from "./components/main";

export default function UserTablePage() {
    return (
        <MenuAppBar>
            <Box width="80vw" ml={5} mb={5}>
                <Typography variant="h3">Account</Typography>
            </Box>
            <Main />
        </MenuAppBar>
    );
}
