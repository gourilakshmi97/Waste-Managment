import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { toast } from "react-toastify";
import API from "../services/api";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data || []);
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/auth/toggle-status/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.delete(`/auth/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          background:
            "linear-gradient(to right,rgb(224, 255, 224),rgb(240,255,240))",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="green">
          User Management
        </Typography>

        <TextField
          fullWidth
          label="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ my: 3 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress color="success" />
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Typography align="center" sx={{ mt: 3 }}>
            No users found
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: "#2e7d32" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Email</TableCell>
                  <TableCell sx={{ color: "white" }}>Role</TableCell>
                  <TableCell sx={{ color: "white" }}>Status</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>

                    <TableCell>
                      <Chip
                        label={user.status}
                        color={
                          user.status === "Active" ? "success" : "error"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color={
                          user.status === "Active" ? "warning" : "success"
                        }
                        startIcon={<BlockIcon />}
                        sx={{ mr: 1 }}
                        onClick={() => toggleStatus(user._id)}
                      >
                        {user.status === "Active" ? "Block" : "Unblock"}
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}