"use client";

import { Box, Typography } from "@mui/material";
import MenuAppBar from "../shared-components/menuAppBar";
import CompanyTable from "./components/companyTable";
import { useEffect, useState } from "react";
import { Role } from "../types/account.interface";
import request from "@/app/utils/request";

export default function CompanyTablePage() {
    const [role, setRole] = useState<Role>();

    useEffect(() => {
        (async () => {
            try {
                const body = await request(`/auth/profile`);
                setRole(body.role);
            } catch (err) {
                console.error(err);
            }
        })();
    })
    return (
        <MenuAppBar>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Company Table
                </Typography>
                {role ? <CompanyTable userRole={role} /> : <></>}
            </Box>
        </MenuAppBar>
    );
}
