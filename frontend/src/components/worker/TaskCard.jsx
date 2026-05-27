import React, { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UploadIcon from "@mui/icons-material/Upload";

export default function TaskCard({ task }) {

  const [status, setStatus] = useState(task.status || "Pending");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const getStatusColor = () => {
    switch (status) {

      case "Resolved":
        return "success";

      case "In Progress":
        return "info";

      default:
        return "warning";
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        background:
          "linear-gradient(to bottom right, #ffffff, #ecfdf5)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>

        {/* Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#166534"
          gutterBottom
        >
          {task.location}
        </Typography>

        {/* Task Info */}
        <Typography sx={{ mb: 1 }}>
          <strong>Type:</strong> {task.type}
        </Typography>

        <Typography sx={{ mb: 2 }}>
          <strong>Date:</strong> {task.assignedDate}
        </Typography>

        {/* Status */}
        <Chip
          label={status}
          color={getStatusColor()}
          sx={{
            mb: 3,
            fontWeight: "bold",
          }}
        />

        {/* Buttons */}
        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
        >

          {/* Start Work */}
          <Button
            variant="contained"
            color="info"
            startIcon={<PlayArrowIcon />}
            onClick={() => setStatus("In Progress")}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Start Work
          </Button>

          {/* Resolve */}
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => setStatus("Resolved")}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Mark Resolved
          </Button>

          {/* Upload */}
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadIcon />}
            sx={{
              bgcolor: "#0f766e",
              "&:hover": {
                bgcolor: "#115e59",
              },
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Upload Proof

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>

        </Stack>

        {/* Uploaded Image */}
        {image && (
          <Box mt={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
            >
              Uploaded Proof
            </Typography>

            <Box
              component="img"
              src={image}
              alt="Proof"
              sx={{
                width: "100%",
                maxWidth: 320,
                borderRadius: 3,
                border: "3px solid #bbf7d0",
              }}
            />
          </Box>
        )}

      </CardContent>
    </Card>
  );
}
