// src/pages/users/UserEditFormDesign.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userEditRequest } from "../../features/user/userAction";
import UserForm from "../../components/forms/UserForms";

const toInitialValues = (r) =>
  !r
    ? {}
    : {
        id: r.user_id,
        name: r.name ?? "",
        username: r.username ?? "",
        mobile: r.mobile_number ?? "",
        email: r.email ?? "",
        age: r.age ?? "",
        gender: r.gender ?? "",
        profileStatus: r.profile_status ?? "",
        status: r.status ?? "",
        coins: r.coin_balance ?? "",
        lat: r.location_lat ?? "",
        lon: r.location_log ?? "",
        dob: r.date_of_birth ?? "",
        bio: r.bio ?? "",
        otp: r.otp ?? "",
        createdAt: r.created_at ?? r.createdAt ?? "",
        updatedAt: r.updated_at ?? r.updatedAt ?? "",
      };

const UserEditFormDesign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, user, error, success, message } = useSelector(
    (s) => s.user || {}
  );

  const [submitted, setSubmitted] = useState(false);
  const [backendFieldErrors, setBackendFieldErrors] = useState({}); // 👈 here

  const row = location.state?.row || null;

  const initialValues = useMemo(() => toInitialValues(row), [row]);

  const handleClose = () => {
    navigate("/userlistpage", { replace: true });
  };

  // 🔔 handle backend error ONLY after this form submitted
  useEffect(() => {
    if (!submitted) return;
    if (!error) return;

    const msg = typeof error === "string" ? error : error.message || "";

    // Example backend message:
    // "Missing required fields: name, age, gender, location_lat, location_log"
    if (msg.includes("Missing required fields:")) {
      const part = msg.split("Missing required fields:")[1] || "";
      const list = part
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const fieldErrors = {};

      list.forEach((fieldName) => {
        switch (fieldName) {
          case "location_lat":
            fieldErrors.lat = "Latitude is required.";
            break;
          case "location_log":
            fieldErrors.lon = "Longitude is required.";
            break;
          default:
            // name, age, gender, etc.
            fieldErrors[fieldName] = `${fieldName
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())} is required.`;
        }
      });

      setBackendFieldErrors(fieldErrors);
      alert(msg); // show raw backend message as well
    } else {
      alert(msg || "Something went wrong while updating the user.");
    }
  }, [error, submitted]);

  // ✅ handle backend success (after this form submitted)
  useEffect(() => {
    if (!submitted) return;
    if (!success) return;
    if (message) {
      alert(message); // e.g. "Profile updated"
    }
    handleClose();
  }, [success, message, submitted]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormSubmit = (values) => {
    const { id, user_id, ...rest } = values;
    const editId = id ?? user_id;

    const apiData = {
      name: rest.name,
      username: rest.username|| null,
      mobile_number: rest.mobile,
      email: rest.email || null,
      age: rest.age,
      gender: rest.gender,
      profile_status: rest.profileStatus,
      status: rest.status,
      coin_balance: rest.coins,
      location_lat: rest.lat,
      location_log: rest.lon,
      date_of_birth: rest.dob || null,
      bio: rest.bio || null,
      // otp: rest.otp, // include if your API needs it
    };

    setSubmitted(true);
    setBackendFieldErrors({}); // reset old backend errors
console.log(editId,apiData)
    dispatch(
      userEditRequest({
        id: editId,
        data: apiData,
      })
    );
  };

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!row) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.4)",
          color: "#fff",
          fontSize: 18,
        }}
      >
        No user data received for editing.
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 64, 175, 0.85))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 1050,
      }}
    >
      
        
        <UserForm
          open={true}
          mode="edit"
          initialValues={initialValues}
          onClose={handleClose}
          onSubmit={handleFormSubmit}
          backendErrors={backendFieldErrors} // 👈 pass backend-required fields
        />
      
    </div>
  );
};

export default UserEditFormDesign;
