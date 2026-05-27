import React, { useState } from "react";
<h1 style={{ color: "red" }}>NEW TASKCARD LOADED</h1>
export default function TaskCard({ task }) {
  const [status, setStatus] = useState(task.status);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h3>{task.location}</h3>

      <p>
        <strong>Type:</strong> {task.type}
      </p>

      <p>
        <strong>Date:</strong> {task.assignedDate}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setStatus("In Progress")}>
          Start Work
        </button>

        <button onClick={() => setStatus("Resolved")}>
          Mark Resolved
        </button>

        <label
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            background: "#0f766e",
            color: "white",
            cursor: "pointer",
          }}
        >
          Upload Proof

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {image && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Uploaded Proof:</strong>
          </p>

          <img
            src={image}
            alt="Proof"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
}
