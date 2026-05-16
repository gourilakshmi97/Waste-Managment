import React, { useState } from "react";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Anu",
      email: "anu@gmail.com",
      status: "Blocked",
    },
    {
      id: 3,
      name: "Arjun",
      email: "arjun@gmail.com",
      status: "Active",
    },
  ]);

  // Block / Unblock
  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : user
      )
    );
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
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
            <th style={tableHeader}>Name</th>
            <th style={tableHeader}>Email</th>
            <th style={tableHeader}>Status</th>
            <th style={tableHeader}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td style={tableCell}>{user.name}</td>

              <td style={tableCell}>{user.email}</td>

              <td style={tableCell}>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    background:
                      user.status === "Active"
                        ? "#dcfce7"
                        : "#fee2e2",
                    color:
                      user.status === "Active"
                        ? "#166534"
                        : "#991b1b",
                    fontWeight: "bold",
                  }}
                >
                  {user.status}
                </span>
              </td>

              <td style={tableCell}>
                <button
                  onClick={() => toggleStatus(user.id)}
                  style={{
                    marginRight: "10px",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#2563eb",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {user.status === "Active"
                    ? "Block"
                    : "Unblock"}
                </button>

                <button
                  onClick={() => deleteUser(user.id)}
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
