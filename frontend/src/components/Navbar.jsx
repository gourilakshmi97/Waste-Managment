import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";

import RecyclingIcon from "@mui/icons-material/Recycling";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";

import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    {
      label: "Home",
      path: "/home",
      icon: <HomeIcon fontSize="small" />,
    },
    {
      label: "Report Issue",
      path: "/report-issue",
      icon: <ReportProblemIcon fontSize="small" />,
    },
    {
      label: "Complaints",
      path: "/complaints",
      icon: <AssignmentIcon fontSize="small" />,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <PersonIcon fontSize="small" />,
    },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        background:
          "linear-gradient(135deg, #047857 0%, #10b981 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* LOGO */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "white",
              color: "#047857",
            }}
          >
            <RecyclingIcon />
          </Avatar>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "white",
              letterSpacing: 1,
            }}
          >
            EcoClean
          </Typography>
        </Box>

        {/* NAVIGATION */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: "white",
                px: 2,
                py: 1,
                borderRadius: 3,
                fontWeight: "bold",
                textTransform: "none",

                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(255,255,255,0.18)"
                    : "transparent",

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* LOGOUT */}
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              ml: 1,
              bgcolor: "white",
              color: "#047857",
              fontWeight: "bold",
              borderRadius: 3,
              px: 2.5,
              textTransform: "none",

              "&:hover": {
                bgcolor: "#ecfdf5",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;