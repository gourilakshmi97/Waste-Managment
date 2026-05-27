import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import API from "../services/api"; // Ensure this path is correct
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton,
  Chip,
  Avatar,
  Fade,
  Stack,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupsIcon from "@mui/icons-material/Groups";
import RecyclingIcon from "@mui/icons-material/Recycling";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [complaints, setComplaints] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [assigningItem, setAssigningItem] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState("");

  // ================= AUTH HEADER =================
  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchDashboardData();
    fetchWorkers();
  }, []);

  // ================= FETCH WORKERS =================

const handleAssignSubmit = async () => {
  try {
    if (!selectedWorker) {
      alert("Please select a worker");
      return;
    }
    if (!assigningItem?._id) {
      alert("Complaint not found");
      return;
    }

    // 1. Perform the Network Request
    await API.post("/tasks/assign", {
      complaintId: assigningItem._id,
      workerId: selectedWorker,
    });

    // 2. Perform the Local UI Update
    setComplaints((prev) =>
      prev.map((item) =>
        item._id === assigningItem._id
          ? {
              ...item,
              status: "In Progress",
              assignedWorker:
                workers.find((w) => w._id === selectedWorker)?.name || "Assigned",
            }
          : item
      )
    );

    alert("Worker assigned successfully ✅");

    // 3. Reset state and refresh data
    setAssigningItem(null);
    setSelectedWorker("");
    fetchDashboardData();
    
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Assignment failed");
  }
};
const [isLoading, setIsLoading] = useState(true);

const fetchDashboardData = async () => {
  try {
    const res = await API.get("/dashboard");

    setMetrics(res.data.metrics);
    setComplaints(res.data.complaints);
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

const fetchWorkers = async () => {
  const res = await API.get("/auth/users?role=Worker");
  setWorkers(res.data);
};

const handleDelete = async (id) => {
  try {
    await API.delete(`/complaints/${id}`);
    fetchDashboardData();
  } catch (err) {
    alert("Delete failed");
  }
};
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";

      case "In Progress":
        return "info";

      case "Resolved":
        return "success";

      default:
        return "default";
    }
  };

  // ================= LOADING SCREEN =================
  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(to bottom,#ecfdf5,#d1fae5)",
        }}
      >
        <CircularProgress
          size={60}
          color="success"
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#f0fdf4,#dcfce7)",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* ================= HERO ================= */}

        <Fade in timeout={700}>
          <Paper
            elevation={8}
            sx={{
              p: 5,
              mb: 5,
              borderRadius: 6,
              position: "relative",
              overflow: "hidden",
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
                top: -100,
                right: -100,
              }}
            />

            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    width: 75,
                    height: 75,
                    bgcolor: "white",
                    color: "#16a34a",
                  }}
                >
                  <RecyclingIcon
                    sx={{ fontSize: 42 }}
                  />
                </Avatar>

                <Box>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                  >
                    EcoClean Admin
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ opacity: 0.9 }}
                  >
                    Smart Waste Management Dashboard
                  </Typography>
                </Box>
              </Stack>

              <IconButton
                onClick={fetchDashboardData}
                sx={{
                  bgcolor:
                    "rgba(255,255,255,0.2)",
                  color: "white",

                  "&:hover": {
                    bgcolor:
                      "rgba(255,255,255,0.3)",
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Fade>

        {/* ================= METRICS ================= */}

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {[
            {
              label: "Total Complaints",
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
              value: metrics.inProgress,
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
                elevation={6}
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
                  <Stack
                    direction="row"
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
                        width: 65,
                        height: 65,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ================= TABLE ================= */}

        <Paper
          elevation={8}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
              color: "white",
              background:
                "linear-gradient(135deg,#166534,#15803d)",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <GroupsIcon />

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Complaint Management
              </Typography>
            </Stack>
          </Box>

          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  bgcolor: "#dcfce7",
                }}
              >
                <TableRow>
                  <TableCell>
                    <b>Complaint</b>
                  </TableCell>

                  <TableCell>
                    <b>Status</b>
                  </TableCell>

                  <TableCell>
                    <b>Assigned Worker</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {complaints.map((item) => (
                  <TableRow
                    key={item._id}
                    hover
                  >
                    <TableCell>
                      <Typography
                        fontWeight="bold"
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.location}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.status}
                        color={getStatusColor(
                          item.status
                        )}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography
                        fontWeight="medium"
                        color={
                          item.assignedWorker
                            ? "success.main"
                            : "text.secondary"
                        }
                      >
                        {item.assignedWorker ||
                          "Unassigned"}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <IconButton
                          color="success"
                          onClick={() =>
                            navigate(
                              `/complaint/${item._id}`
                            )
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>

                        {item.status ===
                          "Pending" && (
                          <IconButton
                            color="primary"
                            onClick={() =>
                              setAssigningItem(
                                item
                              )
                            }
                          >
                            <AssignmentIcon />
                          </IconButton>
                        )}

                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* ================= ASSIGN DIALOG ================= */}

      <Dialog
        open={!!assigningItem}
        onClose={() =>
          setAssigningItem(null)
        }
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            bgcolor: "#166534",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Assign Worker
        </DialogTitle>

        <DialogContent sx={{ pt: 4 }}>
          <FormControl
            fullWidth
            sx={{ mt: 3 }}
          >
            <InputLabel>
              Select Worker
            </InputLabel>

            <Select
              value={selectedWorker}
              label="Select Worker"
              onChange={(e) =>
                setSelectedWorker(
                  e.target.value
                )
              }
            >
              {workers.map((worker) => (
                <MenuItem
                  key={worker._id}
                  value={worker._id}
                >
                  {worker.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              background:
                "linear-gradient(135deg,#16a34a,#22c55e)",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#15803d,#16a34a)",
              },
            }}
            onClick={handleAssignSubmit}
          >
            Assign Worker
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}