import React, { useState } from "react";

import { toast } from "react-toastify";

import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Avatar,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  Person,
  Email,
  Phone,
  Home,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import RecyclingIcon from "@mui/icons-material/Recycling";

import { useForm, Controller } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      role: "User",
    },
  });

  const onSubmit = async (data) => {

    try {

      setServerError("");

      const response = await API.post(
        "/auth/signup",
        data
      );

      toast.success(
        response.data.message ||
        "Signup successful"
      );

      navigate("/login");

    } catch (error) {

      setServerError(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#dcfce7,#bbf7d0)",
        display: "flex",
        alignItems: "center",
        py: 5,
      }}
    >

      <Container maxWidth="md">

        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 6,
          }}
        >

          <Box textAlign="center" mb={4}>

            <Avatar
              sx={{
                bgcolor: "#16a34a",
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
              }}
            >

              <RecyclingIcon
                sx={{ fontSize: 45 }}
              />

            </Avatar>

            <Typography
              variant="h3"
              fontWeight="bold"
              color="#166534"
            >
              EcoClean Signup
            </Typography>

            <Typography color="text.secondary">
              Create your account
            </Typography>

          </Box>

          {serverError && (

            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {serverError}
            </Alert>

          )}

          <form onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={3}>

              <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                  fullWidth
                  label="Full Name"
                  {...register("name", {
                    required: "Name required",
                  })}
                  error={!!errors.name}
                  helperText={
                    errors.name?.message
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="success" />
                      </InputAdornment>
                    ),
                  }}
                />

              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                  fullWidth
                  label="Email"
                  {...register("email", {
                    required: "Email required",
                  })}
                  error={!!errors.email}
                  helperText={
                    errors.email?.message
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="success" />
                      </InputAdornment>
                    ),
                  }}
                />

              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                  fullWidth
                  label="Phone"
                  {...register("phone")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="success" />
                      </InputAdornment>
                    ),
                  }}
                />

              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>

                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Role"
                      value={field.value}
                      onChange={
                        field.onChange
                      }
                    >

                      <MenuItem value="User">
                        Citizen
                      </MenuItem>

                      <MenuItem value="Worker">
                        Worker
                      </MenuItem>

                    </TextField>
                  )}
                />

              </Grid>

              <Grid size={12}>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Address"
                  {...register("address")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home color="success" />
                      </InputAdornment>
                    ),
                  }}
                />

              </Grid>

              <Grid size={12}>

                <TextField
                  fullWidth
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  label="Password"
                  {...register("password", {
                    required:
                      "Password required",
                  })}
                  error={!!errors.password}
                  helperText={
                    errors.password?.message
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="success" />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">

                        <IconButton
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                        >

                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}

                        </IconButton>

                      </InputAdornment>
                    ),
                  }}
                />

              </Grid>

            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 5,
                py: 1.7,
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: 16,
                background:
                  "linear-gradient(135deg,#15803d,#22c55e)",
              }}
            >

              {isSubmitting
                ? "Creating..."
                : "Create Account"}

            </Button>

          </form>

          <Typography
            align="center"
            sx={{ mt: 3 }}
          >

            Already have an account?{" "}

            <Link
              to="/login"
              style={{
                color: "#15803d",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

          </Typography>

        </Paper>

      </Container>

    </Box>
  );
}

export default Signup;