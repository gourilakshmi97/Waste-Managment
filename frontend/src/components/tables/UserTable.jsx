import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API from "../services/api";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);
const fetchRegisteredUsers = async () => {
  try {
    // Change: Use API.get, and just the route path
    const res = await API.get("/users");
    setUsers(res.data);
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    // Change: Use API.delete, and the path with the ID
    await API.delete(`/users/${id}`);

    setUsers(users.filter((u) => u._id !== id));

    toast.success("User deleted successfully");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete user");
  }
};
  const filteredUsers = users.filter(
    (u) =>
      (u.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (u.email || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(to bottom right, #ffffff, #f0fdf4)",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="green"
          >
            User Management
          </Typography>

          <Typography color="text.secondary">
            Manage all registered citizens and workers
          </Typography>
        </Box>

        <TextField
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "green" }} />
            ),
          }}
          sx={{
            width: 280,
            bgcolor: "white",
            borderRadius: 3,
          }}
        />
      </Box>

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead
              sx={{
                bgcolor: "#166534",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  User
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Phone
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Role
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    hover
                  >
                    {/* User */}
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#16a34a",
                          }}
                        >
                          <PersonIcon />
                        </Avatar>

                        <Typography fontWeight="600">
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      {user.email}
                    </TableCell>

                    {/* Phone */}
                    <TableCell>
                      {user.phone || "N/A"}
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={
                          user.role === "Admin"
                            ? "error"
                            : user.role === "Worker"
                            ? "warning"
                            : "success"
                        }
                        variant="filled"
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        sx={{
                          borderRadius: 3,
                          textTransform: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    <Typography color="text.secondary">
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default UserTable;
