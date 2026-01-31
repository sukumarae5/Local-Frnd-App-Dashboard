// src/components/forms/UserForms.jsx
import React, { useState, useEffect } from "react";

export default function UserForm({
  open = false,
  mode = "add",
  initialValues = {},
  onClose,
  onSubmit,
  backendErrors = {}, // 👈 new prop for backend error mapping
}) {
  const v = {
    id: initialValues.id ?? initialValues.user_id ?? "",
    name: initialValues.name ?? "",
    username: initialValues.username ?? "",
    mobile: initialValues.mobile ?? initialValues.mobile_number ?? "",
    email: initialValues.email ?? "",
    age: initialValues.age ?? "",
    dob: initialValues.dob ?? initialValues.date_of_birth ?? "",
    gender:
      initialValues.gender === "male"
        ? "Male"
        : initialValues.gender === "female"
        ? "Female"
        : initialValues.gender ?? "",
    profileStatus:
      initialValues.profileStatus ?? initialValues.profile_status ?? "",
    status: initialValues.status ?? "",
    coins: initialValues.coins ?? initialValues.coin_balance ?? "",
    lat: initialValues.lat ?? initialValues.location_lat ?? "",
    lon: initialValues.lon ?? initialValues.location_log ?? "",
    bio: initialValues.bio ?? "",
    otp: initialValues.otp ?? "",
  };

  const [errors, setErrors] = useState({});

  // 🔁 Whenever backend sends field errors, merge them into local errors
  useEffect(() => {
    if (backendErrors && Object.keys(backendErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...backendErrors }));
    }
  }, [backendErrors]);

  if (!open) return null;

  // --- STYLES ---
  const backdropStyle = {
    position: "fixed",
    inset: 0,
    // ✅ ONLY COLOR CHANGE
    background:
      "linear-gradient(135deg, rgba(127,0,255,0.25) 0%, rgba(191,40,225,0.25) 50%, rgba(0,0,0,0.9) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const modalStyle = {
    width: "min(720px,96vw)",
    maxHeight: "90vh",
    overflow: "auto",
    // ✅ ONLY COLOR CHANGE
    background: "linear-gradient(145deg, #7F00FF 0%, #BF28E1 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    boxShadow: "0 12px 36px rgba(0,0,0,0.6)",
    padding: "24px 28px",
    fontFamily: "Inter,sans-serif",
    color: "#f3f4f6",
    marginTop: 40,
    marginLeft: 80,
  };

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #4c4f5a",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 14,
    outline: "none",
    background: "rgba(0,0,0,0.25)",
    color: "#f9fafb",
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    color: "#ffffff",
  };

  const fieldStyle = { marginBottom: 14 };
  const actionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 20,
  };

  const btnSecondary = {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #6b7280",
    background: "rgba(0,0,0,0.25)",
    fontSize: 14,
    fontWeight: 500,
    color: "#e5e7eb",
    cursor: "pointer",
  };

  const btnPrimary = {
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    // ✅ ONLY COLOR CHANGE
    background: "linear-gradient(90deg, #7F00FF 0%, #BF28E1 100%)",
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: 0.3,
  };

  const errorTextStyle = { marginTop: 4, fontSize: 11, color: "#fca5a5" };

  const inputErrorStyle = (field) =>
    errors[field]
      ? { borderColor: "#f97373", boxShadow: "0 0 0 1px rgba(248,113,113,0.4)" }
      : {};

  const Field = ({ label, children }) => (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );

  const Row = ({ children, className = "" }) => (
    <div className={`user-row ${className}`}>{children}</div>
  );

  // --- SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd.entries());

    const newErrors = {};

    // Basic required validations
    if (!values.id?.trim()) newErrors.id = "User ID is required.";
    if (!values.name?.trim()) newErrors.name = "Name is required.";
    if (!values.mobile?.trim()) newErrors.mobile = "Mobile Number is required.";
    if (!values.gender) newErrors.gender = "Gender is required.";
    if (!values.age?.trim()) newErrors.age = "Age is required.";
    if (!values.lat?.trim()) newErrors.lat = "Latitude is required.";
    if (!values.lon?.trim()) newErrors.lon = "Longitude is required.";

    // Email pattern validation
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Mobile: at least 10 digits
    if (values.mobile) {
      const digitsOnly = values.mobile.replace(/\D/g, "");
      if (digitsOnly.length < 10) {
        newErrors.mobile = "Mobile number must be at least 10 digits.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Convert numeric fields
    ["id", "age", "coins"].forEach((field) => {
      if (values[field] !== undefined && values[field] !== "") {
        const n = Number(values[field]);
        if (!Number.isNaN(n)) values[field] = n;
      }
    });

    onSubmit?.(values);
  };

  return (
    <>
      <style>
        {`
          .user-modal {
            margin: 30px auto;
            width: min(720px, 90vw);
          }

          @media (max-width: 1200px) {
            .user-modal {
              margin-left: 60px;
              margin-right: 60px;
            }
          }

          @media (max-width: 992px) {
            .user-modal {
              margin-left: 50px;
              margin-right: 50px;
            }
          }

          @media (max-width: 576px) {
            .user-modal {
              margin-left: 30px !important;
              margin-right: 30px !important;
              width: calc(100vw - 60px) !important;
            }
          }

          /* Row styles */
          .user-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          @media (max-width: 576px) {
            .user-row {
              grid-template-columns: 1fr !important;
              gap: 12px;
            }
          }
        `}
      </style>

      <div style={backdropStyle} onClick={onClose}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              padding: "12px 14px",
              borderRadius: 10,
              // ✅ ONLY COLOR CHANGE
              background: "linear-gradient(135deg, #7F00FF, #BF28E1)",
              color: "#fff",
            }}
          >
            <h3 style={{ margin: 0, fontWeight: 700 }}>
              {mode === "edit" ? "Edit User" : "Add User"}
            </h3>
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: 22,
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="otp" defaultValue={v.otp} />

            <Row>
              <Field label="User ID *">
                <input
                  name="id"
                  style={{ ...inputStyle, ...inputErrorStyle("id") }}
                  placeholder="12345"
                  defaultValue={v.id}
                />
                {errors.id && <div style={errorTextStyle}>{errors.id}</div>}
              </Field>

              <Field label="Name *">
                <input
                  name="name"
                  style={{ ...inputStyle, ...inputErrorStyle("name") }}
                  placeholder="John Doe"
                  defaultValue={v.name}
                />
                {errors.name && <div style={errorTextStyle}>{errors.name}</div>}
              </Field>
            </Row>

            <Row>
              <Field label="Username">
                <input
                  name="username"
                  style={inputStyle}
                  placeholder="johndoe"
                  defaultValue={v.username}
                />
              </Field>

              <Field label="Mobile Number *">
                <input
                  name="mobile"
                  style={{ ...inputStyle, ...inputErrorStyle("mobile") }}
                  placeholder="+1 555 123 4567"
                  defaultValue={v.mobile}
                />
                {errors.mobile && (
                  <div style={errorTextStyle}>{errors.mobile}</div>
                )}
              </Field>
            </Row>

            <Row>
              <Field label="Email">
                <input
                  name="email"
                  type="email"
                  style={{ ...inputStyle, ...inputErrorStyle("email") }}
                  placeholder="john@example.com"
                  defaultValue={v.email}
                />
                {errors.email && (
                  <div style={errorTextStyle}>{errors.email}</div>
                )}
              </Field>

              <Field label="Date of Birth">
                <input
                  type="date"
                  name="dob"
                  style={inputStyle}
                  defaultValue={v.dob}
                />
                {errors.dob && <div style={errorTextStyle}>{errors.dob}</div>}
              </Field>
            </Row>

            <Row>
              <Field label="Age *">
                <input
                  name="age"
                  style={{ ...inputStyle, ...inputErrorStyle("age") }}
                  defaultValue={v.age}
                  placeholder="25"
                />
                {errors.age && <div style={errorTextStyle}>{errors.age}</div>}
              </Field>

              <Field label="Gender *">
                <select
                  name="gender"
                  style={{ ...inputStyle, ...inputErrorStyle("gender") }}
                  defaultValue={v.gender}
                >
                  <option value="">Select…</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <div style={errorTextStyle}>{errors.gender}</div>
                )}
              </Field>
            </Row>

            <Row>
              <Field label="Profile Status">
                <select
                  name="profileStatus"
                  style={inputStyle}
                  defaultValue={v.profileStatus}
                >
                  <option value="">Select…</option>
                  <option value="unverified">Unverified</option>
                  <option value="verified">Verified</option>
                </select>
              </Field>

              <Field label="Status">
                <select
                  name="status"
                  style={inputStyle}
                  defaultValue={v.status}
                >
                  <option value="">Select…</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Field>
            </Row>

            <Row>
              <Field label="Coin Balance">
                <input
                  name="coins"
                  style={inputStyle}
                  placeholder="250"
                  defaultValue={v.coins}
                />
              </Field>

              <Field label="Bio">
                <textarea
                  name="bio"
                  style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
                  placeholder="Short bio…"
                  defaultValue={v.bio}
                />
              </Field>
            </Row>

            <Row>
              <Field label="Location Lat *">
                <input
                  name="lat"
                  style={{ ...inputStyle, ...inputErrorStyle("lat") }}
                  placeholder="37.7749"
                  defaultValue={v.lat}
                />
                {errors.lat && <div style={errorTextStyle}>{errors.lat}</div>}
              </Field>

              <Field label="Location Lon *">
                <input
                  name="lon"
                  style={{ ...inputStyle, ...inputErrorStyle("lon") }}
                  placeholder="-122.4194"
                  defaultValue={v.lon}
                />
                {errors.lon && <div style={errorTextStyle}>{errors.lon}</div>}
              </Field>
            </Row>

            <div style={actionsStyle}>
              <button type="button" style={btnSecondary} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" style={btnPrimary}>
                {mode === "edit" ? "Save Changes" : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
