import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  LinearProgress,
  Alert,
} from "@mui/material";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import MapPicker from "../components/MapPicker";
import API from "../services/api";

// 10 MB — matches the backend multer limit.
const MAX_FILE_BYTES = 10 * 1024 * 1024;

function ReportIssue() {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  // The actual File object is uploaded via multipart/form-data (no base64).
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Revoke the previous object URL when the preview changes / on unmount.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // IMAGE SELECTION — keep the raw File and show a local preview. Validation
  // gives immediate, friendly feedback before any upload happens.
  const handleImageSelect = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning("Please select a valid image file");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      toast.warning("Image is too large (max 10MB). Please choose a smaller file");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // SUBMIT
  const onSubmit = async (data) => {

    // LOCATION CHECK
    if (!latitude || !longitude) {

      toast.warning("Please select a location on the map");

      return;
    }

    try {

      setLoading(true);
      setUploadProgress(0);

      // GET LOGGED USER
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      // MULTIPART PAYLOAD
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", location);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("userId", loggedUser?.id || "");

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      // API CALL — axios sets the multipart boundary automatically.
      await API.post(
        "/complaints",
        formData,
        {
          onUploadProgress: (event) => {
            if (event.total) {
              setUploadProgress(
                Math.round((event.loaded * 100) / event.total)
              );
            }
          },
        }
      );

      toast.success("Complaint submitted successfully");

      // RESET
      reset();

      setSelectedFile(null);
      setPreviewUrl("");
      setUploadProgress(0);

      setLatitude("");

      setLongitude("");

      setLocation("");

    } catch (error) {

      console.error(
        "Submission Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Complaint submission failed"
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
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {selectedFile ? "Change Photo" : "Upload Photo"}

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </Button>

              {/* PREVIEW */}
              {previewUrl && (
                <Box mt={2}>
                  <img
                    src={previewUrl}
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

              {/* UPLOAD PROGRESS */}
              {loading && uploadProgress > 0 && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    color="success"
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Uploading... {uploadProgress}%
                  </Typography>
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