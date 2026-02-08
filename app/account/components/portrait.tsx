import { Avatar, Paper, Typography } from "@mui/material";

export default function Portrait({
    role,
}: {
    role: "Admin" | "Manager" | "User";
}) {
    return (
        <Paper
            sx={{
                height: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 5,
            }}
        >
            <Avatar sx={{ width: 100, height: 100 }}></Avatar>
            <Typography variant="h6" sx={{ marginTop: "auto" }}>
                {role}
            </Typography>
        </Paper>
    );
}
