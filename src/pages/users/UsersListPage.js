import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [screen, setScreen] = useState("desktop");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("edit");
  const [formInitialValues, setFormInitialValues] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((s) => s.user || {});

  const users = useMemo(() => {
    if (Array.isArray(user)) return user;
    if (user && typeof user === "object") return [user];
    return [];
  }, [user]);

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= SCREEN SIZE ================= */
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 576) setScreen("mobile");
      else if (w <= 992) setScreen("tablet");
      else setScreen("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(userFetchRequest());
  }, [dispatch]);

  /* ================= RESET PAGE ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [users.length]);

  /* ================= FORM SCROLL LOCK ================= */
  useEffect(() => {
    if (!formOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [formOpen]);

  /* ================= SEARCH (DEBOUNCE) ================= */
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(userFetchRequest(q));
    }, 400);
    return () => clearTimeout(delay);
  }, [q, dispatch]);

  /* ================= EDIT ================= */
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
    createdAt: r.created_at ?? "",
    updatedAt: r.updated_at ?? "",
  });

  const openEdit = (row) => {
    setFormMode("edit");
    setFormInitialValues(toInitialValues(row));
    setFormOpen(true);

    if (!location.pathname.endsWith("/edit")) {
      navigate("edit", { state: { row } });
    }
  };

  const handleView = (row) => {
    alert(`Viewing user: ${row.name ?? row.user_id}`);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure to delete ${row.name ?? row.user_id}?`)) {
      dispatch(userDeleteRequest({ id: row.user_id, data: row }));
    }
  };

  /* ================= TABLE ================= */
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
              onEdit={() => openEdit(row)}
              onDelete={() => handleDelete(row)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  }, [users, currentPage]);

  /* ================= STYLES (SPACING ONLY) ================= */
  const pageBackground = {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: screen === "mobile" ? "12px" : "20px",
  };

  const containerStyles = {
    background: "rgba(47, 53, 69, 0.79)",
    borderRadius: "12px",
    padding: screen === "mobile" ? "14px" : "20px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    marginTop:"50px"
  };

  const headerStyles = {
    display: "flex",
    justifyContent: screen === "mobile" ? "center" : "space-between",
    alignItems: "center",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: "2px solid #eee",
    flexDirection: screen === "mobile" ? "column" : "row",
    gap: screen === "mobile" ? "10px" : "0",
  };

  const searchWrapper = {
    position: "relative",
    width: screen === "mobile" ? "100%" : "220px",
  };

  const searchIcon = {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    color: "#888",
    fontSize: "1rem",
  };

  const searchInput = {
    width: "100%",
    padding: "8px 12px 8px 34px",
    borderRadius: "8px",
    border: "2px solid #ced4da",
    fontSize: "0.9rem",
  };

  return (
      <div style={containerStyles}
      
      >
        {/* Header */}
        <div style={headerStyles}>
          <h4
            style={{
              fontWeight: 600,
              fontSize: screen === "mobile" ? "1.1rem" : "1.25rem",
              margin: 0,
              color:"white"
            }}
          >
            User List
          </h4>

          {/* Search */}
          <div
  className="d-flex align-items-center px-3 py-2 rounded"
  style={{
    background: "linear-gradient(90deg, #D56CFF, #4F8EFF)",
  }}
>
  <i className="bi bi-search text-white me-2" />

  <input
    type="text"
    value={q}
    onChange={(e) => setQ(e.target.value)}
    placeholder="Search..."
    className="form-control bg-transparent border-0 text-white"
  />
</div>

        </div>

        {/* Table */}
        {loading && <p style={{ margin: "12px 0" }}>Loading…</p>}
        {error && <p style={{ color: "red", margin: "12px 0" }}>{error}</p>}

        {!loading && !error && (
          <>
            <div 
            style={{ marginBottom: "10px" }}
            >
              <AppTable
                columns={columns}
                data={pagedUsers}
                tableProps={{
                  size: screen === "mobile" ? "sm" : "md",
                  responsive: true,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                margin: "10px 0 6px",
                padding: "0 6px",
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

            <div style={{ marginTop: "6px" }}>
              <AppPagination
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    
  );
};

export default UserListPage;
