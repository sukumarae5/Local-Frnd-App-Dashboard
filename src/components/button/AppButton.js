// src/components/buttons/AppButton.js
import React from "react";
import { Button } from "react-bootstrap";

const AppButton = ({ onView, onEdit, onDelete }) => {
  return (
    <>
      <Button size="sm" variant="info" className="me-2" onClick={onView}>
        View
      </Button>
      <Button size="sm" variant="warning" className="me-2" onClick={onEdit}>
        Edit
      </Button>
      <Button size="sm" variant="danger" onClick={onDelete}>
        Delete
      </Button>
    </>
  );
};

export default AppButton;
