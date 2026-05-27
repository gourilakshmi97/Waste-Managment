import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        <Topbar />

        <Box sx={{ mt: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;