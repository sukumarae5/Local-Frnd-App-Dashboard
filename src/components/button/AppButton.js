import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// 👉 Row action buttons (View / Edit / Delete)
export const AppButtonRow = ({ onView, onEdit, onDelete }) => {
  const btnStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: 500,
    borderRadius: "8px",
    padding: "0.35rem 0.6rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  return (
    <ButtonGroup style={{ display: "flex", gap: "8px" }}>
      <Button size="sm" variant="info" style={btnStyle} onClick={onView}>
        <FaEye />
      </Button>
      <Button size="sm" variant="warning" style={btnStyle} onClick={onEdit}>
        <FaEdit />
      </Button>
      <Button size="sm" variant="danger" style={btnStyle} onClick={onDelete}>
        <FaTrash />
      </Button>
    </ButtonGroup>
  );
};

// 👉 Top-right Add button (used once above the table)
export const AppAddButton = ({ onAdd }) => {
  const btnStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: 500,
    borderRadius: "8px",
    padding: "0.45rem 0.8rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  return (
    <Button variant="success" size="sm" style={btnStyle} onClick={onAdd}>
      <FaPlus /> Add User
    </Button>
  );
};
