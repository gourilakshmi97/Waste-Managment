import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { resolveImageUrl, NO_IMAGE_PLACEHOLDER } from "../utils/imageUrl";

export default function ComplaintCard({ complaint }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 450,
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        transition: "0.3s ease",
        border: "1px solid #e2e8f0",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(16,185,129,0.25)"
        }
      }}
    >
      {/* IMAGE */}
      <CardMedia
        component="img"
        image={resolveImageUrl(complaint.imageUrl) || NO_IMAGE_PLACEHOLDER}
        alt="Complaint"
        sx={{
          height: 220,
          objectFit: "cover"
        }}
      />

      {/* CONTENT */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3
        }}
      >
        <Box>
          {/* TITLE */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 1,
              color: "#0f172a"
            }}
          >
            {complaint.title}
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              minHeight: 70
            }}
          >
            {complaint.description?.length > 120
              ? complaint.description.substring(0, 120) + "..."
              : complaint.description}
          </Typography>
        </Box>

        {/* LOCATION + STATUS */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          sx={{ mb: 2 }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{
              flex: 1,
              overflow: "hidden"
            }}
          >
            <LocationOnIcon
              sx={{
                fontSize: 18,
                color: "#10b981"
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {complaint.location}
            </Typography>
          </Box>

          <Chip
            label={complaint.status || "Pending"}
            color={getStatusColor(complaint.status)}
            size="small"
            sx={{
              fontWeight: "bold",
              borderRadius: "8px"
            }}
          />
        </Box>

        {/* BUTTON */}
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate(`/complaint/${complaint._id}`)}
          sx={{
            mt: 1,
            py: 1.3,
            borderRadius: "12px",
            fontWeight: "bold",
            textTransform: "none",
            background:
              "linear-gradient(135deg, #059669 0%, #10b981 100%)",

            "&:hover": {
              background:
                "linear-gradient(135deg, #047857 0%, #059669 100%)"
            }
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}