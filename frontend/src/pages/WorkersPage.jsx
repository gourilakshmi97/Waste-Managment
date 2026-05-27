import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import EngineeringIcon from "@mui/icons-material/Engineering";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import AdminLayout from "../components/layouts/AdminLayout";

export default function WorkersPage() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/tasks/my-tasks",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      setTasks(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.patch(
        `http://localhost:5000/api/complaints/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      fetchTasks();

    } catch (err) {

      console.error(err);
    }
  };

  return (
    <AdminLayout>

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom,#f0fdf4,#dcfce7)",
          py: 5,
        }}
      >

        <Container maxWidth="xl">

          <Paper
            elevation={7}
            sx={{
              p: 5,
              borderRadius: 5,
              mb: 5,
              background:
                "linear-gradient(135deg,#14532d,#22c55e)",
              color: "white",
            }}
          >

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >

              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: "white",
                  color: "#16a34a",
                }}
              >

                <EngineeringIcon
                  sx={{ fontSize: 40 }}
                />

              </Avatar>

              <Box>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                >
                  Worker Dashboard
                </Typography>

                <Typography>
                  Assigned cleanup operations
                </Typography>

              </Box>

            </Box>

          </Paper>

          {loading ? (

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 10,
              }}
            >

              <CircularProgress color="success" />

            </Box>

          ) : (

            <Grid container spacing={4}>

              {tasks.length > 0 ? (

                tasks.map((task) => (

                  <Grid
                    key={task._id}
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                  >

                    <Card
                      elevation={6}
                      sx={{
                        borderRadius: 5,
                        height: "100%",
                      }}
                    >

                      <CardContent>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >

                          <Typography
                            variant="h6"
                            fontWeight="bold"
                          >
                            {
                              task.complaint
                                ?.title
                            }
                          </Typography>

                          <Chip
                            label={
                              task.complaint
                                ?.status
                            }
                            color={
                              task.complaint
                                ?.status ===
                              "Resolved"
                                ? "success"
                                : "warning"
                            }
                          />

                        </Box>

                        <Typography
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {
                            task.complaint
                              ?.description
                          }
                        </Typography>

                        <Typography
                          sx={{
                            bgcolor: "#f0fdf4",
                            p: 1.5,
                            borderRadius: 2,
                            mb: 3,
                          }}
                        >
                          📍{" "}
                          {
                            task.complaint
                              ?.location
                          }
                        </Typography>

                        {task.complaint
                          ?.status ===
                          "Pending" && (

                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              updateStatus(
                                task.complaint
                                  ?._id,
                                "In Progress"
                              )
                            }
                          >
                            Start Work
                          </Button>

                        )}

                        {task.complaint
                          ?.status ===
                          "In Progress" && (

                          <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            startIcon={
                              <AssignmentTurnedInIcon />
                            }
                            onClick={() =>
                              updateStatus(
                                task.complaint
                                  ?._id,
                                "Resolved"
                              )
                            }
                          >
                            Mark Completed
                          </Button>

                        )}

                      </CardContent>

                    </Card>

                  </Grid>

                ))

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
                      No assigned tasks
                    </Typography>

                  </Paper>

                </Grid>

              )}

            </Grid>

          )}

        </Container>

      </Box>

    </AdminLayout>
  );
}

export default WorkersPage;