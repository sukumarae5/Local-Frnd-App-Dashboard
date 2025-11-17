// src/components/forms/UserForms.jsx
import React, { useState, useEffect, useRef } from "react";

export default function UserForm({
  open = false,
  mode = "add",
  initialValues = {},
  onClose,
  onSubmit,
}) {
  // Helper to calculate age from DOB
  const calcAgeFromDob = (dobStr) => {
    if (!dobStr) return "";
    const dob = new Date(dobStr);
    if (Number.isNaN(dob.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return String(age);
  };

  // Normalized initial values
  const v = {
    id: initialValues.id ?? initialValues.user_id ?? "",
    name: initialValues.name ?? "",
    username: initialValues.username ?? "",
    mobile: initialValues.mobile ?? initialValues.mobile_number ?? "",
    email: initialValues.email ?? "",
    dateOfBirth:
      initialValues.dateOfBirth ??
      initialValues.date_of_birth ??
      initialValues.dob ??
      "",
    age:
      initialValues.age ??
      (initialValues.date_of_birth
        ? calcAgeFromDob(initialValues.date_of_birth)
        : ""),
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

  const [dob, setDob] = useState(
    v.dateOfBirth ? String(v.dateOfBirth).slice(0, 10) : ""
  );
  const [age, setAge] = useState(
    v.age || (v.dateOfBirth ? calcAgeFromDob(v.dateOfBirth) : "")
  );

  const dobInputRef = useRef(null);

  useEffect(() => {
    const normDob =
      initialValues.dateOfBirth ??
      initialValues.date_of_birth ??
      initialValues.dob ??
      "";

    const normAge =
      initialValues.age ??
      (initialValues.date_of_birth
        ? calcAgeFromDob(initialValues.date_of_birth)
        : "");

    setDob(normDob ? String(normDob).slice(0, 10) : "");
    setAge(normAge || "");
  }, [initialValues]);

  if (!open) return null;

  // --- STYLES ---
  const backdropStyle = {
    position: "fixed",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(5,0,10,0.92) 0%, rgba(36,0,67,0.92) 45%, rgba(0,0,0,0.92) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const modalStyle = {
    width: "min(720px,96vw)",
    maxHeight: "90vh",
    overflow: "auto",
    background: "#0b0014",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    boxShadow: "0 12px 36px rgba(0,0,0,0.6)",
    padding: "24px 28px",
    fontFamily: "Inter,sans-serif",
    color: "#f3f4f6",
  };

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #4c4f5a",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 14,
    outline: "none",
    background: "#16122a",
    color: "#f9fafb",
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    color: "#c7c9ff",
  };

  const fieldStyle = { marginBottom: 14 };
  const rowStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };
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
    background: "#1f1b2e",
    fontSize: 14,
    fontWeight: 500,
    color: "#e5e7eb",
    cursor: "pointer",
  };

  const btnPrimary = {
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(90deg,#6d28d9 0%,#4f46e5 50%,#240043 100%)",
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

  const dateWrapperStyle = { position: "relative" };
  const dateInputStyle = {
    ...inputStyle,
    paddingRight: "38px",
  };

  const calendarButtonStyle = {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const Field = ({ label, children }) => (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );

  const Row = ({ children }) => <div style={rowStyle}>{children}</div>;

  // --- HANDLE SUBMIT WITH AGE VALIDATION ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd.entries());

    // Auto-calc age from DOB
    if (values.dateOfBirth) {
      const calc = calcAgeFromDob(values.dateOfBirth);
      const ageNum = Number(calc);
      if (!Number.isNaN(ageNum)) values.age = ageNum;
    }

    // ----------------------------
    // ✅ AGE VALIDATION CHECK
    // ----------------------------
    const ageNum = Number(values.age);
    if (!Number.isNaN(ageNum) && ageNum < 18) {
      alert("User must be 18 years old or older.");
      return; // stop submitting
    }

    const newErrors = {};

    if (!values.id?.trim()) newErrors.id = "User ID is required.";
    if (!values.name?.trim()) newErrors.name = "Name is required.";
    if (!values.mobile?.trim())
      newErrors.mobile = "Mobile Number is required.";
    if (!values.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required.";
    if (!values.gender) newErrors.gender = "Gender is required.";

    if (
      values.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    ["id", "coins"].forEach((field) => {
      if (values[field] !== undefined && values[field] !== "") {
        const n = Number(values[field]);
        if (!Number.isNaN(n)) values[field] = n;
      }
    });

    onSubmit?.(values);
  };

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            padding: "12px 14px",
            borderRadius: 10,
            background:
              "linear-gradient(90deg,#6d28d9 0%,#4f46e5 40%,#0b0014 100%)",
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

        {/* FORM */}
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

            <Field label="Age (auto) *">
              <input
                name="age"
                style={inputStyle}
                value={age}
                readOnly
                placeholder="Auto"
              />
            </Field>
          </Row>

          <Row>
            <Field label="Date of Birth *">
              <div style={dateWrapperStyle}>
                <input
                  name="dateOfBirth"
                  type="date"
                  ref={dobInputRef}
                  style={{
                    ...dateInputStyle,
                    ...inputErrorStyle("dateOfBirth"),
                  }}
                  value={dob}
                  onChange={(e) => {
                    const newDob = e.target.value;
                    setDob(newDob);
                    setAge(calcAgeFromDob(newDob));
                  }}
                />
                {errors.dateOfBirth && (
                  <div style={errorTextStyle}>{errors.dateOfBirth}</div>
                )}

                <button
                  type="button"
                  style={calendarButtonStyle}
                  onClick={() => {
                    if (dobInputRef.current?.showPicker) {
                      dobInputRef.current.showPicker();
                    } else {
                      dobInputRef.current?.focus();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </button>
              </div>
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
            <Field label="Location Lat">
              <input
                name="lat"
                style={inputStyle}
                placeholder="37.7749"
                defaultValue={v.lat}
              />
            </Field>

            <Field label="Location Lon">
              <input
                name="lon"
                style={inputStyle}
                placeholder="-122.4194"
                defaultValue={v.lon}
              />
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
  );
}
