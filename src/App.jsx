import { BrowserRouter, Routes, Route } from "react-router-dom"

import AdminDashboard from "./pages/AdminDashboard"
import ComplaintsPage from "./pages/ComplaintsPage"
import UsersPage from "./pages/UsersPage"
import WorkersPage from "./pages/WorkersPage"

// WORKER DASHBOARD
import WorkerDashboard from "./pages/worker/WorkerDashboard"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<AdminDashboard />}
        />

        {/* Complaints */}
        <Route
          path="/complaints"
          element={<ComplaintsPage />}
        />

        {/* Users */}
        <Route
          path="/users"
          element={<UsersPage />}
        />

        {/* Workers Admin Page */}
        <Route
          path="/workers"
          element={<WorkersPage />}
        />

        {/* Worker Dashboard */}
        <Route
          path="/worker"
          element={<WorkerDashboard />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App