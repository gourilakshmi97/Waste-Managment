import React, { useState } from "react";
import { assignedTasks } from "../data/tasks";

export default function WorkersPage() {
  const [workers] = useState([
    {
      id: 1,
      name: "Arun",
      area: "Thrissur",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul",
      area: "MG Road",
      status: "Busy",
    },
  ]);

  const assignTask = () => {
    assignedTasks.push({
      id: assignedTasks.length + 1,
      location: "New Assigned Area",
      type: "Garbage Overflow",
      assignedDate: "2026-05-12",
      status: "Pending",
    });

    alert("Task Assigned Successfully!");
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Workers Page</h1>

      <div
        style={{
          display: "grid",
          gap: "15px",
        }}
      >
        {workers.map((worker) => (
          <div
            key={worker.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{worker.name}</h3>

            <p>
              <strong>Area:</strong> {worker.area}
            </p>

            <p>
              <strong>Status:</strong> {worker.status}
            </p>

            <button
              onClick={assignTask}
              style={{
                marginTop: "10px",
                padding: "8px 14px",
                border: "none",
                borderRadius: "6px",
                background: "#0f766e",
                color: "white",
                cursor: "pointer",
              }}
            >
              Assign Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}