import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Topbar = () => {
  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        bgcolor: "white",
        color: "black",
        borderRadius: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Admin Dashboard
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Smart Waste Management System
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#2e7d32",
            "&:hover": {
              bgcolor: "#1b5e20",
            },
          }}
        >
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;