import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../services/api"; // Adjust this path to where your api.js is located
export default function ComplaintTable({ onActionComplete }) {

  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [filterStatus, setFilterStatus] = useState("All");

  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {
  try {
    setLoading(true);
    // Change: Use API.get, and just the route path
    const response = await API.get("/complaints"); 
    setComplaints(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch complaints");
  } finally {
    setLoading(false);
  }
};

const handleDeleteConfirm = async () => {
  try {
    // Change: Use API.delete, and the path with the ID
    await API.delete(`/complaints/${deleteTargetId}`);
    
    setDeleteTargetId(null);
    fetchComplaints(); // This will now use the updated API instance as well
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete complaint");
  }
};
    
  const filteredData = complaints.filter((item) => {

    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (loading) {

    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (

    <Box>

      {/* HEADER */}

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        color="#1b5e20"
      >
        Complaint Management
      </Typography>

      {/* SEARCH + FILTER */}

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
        }}
      >

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
        >

          <TextField
            label="Search complaints"
            fullWidth
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
          >

            {[
              "All",
              "Pending",
              "In Progress",
              "Resolved"
            ].map((status) => (

              <Button
                key={status}
                variant={
                  filterStatus === status
                    ? "contained"
                    : "outlined"
                }
                color="success"
                onClick={() =>
                  setFilterStatus(status)
                }
              >
                {status}
              </Button>

            ))}

          </Stack>

        </Stack>

      </Paper>

      {/* TABLE */}

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
        }}
      >

        <Table>

          <TableHead
            sx={{
              bgcolor: "#e8f5e9",
            }}
          >

            <TableRow>

              <TableCell>
                <strong>Title</strong>
              </TableCell>

              <TableCell>
                <strong>Location</strong>
              </TableCell>

              <TableCell>
                <strong>Status</strong>
              </TableCell>

              <TableCell>
                <strong>Assigned Worker</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredData.length > 0 ? (

              filteredData.map((item) => (

                <TableRow
                  key={item._id}
                  hover
                >

                  <TableCell>
                    {item.title}
                  </TableCell>

                  <TableCell>
                    {item.location}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={item.status}
                      color={
                        item.status === "Resolved"
                          ? "success"
                          : item.status === "In Progress"
                          ? "info"
                          : "warning"
                      }
                    />

                  </TableCell>

                  <TableCell>
                    {item.workerName || "Unassigned"}
                  </TableCell>

                  <TableCell align="center">

                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                    >

                      {/* VIEW BUTTON */}

                      <IconButton
                        color="success"
                        onClick={() =>
                          navigate(`/complaint/${item._id}`)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>

                      {/* DELETE BUTTON */}

                      <IconButton
                        color="error"
                        onClick={() =>
                          setDeleteTargetId(item._id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>

                    </Stack>

                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No complaints found
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>

      {/* DELETE DIALOG */}

      <Dialog
        open={Boolean(deleteTargetId)}
        onClose={() =>
          setDeleteTargetId(null)
        }
      >

        <DialogTitle color="error">
          Delete Complaint
        </DialogTitle>

        <DialogContent>

          <Typography>
            Are you sure you want to delete this complaint?
          </Typography>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setDeleteTargetId(null)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );
}