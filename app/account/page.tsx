"use client";

import { Box, Grid2, Typography } from "@mui/material";
import MenuAppBar from "../shared-components/menuAppBar";
import { useEffect, useState } from "react";
import InfoCard from "./components/infoCard";
import Portrait from "./components/portrait";
import { Role } from "../types/account.interface";
import request from "@/app/utils/request";

export default function UserTablePage() {
    const [role, setRole] = useState<Role>();
    const [email, setEmail] = useState<string>();

    useEffect(() => {
        (async () => {
            try {
                const body = await request(`/auth/profile`, {
                    method: "GET",
                });
                setEmail(body.email);
                setRole(body.role);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <MenuAppBar>
            <Box width="80vw" ml={5} mb={5}>
                <Typography variant="h3">Account</Typography>
            </Box>
            <Grid2 container spacing={3} width={"80vw"} ml={5}>
                <Grid2 size={3}>
                    {role ? <Portrait role={role} /> : <></>}
                </Grid2>
                <Grid2 size={9}>
                    {email ? <InfoCard email={email} /> : <></>}
                </Grid2>
            </Grid2>
        </MenuAppBar>
    );
}
