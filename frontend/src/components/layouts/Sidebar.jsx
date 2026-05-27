import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";

import {
  Dashboard,
  Assignment,
  People,
  Engineering,
  Logout,
} from "@mui/icons-material";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/admin",
    },
    {
      text: "Complaints",
      icon: <Assignment />,
      path: "/complaints",
    },
    {
      text: "Users",
      icon: <People />,
      path: "/users",
    },
    {
      text: "Workers",
      icon: <Engineering />,
      path: "/workers",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          bgcolor: "#1b5e20",
          color: "white",
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          CleanCity
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                bgcolor: "rgba(255,255,255,0.2)",
              },
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          startIcon={<Logout />}
          variant="outlined"
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;