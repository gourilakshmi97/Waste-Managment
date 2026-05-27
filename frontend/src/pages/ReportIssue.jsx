import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

import Navbar from "../components/Navbar";
import MapPicker from "../components/MapPicker";
import API from "../services/api";

function ReportIssue() {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [base64Image, setBase64Image] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  // IMAGE CONVERSION
  const handleImageConversion = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // SUBMIT
  const onSubmit = async (data) => {

    // LOCATION CHECK
    if (!latitude || !longitude) {

      alert("Please select a location on the map.");

      return;
    }

    try {

      setLoading(true);

      // GET LOGGED USER
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      // PAYLOAD
      const payload = {

        title: data.title,

        description: data.description,

        location: location,

        latitude: Number(latitude),

        longitude: Number(longitude),

        image: base64Image,

        // IMPORTANT
        userId: loggedUser?.id,
      };

      // API CALL
      await API.post(
        "/complaints",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Complaint submitted successfully ✅");

      // RESET
      reset();

      setBase64Image("");

      setLatitude("");

      setLongitude("");

      setLocation("");

    } catch (error) {

      console.error(
        "Submission Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Complaint submission failed ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom,rgb(240,253,244),rgb(220,252,231))",
          py: 5,
        }}
      >

        <Container maxWidth="sm">

          <Paper
            elevation={5}
            sx={{
              p: 4,
              borderRadius: 5,
            }}
          >

            {/* HEADER */}
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              color="#166534"
            >
              Report Waste Issue
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Help keep your city clean by reporting waste problems.
            </Typography>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* TITLE */}
              <TextField
                fullWidth
                label="Complaint Title"
                margin="normal"
                {...register("title", {
                  required: true,
                })}
              />

              {/* DESCRIPTION */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                margin="normal"
                {...register("description", {
                  required: true,
                })}
              />

              {/* IMAGE */}
              <Button
                variant="outlined"
                component="label"
                color="success"
                sx={{ mt: 2 }}
              >
                Upload Photo

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageConversion}
                />
              </Button>

              {/* PREVIEW */}
              {base64Image && (
                <Box mt={2}>
                  <img
                    src={base64Image}
                    alt="Preview"
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              {/* MAP */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ mt: 3, mb: 1 }}
              >
                Select Location
              </Typography>

              <MapPicker
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setLocation={setLocation}
              />

              {/* LOCATION DISPLAY */}
              <Alert
                severity="info"
                sx={{ mt: 2 }}
              >
                <strong>Selected Location:</strong>{" "}
                {location || "No location selected"}
              </Alert>

              {/* BUTTON */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="success"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                  />
                ) : (
                  "Submit Complaint"
                )}
              </Button>

            </form>

          </Paper>

        </Container>

      </Box>
    </>
  );
}

export default ReportIssue;