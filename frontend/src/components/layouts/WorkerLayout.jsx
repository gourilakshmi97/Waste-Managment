import React from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;

export default function WorkerLayout({ children }) {
  const menuItems = [
    {
      text: "My Tasks",
      path: "/worker",
      icon: <AssignmentIcon />,
    },
    {
      text: "Profile",
      path: "/worker/profile",
      icon: <PersonIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f7f4" }}>
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#1b5e20",
            color: "white",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h5" fontWeight="bold">
            Worker Panel
          </Typography>
        </Toolbar>

        <List sx={{ mt: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.path}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: 2,

                "&.active": {
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
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}