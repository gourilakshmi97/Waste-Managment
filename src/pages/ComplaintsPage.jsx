import React, { useState } from "react";

export default function ComplaintsPage() {
  const [search, setSearch] = useState("");

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      location: "Thrissur Market",
      type: "Plastic Waste",
      status: "Pending",
    },
    {
      id: 2,
      location: "MG Road",
      type: "Garbage Overflow",
      status: "Resolved",
    },
    {
      id: 3,
      location: "Railway Station",
      type: "Food Waste",
      status: "In Progress",
    },
  ]);

  // Delete complaint
  const deleteComplaint = (id) => {
    setComplaints(
      complaints.filter((complaint) => complaint.id !== id)
    );
  };

  // Filter complaints
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.location
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Complaint Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search complaints..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginTop: "20px",
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* Table */}
      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={tableHeader}>Location</th>
            <th style={tableHeader}>Complaint Type</th>
            <th style={tableHeader}>Status</th>
            <th style={tableHeader}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredComplaints.map((complaint) => (
            <tr key={complaint.id}>
              <td style={tableCell}>
                {complaint.location}
              </td>

              <td style={tableCell}>
                {complaint.type}
              </td>

              <td style={tableCell}>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    background:
                      complaint.status === "Resolved"
                        ? "#dcfce7"
                        : complaint.status === "Pending"
                        ? "#fee2e2"
                        : "#dbeafe",

                    color:
                      complaint.status === "Resolved"
                        ? "#166534"
                        : complaint.status === "Pending"
                        ? "#991b1b"
                        : "#1d4ed8",
                  }}
                >
                  {complaint.status}
                </span>
              </td>

              <td style={tableCell}>
                <button
                  onClick={() =>
                    deleteComplaint(complaint.id)
                  }
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#dc2626",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles
const tableHeader = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};