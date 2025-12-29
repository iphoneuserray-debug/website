import * as React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { CssBaseline } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";

interface MenuAppBarProp {
  children?: React.ReactNode;
}

export default function MenuAppBar({ children }: MenuAppBarProp) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const drawerWidth = 240;
  const router = useRouter();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSidebar = (event: React.MouseEvent) => {
    setSidebarOpen(!sidebarOpen);
  };

  function ListButton({ name, icon }: { name: string; icon: React.ReactNode }) {
    return (
      <ListItem key={name} disablePadding>
        <ListItemButton
          onClick={() => {
            router.push(`/home/${name.toLowerCase()}`);
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={sidebarOpen}
        variant="persistent"
        sx={{
          flexShrink: 0,
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListButton name="Dashboard" icon={<DashboardIcon />} />
            <ListButton name="User-table" icon={<PeopleIcon />} />
            <ListButton name="Company-table" icon={<BusinessIcon />} />
          </List>
        </Box>
      </Drawer>
      <Toolbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "auto",
          mt: "64px",
          ml: sidebarOpen ? `${drawerWidth}px` : 0,
          transition: (theme) =>
            theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
