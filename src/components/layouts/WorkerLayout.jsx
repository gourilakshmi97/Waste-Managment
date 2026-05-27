import React from "react";
import { NavLink } from "react-router-dom";

export default function WorkerLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#0f172a",
        color: "white",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "30px" }}>Worker Panel</h2>

        <NavLink to="/worker" style={{ display: "block", marginBottom: "15px", color: "white" }}>
          My Tasks
        </NavLink>

        <NavLink to="/worker/profile" style={{ display: "block", color: "white" }}>
          Profile
        </NavLink>
      </div>

      {/* Main */}
      <div style={{ flex: 1, background: "#f8fafc", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}