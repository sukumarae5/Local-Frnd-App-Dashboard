// src/pages/users/UserListPage.js
import React from "react";
import { Badge } from "react-bootstrap";
import AppTable from "../../components/tables/AppTable";
import AppButton from "../../components/button/AppButton";

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Moderator", status: "Active" },
  { id: 4, name: "David Lee", email: "david@example.com", role: "User", status: "Active" },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", role: "Admin", status: "Inactive" },
];

const UserListPage = () => {
  const handleView = (user) => alert(`Viewing ${user.name}`);
  const handleEdit = (user) => alert(`Editing ${user.name}`);
  const handleDelete = (user) => alert(`Deleting ${user.name}`);

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge bg={row.status === "Active" ? "success" : "danger"}>{row.status}</Badge>
      ),
      thProps: { className: "text-center" },
      tdProps: { className: "text-center" },
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <AppButton
          onView={() => handleView(row)}
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
      thProps: { style: { width: 220 } },
    },
  ];

  return (
    <div className="p-3 userlist-container">
      <div className="table-responsive">
        <AppTable columns={columns} data={users} />
      </div>

      {/* ✅ Responsive Table CSS */}
      <style>{`
        .userlist-container {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
        }

        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          white-space: nowrap;
          text-align: left;
        }

        /* ✅ Mobile View (only horizontal scroll) */
        @media (max-width: 768px) {
          .table-responsive {
            margin-left: 0 !important;
            border-radius: 6px;
            box-shadow: 0 0 4px rgba(0,0,0,0.1);
          }

          table {
            display: table;
            width: max-content; /* Keeps full table visible with scroll */
          }
        }
      `}</style>
    </div>
  );
};

export default UserListPage;
