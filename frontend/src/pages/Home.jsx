import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  Paper,
  Fade,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";

import Navbar from "../components/Navbar";
import ComplaintCard from "../components/ComplaintCard";
import API from "../services/api";

function Home() {

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      setLoading(true);

      const response = await API.get("/complaints");

      setComplaints(response.data);

    } catch (error) {

      console.error("Error fetching complaints:", error);

    } finally {

      setLoading(false);
    }
  };

  const statuses = [
    "All",
    "Pending",
    "In Progress",
    "Resolved",
  ];

  const filteredComplaints =
    tabValue === 0
      ? complaints
      : complaints.filter(
          (item) =>
            item.status === statuses[tabValue]
        );

  const metrics = {
    total: complaints.length,
    pending: complaints.filter(
      (c) => c.status === "Pending"
    ).length,
    progress: complaints.filter(
      (c) => c.status === "In Progress"
    ).length,
    resolved: complaints.filter(
      (c) => c.status === "Resolved"
    ).length,
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom,#ecfdf5,#dcfce7)",
          py: 5,
        }}
      >

        <Container maxWidth="xl">

          {/* HERO */}

          <Paper
            elevation={8}
            sx={{
              p: 6,
              borderRadius: 6,
              mb: 5,
              overflow: "hidden",
              position: "relative",
              background:
                "linear-gradient(135deg,#14532d,#22c55e)",
              color: "white",
            }}
          >

            <Box
              sx={{
                position: "absolute",
                width: 250,
                height: 250,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.08)",
                top: -80,
                right: -80,
              }}
            />

            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
            >
              EcoClean Smart Waste System
            </Typography>

            <Typography
              variant="h6"
              sx={{ opacity: 0.9 }}
            >
              Report waste issues and track real-time cleanup operations.
            </Typography>

          </Paper>

          {/* METRICS */}

          <Grid container spacing={3} sx={{ mb: 5 }}>

            {[
              {
                label: "Total",
                value: metrics.total,
                icon: <DashboardIcon />,
                color: "#16a34a",
              },
              {
                label: "Pending",
                value: metrics.pending,
                icon: <PendingActionsIcon />,
                color: "#f59e0b",
              },
              {
                label: "In Progress",
                value: metrics.progress,
                icon: <EngineeringIcon />,
                color: "#2563eb",
              },
              {
                label: "Resolved",
                value: metrics.resolved,
                icon: <CheckCircleIcon />,
                color: "#059669",
              },
            ].map((item, index) => (

              <Grid
                key={index}
                size={{ xs: 12, sm: 6, md: 3 }}
              >

                <Card
                  elevation={5}
                  sx={{
                    borderRadius: 5,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                    },
                  }}
                >

                  <CardContent>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >

                      <Box>

                        <Typography color="text.secondary">
                          {item.label}
                        </Typography>

                        <Typography
                          variant="h4"
                          fontWeight="bold"
                        >
                          {item.value}
                        </Typography>

                      </Box>

                      <Avatar
                        sx={{
                          bgcolor: item.color,
                          width: 60,
                          height: 60,
                        }}
                      >
                        {item.icon}
                      </Avatar>

                    </Box>

                  </CardContent>

                </Card>

              </Grid>
            ))}

          </Grid>

          {/* FILTERS */}

          <Paper
            elevation={3}
            sx={{
              borderRadius: 5,
              mb: 5,
              overflow: "hidden",
            }}
          >

            <Tabs
              value={tabValue}
              onChange={(e, value) =>
                setTabValue(value)
              }
              variant="fullWidth"
              textColor="success"
              indicatorColor="success"
            >

              {statuses.map((status) => (

                <Tab
                  key={status}
                  label={status}
                  sx={{
                    fontWeight: "bold",
                    py: 2,
                  }}
                />

              ))}

            </Tabs>

          </Paper>

          {/* CONTENT */}

          {loading ? (

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 10,
              }}
            >

              <CircularProgress
                color="success"
                size={60}
              />

            </Box>

          ) : (

            <Fade in timeout={500}>

              <Box>

                <Grid container spacing={4}>

                  {filteredComplaints.length > 0 ? (

                    filteredComplaints.map(
                      (complaint) => (

                        <Grid
                          key={complaint._id}
                          size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                          }}
                        >

                          <ComplaintCard
                            complaint={complaint}
                          />

                        </Grid>

                      )
                    )

                  ) : (

                    <Grid size={12}>

                      <Paper
                        sx={{
                          p: 6,
                          textAlign: "center",
                          borderRadius: 5,
                        }}
                      >

                        <Typography
                          variant="h6"
                          color="text.secondary"
                        >
                          No complaints found
                        </Typography>

                      </Paper>

                    </Grid>

                  )}

                </Grid>

              </Box>

            </Fade>

          )}

        </Container>

      </Box>
    </>
  );
}

export default Home;