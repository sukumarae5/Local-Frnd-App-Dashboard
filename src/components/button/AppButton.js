// src/components/buttons/AppButton.js
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AppButton = ({ onView, onEdit, onDelete }) => {
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
      <Button
        size="sm"
        variant="info"
        style={btnStyle}
        onClick={onView}
      >
        <FaEye /> View
      </Button>
      <Button
        size="sm"
        variant="warning"
        style={btnStyle}
        onClick={onEdit}
      >
        <FaEdit /> Edit
      </Button>
      <Button
        size="sm"
        variant="danger"
        style={btnStyle}
        onClick={onDelete}
      >
        <FaTrash /> Delete
      </Button>
    </ButtonGroup>
  );
};

export default AppButton;
