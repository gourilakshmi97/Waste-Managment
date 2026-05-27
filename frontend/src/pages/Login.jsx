import React from "react";

import { useForm, Controller } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Stack,
  InputAdornment,
  Fade,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import RecyclingIcon from "@mui/icons-material/Recycling";
import PersonIcon from "@mui/icons-material/Person";

import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "User",
    },
  });

  // ================= LOGIN =================
  const onSubmit = async (data) => {
    try {
      const response = await API.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
          role: data.role,
        }
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      // SAVE ROLE
      localStorage.setItem(
        "userRole",
        response.data.role
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      const role = (
        response.data.role || "User"
      ).toLowerCase();

      // ROLE ROUTING
      if (role === "admin") {
        navigate("/admin");

      } else if (role === "worker") {
        navigate("/worker");

      } else {
        navigate("/home");
      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login failed ❌"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#d4fc79 0%,#96e6a1 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >

      {/* BACKGROUND CIRCLES */}
      <Box
        sx={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          top: -100,
          left: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          bottom: -80,
          right: -80,
        }}
      />

      <Container maxWidth="sm">

        <Fade in timeout={700}>

          <Paper
            elevation={15}
            sx={{
              p: 5,
              borderRadius: 6,
              backdropFilter: "blur(20px)",
              background:
                "rgba(255,255,255,0.78)",
              border:
                "1px solid rgba(255,255,255,0.4)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >

            {/* HEADER */}
            <Box
              sx={{
                textAlign: "center",
                mb: 4,
              }}
            >

              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#16a34a,#22c55e)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 20px auto",
                  boxShadow:
                    "0 8px 20px rgba(34,197,94,0.4)",
                }}
              >
                <RecyclingIcon
                  sx={{
                    color: "white",
                    fontSize: 45,
                  }}
                />
              </Box>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: "#14532d",
                  mb: 1,
                }}
              >
                EcoClean
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
              >
                Smart Waste Management System
              </Typography>

            </Box>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>

              <Stack spacing={3}>

                {/* EMAIL */}
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={
                        errors.email?.message
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="success" />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />

                {/* PASSWORD */}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={
                        errors.password?.message
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="success" />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />

                {/* ROLE */}
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Login As"
                    >

                      <MenuItem value="User">
                        Standard Citizen
                      </MenuItem>

                      <MenuItem value="Worker">
                        Field Worker
                      </MenuItem>

                      <MenuItem value="Admin">
                        Administrator
                      </MenuItem>

                    </TextField>
                  )}
                />

                {/* BUTTON */}
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={<LoginIcon />}
                  sx={{
                    py: 1.6,
                    borderRadius: 4,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    background:
                      "linear-gradient(135deg,#16a34a,#22c55e)",
                    boxShadow:
                      "0 8px 20px rgba(34,197,94,0.35)",
                    transition: "0.3s",

                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        "0 12px 24px rgba(34,197,94,0.45)",
                    },
                  }}
                >
                  {isSubmitting
                    ? "Signing In..."
                    : "Login"}
                </Button>

              </Stack>

            </form>

            {/* FOOTER */}
            <Box
              sx={{
                textAlign: "center",
                mt: 4,
              }}
            >

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Don&apos;t have an account?
              </Typography>

              <Link
                to="/signup"
                style={{
                  color: "#15803d",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Create Account
              </Link>

            </Box>

          </Paper>

        </Fade>

      </Container>

    </Box>
  );
}

export default Login;