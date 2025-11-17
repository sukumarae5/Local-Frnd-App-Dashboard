import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/forms/UserForms";

const UserAddForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleSubmit = (values) => {
    // dispatch(createUserRequest(values));
    alert("Creating user…");
    handleClose();
  };

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "#f8f9fc" }} />
     
      <UserForm
        open={open}
        initialValues={{}}   // empty for new
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default UserAddForm;
