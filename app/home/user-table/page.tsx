"use client";

import { Box, Typography } from "@mui/material";
import MenuAppBar from "../menuAppBar";
import UserTable from "./userTable";

export default function UserTablePage() {
  return (
    <MenuAppBar>
      <Box>
        <Typography variant="h3" gutterBottom>
          User Table
        </Typography>
        <Box height={48} />
        <UserTable />
      </Box>
    </MenuAppBar>
  );
}
