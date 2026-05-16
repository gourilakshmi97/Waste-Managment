import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";

import ReportIssue from "./pages/ReportIssue";

import ComplaintList from "./pages/ComplaintList";

import ComplaintDetails from "./pages/ComplaintDetails";

import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"

          element={<Login />}
        />

        <Route
          path="/signup"

          element={<Signup />}
        />

        {/* Protected Routes */}

        <Route
          path="/home"

          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"

          element={
            <ProtectedRoute>
              <ReportIssue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"

          element={
            <ProtectedRoute>
              <ComplaintList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint/:id"

          element={
            <ProtectedRoute>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"

          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;