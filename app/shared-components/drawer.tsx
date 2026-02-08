import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";

interface SidebarProp {
  sidebarOpen: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProp) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List></List>
    </Box>
  );
  return (
    <Drawer
      open={sidebarOpen}
      variant="persistent"
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ width: 250 }} role="presentation">
        <List>{DrawerList}</List>
      </Box>
    </Drawer>
  );
}
