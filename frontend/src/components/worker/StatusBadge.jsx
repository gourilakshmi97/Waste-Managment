import React from "react";
import { Chip } from "@mui/material";

const StatusBadge = ({ status }) => {

  const getStatusProps = (currentStatus) => {
    switch (currentStatus) {

      case "Resolved":
        return {
          label: "Resolved",
          sx: {
            bgcolor: "#dcfce7",
            color: "#15803d",
            border: "1px solid #86efac",
            fontWeight: "bold",
          },
        };

      case "In Progress":
        return {
          label: "In Progress",
          sx: {
            bgcolor: "#dbeafe",
            color: "#1d4ed8",
            border: "1px solid #93c5fd",
            fontWeight: "bold",
          },
        };

      case "Pending":
      default:
        return {
          label: "Pending",
          sx: {
            bgcolor: "#fef3c7",
            color: "#b45309",
            border: "1px solid #fde68a",
            fontWeight: "bold",
          },
        };
    }
  };

  const badge = getStatusProps(status);

  return (
    <Chip
      label={badge.label}
      size="small"
      sx={{
        borderRadius: "20px",
        px: 1,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        ...badge.sx,
      }}
    />
  );
};

export default StatusBadge;