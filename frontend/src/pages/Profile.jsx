import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const res = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(res.data);

      } catch (err) {

        console.error("Profile fetch error:", err);

      } finally {

        setLoading(false);
      }
    };

    fetchProfile();

  }, []);

  // LOADING
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  // NO USER
  if (!user) {
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        Profile not found.
      </Typography>
    );
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom,rgb(240,253,244),rgb(220,252,231))",
          py: 6,
        }}
      >
        <Container maxWidth="sm">

          <Paper
            elevation={6}
            sx={{
              p: 5,
              borderRadius: 5,
              textAlign: "center",
            }}
          >

            {/* AVATAR */}
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: "#2e7d32",
                mx: "auto",
                mb: 2,
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>

            {/* NAME */}
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#1b5e20"
            >
              {user.name}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              EcoClean Citizen Profile
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* DETAILS */}
            <List>

              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="success" />
                </ListItemIcon>

                <ListItemText
                  primary="Email"
                  secondary={user.email || "Not Added"}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="success" />
                </ListItemIcon>

                <ListItemText
                  primary="Phone"
                  secondary={user.phone || "Not Added"}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <HomeIcon color="success" />
                </ListItemIcon>

                <ListItemText
                  primary="Address"
                  secondary={user.address || "Not Added"}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <BadgeIcon color="success" />
                </ListItemIcon>

                <ListItemText
                  primary="Role"
                  secondary={user.role || "User"}
                />
              </ListItem>

            </List>

          </Paper>

        </Container>
      </Box>
    </>
  );
}

export default Profile;