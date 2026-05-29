import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  IconButton,
  Avatar,
  Fade,
  Stack,
  LinearProgress,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RecyclingIcon from "@mui/icons-material/Recycling";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export default function WorkerDashboard() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [base64Image, setBase64Image] =
    useState("");

  const [uploadPreview, setUploadPreview] =
    useState("");

  // ================= FETCH TASKS =================
  useEffect(() => {

    fetchWorkerTasks();

  }, []);

  const fetchWorkerTasks = async () => {
  try {
    setLoading(true);
    
    // The API instance handles the baseURL and the Authorization header automatically
    const response = await API.get("/complaints/worker/my-tasks");
    
    setTasks(response.data); // Assuming you are setting this to a state named 'tasks'
  } catch (err) {
    console.error("Failed to fetch worker tasks:", err);
  } finally {
    setLoading(false);
  }
};
  // ================= UPDATE STATUS =================
  const handleStatusChange = async (id, nextStatus) => {
  try {
    // API instance handles the full URL and the Authorization header
    await API.patch(`/complaints/${id}`, {
      status: nextStatus,
    });

    // Refresh the list after a successful update
    fetchWorkerTasks();
    alert("Status updated successfully ✅");
  } catch (err) {
    console.error(err);
    alert("Update failed ❌");
  }
};

  // ================= IMAGE =================
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setBase64Image(reader.result);

      setUploadPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // ================= RESOLVE =================
  const handleResolveSubmit = async () => {
  if (!base64Image) {
    alert("Upload proof image first.");
    return;
  }

  try {
    // API instance handles the base URL and Authorization header automatically
    await API.patch(`/complaints/${selectedTask._id}`, {
      status: "Resolved",
      image: base64Image,
    });

    setSelectedTask(null);
    setBase64Image("");
    setUploadPreview("");
    
    alert("Submission successful ✅");
    fetchWorkerTasks();
  } catch (err) {
    console.error(err);
    alert("Submission failed ❌");
  }
};
  // ================= STATUS COLOR =================
  const getChipColor = (status) => {

    if (status === "Pending")
      return "warning";

    if (status === "In Progress")
      return "info";

    if (status === "Resolved")
      return "success";

    return "default";
  };

  // ================= LOADING =================
  if (loading) {

    return (
      <Box
        sx={{
          height: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          flexDirection: "column",

          gap: 2,

          bgcolor: "#ecfdf5",
        }}
      >
        <CircularProgress color="success" />

        <Typography>
          Loading field assignments...
        </Typography>
      </Box>
    );
  }

  return (

    <Box
      sx={{
        minHeight: "100vh",

        background:
          "linear-gradient(to bottom,#ecfdf5,#d1fae5)",

        pb: 6,
      }}
    >

      {/* HEADER */}

      <Box
        sx={{
          background:
            "linear-gradient(135deg,#166534,#22c55e)",

          color: "white",

          p: 4,

          borderBottomLeftRadius: 30,

          borderBottomRightRadius: 30,

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >

        <Container maxWidth="lg">

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >

            <Box
              display="flex"
              alignItems="center"
              gap={2}
            >

              <Avatar
                sx={{
                  bgcolor: "white",
                  color: "#16a34a",
                  width: 70,
                  height: 70,
                }}
              >
                <RecyclingIcon
                  sx={{ fontSize: 40 }}
                />
              </Avatar>

              <Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  Worker Dashboard
                </Typography>

                <Typography
                  sx={{
                    opacity: 0.9,
                  }}
                >
                  EcoClean Field Operations
                </Typography>

              </Box>

            </Box>

            <IconButton
              onClick={fetchWorkerTasks}
              sx={{
                bgcolor:
                  "rgba(255,255,255,0.15)",

                color: "white",

                "&:hover": {
                  bgcolor:
                    "rgba(255,255,255,0.25)",
                },
              }}
            >
              <RefreshIcon />
            </IconButton>

          </Box>

        </Container>

      </Box>

      {/* CONTENT */}

      <Container maxWidth="lg" sx={{ mt: 5 }}>

        {/* STATS */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 5 }}
        >

          {[
            {
              label: "Total Tasks",
              value: tasks.length,
              icon: (
                <EngineeringIcon />
              ),
              color: "#16a34a",
            },

            {
              label: "Pending",
              value: tasks.filter(
                (t) =>
                  t.status === "Pending"
              ).length,
              icon: (
                <PendingActionsIcon />
              ),
              color: "#f59e0b",
            },

            {
              label: "Resolved",
              value: tasks.filter(
                (t) =>
                  t.status === "Resolved"
              ).length,
              icon: (
                <CheckCircleIcon />
              ),
              color: "#059669",
            },
          ].map((item, index) => (

            <Grid
              item
              xs={12}
              md={4}
              key={index}
            >

              <Card
                elevation={5}
                sx={{
                  borderRadius: 5,

                  transition: "0.3s",

                  "&:hover": {
                    transform:
                      "translateY(-5px)",
                  },
                }}
              >

                <CardContent>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >

                    <Box>

                      <Typography
                        color="text.secondary"
                      >
                        {item.label}
                      </Typography>

                      <Typography
                        variant="h3"
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

        {/* TASKS */}

        {tasks.length === 0 ? (

          <Fade in>

            <Card
              sx={{
                borderRadius: 5,
                textAlign: "center",
                py: 10,
              }}
            >

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                No Assigned Tasks
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Admin has not assigned any
                complaints yet.
              </Typography>

            </Card>

          </Fade>

        ) : (

          <Grid container spacing={4}>

            {tasks.map((task) => (

              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={task._id}
              >

                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 5,

                    overflow: "hidden",

                    transition: "0.3s",

                    height: "100%",

                    "&:hover": {
                      transform:
                        "translateY(-6px)",
                    },
                  }}
                >

                  {/* IMAGE */}

                  {task.image ? (

                    <CardMedia
                      component="img"
                      height="220"
                      image={task.image}
                    />

                  ) : (

                    <Box
                      sx={{
                        height: 220,

                        background:
                          "linear-gradient(135deg,#16a34a,#22c55e)",

                        display: "flex",

                        justifyContent:
                          "center",

                        alignItems: "center",
                      }}
                    >

                      <EngineeringIcon
                        sx={{
                          color: "white",
                          fontSize: 70,
                        }}
                      />

                    </Box>

                  )}

                  <CardContent>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        {task.title}
                      </Typography>

                      <Chip
                        label={task.status}
                        color={getChipColor(
                          task.status
                        )}
                      />

                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 2,
                        minHeight: 60,
                      }}
                    >
                      {task.description}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >

                      <LocationOnIcon
                        color="success"
                        fontSize="small"
                      />

                      <Typography
                        variant="body2"
                      >
                        {task.location}
                      </Typography>

                    </Stack>

                    {/* PROGRESS */}

                    <Box sx={{ mt: 3 }}>

                      <Typography
                        variant="caption"
                      >
                        Task Progress
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={
                          task.status ===
                          "Pending"
                            ? 20
                            : task.status ===
                              "In Progress"
                            ? 60
                            : 100
                        }
                        color={
                          task.status ===
                          "Resolved"
                            ? "success"
                            : "primary"
                        }
                        sx={{
                          height: 10,

                          borderRadius: 10,

                          mt: 1,
                        }}
                      />

                    </Box>

                    {/* BUTTONS */}

                    <Box sx={{ mt: 3 }}>

                      {task.status ===
                        "Pending" && (

                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          size="large"
                          startIcon={
                            <EngineeringIcon />
                          }
                          onClick={() =>
                            handleStatusChange(
                              task._id,
                              "In Progress"
                            )
                          }
                          sx={{
                            borderRadius: 3,
                            py: 1.2,
                          }}
                        >
                          Accept Task
                        </Button>

                      )}

                      {task.status ===
                        "In Progress" && (

                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          startIcon={
                            <AssignmentTurnedInIcon />
                          }
                          onClick={() =>
                            setSelectedTask(
                              task
                            )
                          }
                          sx={{
                            borderRadius: 3,
                            py: 1.2,

                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                          }}
                        >
                          Submit Proof
                        </Button>

                      )}

                      {task.status ===
                        "Resolved" && (

                        <Button
                          fullWidth
                          disabled
                          variant="contained"
                          color="success"
                          startIcon={
                            <CheckCircleIcon />
                          }
                          sx={{
                            borderRadius: 3,
                            py: 1.2,
                          }}
                        >
                          Completed
                        </Button>

                      )}

                    </Box>

                  </CardContent>

                </Card>

              </Grid>

            ))}

          </Grid>

        )}

      </Container>

      {/* DIALOG */}

      <Dialog
        open={!!selectedTask}
        onClose={() =>
          setSelectedTask(null)
        }
        maxWidth="sm"
        fullWidth
      >

        <DialogTitle
          sx={{
            background:
              "linear-gradient(135deg,#166534,#22c55e)",

            color: "white",

            fontWeight: "bold",
          }}
        >
          Upload Restoration Proof
        </DialogTitle>

        <DialogContent sx={{ py: 4 }}>

          <Button
            component="label"
            fullWidth
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
              py: 2,

              borderRadius: 3,

              borderStyle: "dashed",
            }}
          >
            Upload Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={
                handleImageUpload
              }
            />

          </Button>

          {uploadPreview && (

            <Box sx={{ mt: 3 }}>

              <img
                src={uploadPreview}
                alt="preview"
                style={{
                  width: "100%",
                  borderRadius: "16px",
                }}
              />

            </Box>

          )}

          <Button
            fullWidth
            variant="contained"
            color="success"
            size="large"
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 3,
            }}
            onClick={
              handleResolveSubmit
            }
          >
            Confirm Completion
          </Button>

        </DialogContent>

      </Dialog>

    </Box>
  );
}