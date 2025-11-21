// src/pages/users/UserListPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userDeleteRequest,
  userFetchRequest,
} from "../../features/user/userAction";
import AppTable from "../../components/tables/AppTable";
import { AppButtonRow } from "../../components/button/AppButton";
import AppPagination from "../../components/pagination/AppPagination";
import "bootstrap-icons/font/bootstrap-icons.css";

const UserListPage = () => {
  const [q, setQ] = useState("");
  const [screenSize, setScreenSize] = useState("desktop");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((s) => s.user || {});

  const navigate = useNavigate();

  // Normalize: API may return single object or array
  const users = useMemo(() => {
    if (Array.isArray(user)) return user;
    if (user && typeof user === "object") return [user];
    return [];
  }, [user]);

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

  // debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(userFetchRequest(q));
    }, 400);
    return () => clearTimeout(delay);
  }, [q, dispatch]);

  const handleView = (row) =>
    alert(`Viewing user: ${row.name ?? row.user_id}`);

  const handleEdit = (row) => {
    // Navigate to edit page and pass selected row in location.state
    navigate("/dashboard/userlistpage/edit", { state: { row } });
  };

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

          {/* 🔍 Search only */}
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
    </div>
  );
};

export default UserListPage;
