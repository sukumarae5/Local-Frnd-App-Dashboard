// src/pages/users/UserListPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  userDeleteRequest,
  userEditRequest,
  userFetchRequest,
} from "../../features/user/userAction";
import AppTable from "../../components/tables/AppTable";
import { AppButtonRow } from "../../components/button/AppButton";
import AppPagination from "../../components/pagination/AppPagination";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserForm from "../../components/forms/UserForms";

const UserListPage = () => {
  const [q, setQ] = useState("");
  const [screenSize, setScreenSize] = useState("desktop");

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("edit"); // only edit
  const [formInitialValues, setFormInitialValues] = useState({});

  // Pagination (client-side)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((s) => s.user || {});

  // Normalize: API may return single object or array
  const users = useMemo(() => {
    if (Array.isArray(user)) return user;
    if (user && typeof user === "object") return [user];
    return [];
  }, [user]);

  const navigate = useNavigate();
  const location = useLocation();

  // responsive
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 576) setScreenSize("mobile");
      else if (width <= 992) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // initial fetch
  useEffect(() => {
    dispatch(userFetchRequest());
  }, [dispatch]);

  // reset page when user count changes
  useEffect(() => {
    setCurrentPage(1);
  }, [users.length]);

  // lock scroll ONLY when modal open
  useEffect(() => {
    if (!formOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [formOpen]);

  // debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(userFetchRequest(q));
    }, 400);
    return () => clearTimeout(delay);
  }, [q, dispatch]);

  // Map table row → initialValues for form (fields per your API)
  const toInitialValues = (r) => ({
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
  });

  // open edit modal
  const openEdit = (row) => {
    setFormMode("edit");
    setFormInitialValues(toInitialValues(row));
    setFormOpen(true);

    if (!location.pathname.endsWith("/edit")) {
      navigate("edit");
    }
  };

  const closeForm = () => {
    setFormOpen(false);
    if (location.pathname.endsWith("/edit")) {
      navigate("/dashboard/userlistpage", { replace: true });
    }
  };

  // wire table actions
  const handleView = (row) =>
    alert(`Viewing user: ${row.name ?? row.user_id}`);
  const handleEdit = (row) => openEdit(row);
  const handleDelete = (row) => {
  if (window.confirm(`Are you sure to delete ${row.name ?? row.user_id}?`)) {
    
    dispatch(
      userDeleteRequest({
        id: row.user_id,
        data: row, 
      })
    );
  }
};

  useEffect(() => {
    if (formOpen) return;
    if (location.pathname.endsWith("/edit")) {
      setFormMode("edit");
      setFormInitialValues({});
      setFormOpen(true);
    }
  }, [location.pathname]);

const handleFormSubmit = (values) => {
  const { id, user_id, ...rest } = values;
  const editId = id ?? user_id;

  const apiData = {
    
    name: rest.name,
    gender: rest.gender,
    age: rest.age,
    location_lat: rest.lat,
    location_log: rest.lon,
  };

  dispatch(
    userEditRequest({
      id: editId,
      data: apiData,
    })
  );

  closeForm();
};



  // Columns aligned to your API fields
  const columns = useMemo(
    () => [
      { key: "user_id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "age", label: "Age", render: (r) => r.age ?? "-" },
      { key: "gender", label: "Gender", render: (r) => r.gender ?? "-" },
      { key: "email", label: "Email", render: (r) => r.email ?? "-" },
      {
        key: "mobile_number",
        label: "Phone",
        render: (r) => r.mobile_number ?? "-",
      },
      { key: "status", label: "Status", render: (r) => r.status ?? "-" },
      {
        key: "profile_status",
        label: "Profile",
        render: (r) => r.profile_status ?? "-",
      },
      {
        key: "location",
        label: "Location (lat, lon)",
        render: (r) => `${r.location_lat ?? "-"}, ${r.location_log ?? "-"}`,
      },
      {
        key: "coin_balance",
        label: "Coins",
        render: (r) => r.coin_balance ?? "-",
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AppButtonRow
              onView={() => handleView(row)}
              onEdit={() => handleEdit(row)}
              onDelete={() => handleDelete(row)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const containerStyles = {
    position: "fixed",
    top:
      screenSize === "mobile"
        ? "200px"
        : screenSize === "tablet"
        ? "200px"
        : "230px",
    left: "100px",
    right: screenSize === "mobile" ? "20px" : "60px",
    bottom: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: screenSize === "mobile" ? "8px" : "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: screenSize === "mobile" ? "16px" : "20px 26px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
  };

  const pageBackground = {
    position: "absolute",
    top: screenSize === "desktop" ? "80px" : "40px",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f8f9fc",
  };

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  }, [users, currentPage]);

  return (
    <div style={pageBackground}>
      <div style={containerStyles}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent:
              screenSize === "mobile" ? "center" : "space-between",
            alignItems: "center",
            marginBottom: "10px",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
            flexDirection: screenSize === "mobile" ? "column" : "row",
          }}
        >
          <h4
            style={{
              fontWeight: 600,
              fontSize: screenSize === "mobile" ? "1.1rem" : "1.25rem",
              marginBottom: screenSize === "mobile" ? "10px" : "0",
              textAlign: screenSize === "mobile" ? "center" : "left",
            }}
          >
            User List
          </h4>

          {/* 🔍 Search only (no Add button) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                screenSize === "mobile" ? "center" : "flex-end",
              gap: "12px",
              width: screenSize === "mobile" ? "100%" : "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                width: screenSize === "mobile" ? "100%" : "220px",
              }}
            >
              <i
                className="bi bi-search"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  color: "#888",
                  fontSize: "1rem",
                }}
              />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "6px 10px 6px 30px",
                  borderRadius: "8px",
                  border: "2px solid #ced4da", 
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            <AppTable
              columns={columns}
              data={pagedUsers}
              tableProps={{
                size: screenSize === "mobile" ? "sm" : "md",
                responsive: true,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                marginTop: 8,
                padding: "0 10px",
              }}
            >
              <span style={{ opacity: 0.8 }}>
                Showing{" "}
                {users.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}{" "}
                - {Math.min(currentPage * itemsPerPage, users.length)} of{" "}
                {users.length}
              </span>
            </div>

            <AppPagination
              totalItems={users.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Modal */}
      <UserForm
        open={formOpen}
        mode={formMode}
        initialValues={formInitialValues}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UserListPage;
