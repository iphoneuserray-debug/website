"use client";

import { Box, Typography } from "@mui/material";
import MenuAppBar from "../menuAppBar";
import CompanyTable from "./companyTable";

export default function CompanyTablePage() {
  return (
    <MenuAppBar>
      <Box>
        <Typography variant="h3" gutterBottom>
          Company Table
        </Typography>
        <CompanyTable />
      </Box>
    </MenuAppBar>
  );
}
