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

  // Screen size detection
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

  useEffect(() => {
    dispatch(userFetchRequest());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [users.length]);

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

  // convert row to form initial values
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
      dispatch(
        userDeleteRequest({
          id: row.user_id,
          data: row,
        })
      );
    }
  };

  // Table columns
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

  //  FIX: Missing styles
  const pageBackground = {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: "20px",
  };

  const containerStyles = {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  };

  return (
    <div style={pageBackground}>
      <div style={containerStyles}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: screen === "mobile" ? "center" : "space-between",
            alignItems: "center",
            marginBottom: "10px",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
            flexDirection: screen === "mobile" ? "column" : "row",
          }}
        >
          <h4
            style={{
              fontWeight: 600,
              fontSize: screen === "mobile" ? "1.1rem" : "1.25rem",
              marginBottom: screen === "mobile" ? "10px" : "0",
              textAlign: screen === "mobile" ? "center" : "left",
            }}
          >
            User List
          </h4>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: screen === "mobile" ? "center" : "flex-end",
              gap: "12px",
              width: screen === "mobile" ? "100%" : "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                width: screen === "mobile" ? "100%" : "220px",
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
                size: screen === "mobile" ? "sm" : "md",
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
