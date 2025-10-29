// src/pages/users/UserListPage.js
import React from "react";
import { Badge } from "react-bootstrap";
import AppTable from "../../components/tables/AppTable";
import AppButton from "../../components/button/AppButton"; // import here

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
    <div className="p-3">
      <AppTable columns={columns} data={users} />
    </div>
  );
};

export default UserListPage;
