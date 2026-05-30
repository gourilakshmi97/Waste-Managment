import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API from "../services/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const UploadProofModal = ({
  isOpen,
  onClose,
  taskId,
  onUploadSuccess,
}) => {

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmitProof = () => {

    if (!imageFile) {
      toast.warning("Please select an image first");
      return;
    }

    setIsSubmitting(true);

   // Ensure you have imported your API instance at the top
import API from "../services/api"; 

const reader = new FileReader();

reader.readAsDataURL(imageFile);

reader.onloadend = async () => {
  try {
    // Change: Use API.patch, and just the route path
    await API.patch(`/complaints/${taskId}`, {
      image: reader.result,
      status: "Resolved",
    });

    toast.success("Proof uploaded successfully");

    setImageFile(null);
    setPreviewUrl("");

    onUploadSuccess();
    onClose();
  } catch (err) {
    console.error(err);
    toast.error("Upload failed");
  } finally {
    setIsSubmitting(false);
  }
};
  }
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
          background:
            "linear-gradient(to bottom right, #ffffff, #ecfdf5)",
          p: 1,
        },
      }}
    >

      {/* Title */}
      <DialogTitle
        sx={{
          fontWeight: "bold",
          color: "#166534",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Submit Work Proof

        <Button
          onClick={onClose}
          color="error"
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      {/* Content */}
      <DialogContent>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          Upload an image showing the cleaned waste area.
        </Typography>

        {/* Upload Box */}
        <Box
          sx={{
            border: "2px dashed #22c55e",
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            bgcolor: "#f0fdf4",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              bgcolor: "#dcfce7",
            },
          }}
          component="label"
        >

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {previewUrl ? (
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{
                width: "100%",
                maxHeight: 300,
                objectFit: "cover",
                borderRadius: 3,
              }}
            />
          ) : (
            <>
              <UploadIcon
                sx={{
                  fontSize: 50,
                  color: "#16a34a",
                  mb: 2,
                }}
              />

              <Typography
                fontWeight="bold"
                color="#166534"
              >
                Click to Upload Proof
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                PNG, JPG, JPEG supported
              </Typography>
            </>
          )}
        </Box>

      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 3 }}>

        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{
            borderRadius: 3,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmitProof}
          variant="contained"
          color="success"
          startIcon={
            isSubmitting ? (
              <CircularProgress
                size={18}
                color="inherit"
              />
            ) : (
              <CheckCircleIcon />
            )
          }
          disabled={isSubmitting}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
          }}
        >
          {isSubmitting
            ? "Uploading..."
            : "Confirm Upload"}
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default UploadProofModal;