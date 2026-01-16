"use client";

import { Box, Typography } from "@mui/material";
import MenuAppBar from "../menuAppBar";
import UserTable from "./userTable";
import { demo, demoManager, demoUser } from "@/app/api/account";

export default function UserTablePage() {
    return (
        <MenuAppBar>
            <Box>
                <Typography variant="h3" gutterBottom>
                    User Table
                </Typography>
                <Box height={48} />
                <UserTable userInfo={demoUser} />
            </Box>
        </MenuAppBar>
    );
}
