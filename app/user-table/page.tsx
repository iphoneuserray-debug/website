"use client";

import { Box, Typography } from "@mui/material";
import MenuAppBar from "../shared-components/menuAppBar";
import UserTable from "./components/userTable";
import { useEffect, useState } from "react";
import { Role } from "../types/account.interface";
import request from "@/app/utils/request";

export default function UserTablePage() {
    const [role, setRole] = useState<Role>();
    const [id, setId] = useState<string>();

    useEffect(() => {
        (async () => {
            try {
                const body = await request(`/auth/profile`, {
                    method: "GET",
                });
                setId(body.id);
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
                    User Table
                </Typography>
                <Box height={48} />
                {role && id ? <UserTable userRole={role} userId={id} /> : <></>}
            </Box>
        </MenuAppBar>
    );
}
