import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
  Divider,
  Chip
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Navbar from "../components/Navbar";
import API from "../services/api";

function ComplaintDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);

  const [loading, setLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {

    const fetchComplaint = async () => {

      try {

        const response = await API.get(`/complaints/${id}`);

        setComplaint(response.data);

      } catch (error) {

        console.error(error);

        setErrorMsg("Failed to load complaint details.");

      } finally {

        setLoading(false);
      }
    };

    if (id) {

      fetchComplaint();
    }

  }, [id]);

  if (loading) {

    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (errorMsg) {

    return (
      <Container sx={{ mt: 5 }}>

        <Typography color="error" mb={2}>
          {errorMsg}
        </Typography>

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

      </Container>
    );
  }

  return (
    <>
      <Navbar />

      <Container
        maxWidth="md"
        sx={{
          mt: 5,
          mb: 5
        }}
      >

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="outlined"
          color="success"
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)"
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            color="#166534"
          >
            {complaint.title}
          </Typography>

          <Chip
            label={complaint.status}
            color={
              complaint.status === "Resolved"
                ? "success"
                : complaint.status === "In Progress"
                ? "warning"
                : "default"
            }
            sx={{ mb: 3 }}
          />

          {complaint.image && (

            <Box sx={{ mb: 3 }}>

              <img
                src={complaint.image}
                alt="Complaint"
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  maxHeight: "450px",
                  objectFit: "cover"
                }}
              />

            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h6"
            fontWeight="bold"
            color="#166534"
            gutterBottom
          >
            Description
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: "text.secondary",
              lineHeight: 1.8
            }}
          >
            {complaint.description}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            color="#166534"
            gutterBottom
          >
            Location
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary"
            }}
          >
            📍 {complaint.location}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h6"
            fontWeight="bold"
            color="#166534"
            gutterBottom
          >
            Assigned Worker
          </Typography>

          {complaint.workerName ? (

            <Chip
              label={complaint.workerName}
              color="success"
              sx={{
                fontWeight: "bold",
                px: 1
              }}
            />

          ) : (

            <Typography color="text.secondary">
              No worker assigned yet.
            </Typography>

          )}

        </Paper>

      </Container>
    </>
  );
}

export default ComplaintDetails;