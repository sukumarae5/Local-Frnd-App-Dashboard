import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

// 👉 Row action buttons (ONLY Edit / Delete)
export const AppButtonRow = ({ onEdit, onDelete }) => {
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
      {onEdit && (
        <Button size="sm" variant="warning" style={btnStyle} onClick={onEdit}>
          <FaEdit />
        </Button>
      )}
      {onDelete && (
        <Button size="sm" variant="danger" style={btnStyle} onClick={onDelete}>
          <FaTrash />
        </Button>
      )}
    </ButtonGroup>
  );
};
