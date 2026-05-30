import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import ComplaintsPage from "./pages/ComplaintsPage";
import Profile from "./pages/Profile";
import ComplaintDetails from "./pages/ComplaintDetails";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  let userRole = localStorage.getItem("userRole");

  if (!userRole) {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    userRole = savedUser?.role;
  }

  const currentRole = (userRole || "").toLowerCase();

  const roles = allowedRoles.map(r => r.toLowerCase());

  if (!roles.includes(currentRole)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function App() {
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      newestOnTop
      pauseOnHover
      theme="colored"
    />
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={
        <ProtectedRoute allowedRoles={["user", "admin", "worker"]}>
          <Home />
        </ProtectedRoute>
      } />

      <Route path="/report-issue" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <ReportIssue />
        </ProtectedRoute>
      } />

      <Route path="/complaints" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <ComplaintsPage />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/worker" element={
        <ProtectedRoute allowedRoles={["worker"]}>
          <WorkerDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/complaint/:id" element={<ComplaintDetails />} />

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
    </>
  );
}

export default App;