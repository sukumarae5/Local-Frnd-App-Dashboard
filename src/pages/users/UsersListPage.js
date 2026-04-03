import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  userDeleteRequest,
  userFetchRequest,
} from "../../features/user/userAction";
import { callsHistoryFetchRequest } from"../../features/CallsShistory/CallsHistoryAction";
import AppTable from "../../components/tables/AppTable";
import AppPagination from "../../components/pagination/AppPagination";
import "bootstrap-icons/font/bootstrap-icons.css";

const UserListPage = () => {
  const [q, setQ] = useState("");
  const [screen, setScreen] = useState("desktop");
  const [genderFilter, setGenderFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("edit");
  const [formInitialValues, setFormInitialValues] = useState({});

  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const [callHistoryOpen, setCallHistoryOpen] = useState(false);
  const [callHistoryUser, setCallHistoryUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterRef = useRef(null);

  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((s) => s.user || {});
  const {
    loading: historyLoading,
    callsHistory = [],
    error: historyError,
  } = useSelector((s) => s.callsHistory || {});

  const navigate = useNavigate();
  const location = useLocation();

  const users = useMemo(() => {
    if (Array.isArray(user)) return user;
    if (user && typeof user === "object") return [user];
    return [];
  }, [user]);

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

  /* ================= FETCH USER LIST ================= */
  useEffect(() => {
    dispatch(userFetchRequest());
  }, [dispatch]);

  /* ================= DEBUG CONSOLE ================= */
  useEffect(() => {
    console.log("Loading:", loading);
    console.log("Redux user state:", user);
    console.log("Users array:", users);
    console.log("Error:", error);
    console.log("Call History:", callsHistory);
    console.log("Call History Error:", historyError);
  }, [loading, user, users, error, callsHistory, historyError]);

  /* ================= CLOSE FILTER ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= FRONTEND SEARCH + GENDER FILTER ================= */
  const filteredUsers = useMemo(() => {
    const search = q.trim().toLowerCase();

    let data = users;

    if (genderFilter !== "all") {
      data = data.filter(
        (item) => String(item.gender ?? "").toLowerCase() === genderFilter
      );
    }

    if (!search) return data;

    return data.filter((item) => {
      const userId = String(item.user_id ?? "").toLowerCase();
      const name = String(item.name ?? "").toLowerCase();
      const username = String(item.username ?? "").toLowerCase();
      const phone = String(item.mobile_number ?? "").toLowerCase();
      const email = String(item.email ?? "").toLowerCase();

      return (
        userId.includes(search) ||
        name.includes(search) ||
        username.includes(search) ||
        phone.includes(search) ||
        email.includes(search)
      );
    });
  }, [users, q, genderFilter]);

  /* ================= RESET PAGE ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [q, genderFilter, users.length]);

  /* ================= SCROLL LOCK ================= */
  useEffect(() => {
    if (!formOpen && !viewOpen && !callHistoryOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [formOpen, viewOpen, callHistoryOpen]);

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
    updatedAt: r.updated_at ?? r.updates_at ?? "",
  });

  const openEdit = (row) => {
    setFormMode("edit");
    setFormInitialValues(toInitialValues(row));
    setFormOpen(true);

    if (!location.pathname.endsWith("/edit")) {
      navigate("edit", { state: { row } });
    }
  };

  /* ================= VIEW ================= */
  const handleView = (row) => {
    setSelectedUser(row);
    setViewOpen(true);
  };

  const closeView = () => {
    setSelectedUser(null);
    setViewOpen(false);
  };

  /* ================= CALL HISTORY ================= */
  const handleCallHistory = (row) => {
    setCallHistoryUser(row);
    setCallHistoryOpen(true);
    dispatch(callsHistoryFetchRequest(row.user_id));
  };

  const closeCallHistory = () => {
    setCallHistoryUser(null);
    setCallHistoryOpen(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = (row) => {
    if (window.confirm(`Are you sure to delete ${row.name ?? row.user_id}?`)) {
      dispatch(userDeleteRequest({ id: row.user_id, data: row }));
    }
  };

  const handleGenderSelect = (value) => {
    setGenderFilter(value);
    setFilterOpen(false);
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
  };

  const actionBtnStyle = {
    width: "34px",
    height: "34px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    flex: "0 0 auto",
  };

  /* ================= TABLE ================= */
  const columns = useMemo(
    () => [
      { key: "user_id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "username", label: "Username", render: (r) => r.username ?? "-" },
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
              overflowX: "auto",
            }}
          >
            <button
              type="button"
              title="View"
              onClick={() => handleView(row)}
              className="btn btn-sm btn-info text-white"
              style={actionBtnStyle}
            >
              <i className="bi bi-eye-fill"></i>
            </button>

            <button
              type="button"
              title="Edit"
              onClick={() => openEdit(row)}
              className="btn btn-sm btn-warning text-dark"
              style={actionBtnStyle}
            >
              <i className="bi bi-pencil-square"></i>
            </button>

            <button
              type="button"
              title="Call History"
              onClick={() => handleCallHistory(row)}
              className="btn btn-sm btn-primary"
              style={actionBtnStyle}
            >
              <i className="bi bi-clock-history"></i>
            </button>

            <button
              type="button"
              title="Delete"
              onClick={() => handleDelete(row)}
              className="btn btn-sm btn-danger"
              style={actionBtnStyle}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const callHistoryColumns = useMemo(
    () => [
      {
        key: "id",
        label: "ID",
        render: (r) => r.id ?? r.call_id ?? "-",
      },
      {
        key: "caller_id",
        label: "Caller ID",
        render: (r) => r.caller_id ?? r.callerId ?? r.from_user ?? "-",
      },
      {
        key: "receiver_id",
        label: "Receiver ID",
        render: (r) => r.receiver_id ?? r.receiverId ?? r.to_user ?? "-",
      },
      {
        key: "call_type",
        label: "Call Type",
        render: (r) => r.call_type ?? r.type ?? "-",
      },
      {
        key: "status",
        label: "Status",
        render: (r) => r.status ?? "-",
      },
      {
        key: "duration",
        label: "Duration",
        render: (r) => r.duration ?? r.call_duration ?? "-",
      },
      {
        key: "started_at",
        label: "Started At",
        render: (r) =>
          formatDateTime(r.started_at ?? r.start_time ?? r.created_at),
      },
      {
        key: "ended_at",
        label: "Ended At",
        render: (r) => formatDateTime(r.ended_at ?? r.end_time ?? r.updated_at),
      },
    ],
    []
  );

  /* ================= STYLES ================= */
  const containerStyles = {
    background: "rgba(47, 53, 69, 0.79)",
    borderRadius: "12px",
    padding: screen === "mobile" ? "14px" : "20px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    marginTop: "50px",
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

  const detailRow = {
    display: "grid",
    gridTemplateColumns: screen === "mobile" ? "1fr" : "180px 1fr",
    gap: "8px",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  };

  const detailLabel = {
    fontWeight: 600,
    color: "#cbd5e1",
  };

  const inputStyle = {
    color: "white",
  };

  const filterMenuStyle = {
    position: "absolute",
    top: "110%",
    right: 0,
    minWidth: "160px",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    padding: "8px",
    zIndex: 999,
  };

  const filterItemStyle = (active) => ({
    width: "100%",
    border: "none",
    background: active ? "#0d6efd" : "transparent",
    color: active ? "#fff" : "#212529",
    textAlign: "left",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "4px",
  });

  return (
    <>
      <div style={containerStyles}>
        <div style={headerStyles}>
          <h4
            style={{
              fontWeight: 600,
              fontSize: screen === "mobile" ? "1.1rem" : "1.25rem",
              margin: 0,
              color: "white",
            }}
          >
            User List
          </h4>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
              width: screen === "mobile" ? "100%" : "auto",
              justifyContent: screen === "mobile" ? "center" : "flex-end",
            }}
          >
            <div style={{ position: "relative" }} ref={filterRef}>
              <button
                type="button"
                className="btn btn-light d-flex align-items-center justify-content-center"
                onClick={() => setFilterOpen((prev) => !prev)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                }}
                title="Filter by gender"
              >
                <i className="bi bi-funnel-fill"></i>
              </button>

              {filterOpen && (
                <div style={filterMenuStyle}>
                  <button
                    type="button"
                    style={filterItemStyle(genderFilter === "all")}
                    onClick={() => handleGenderSelect("all")}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    style={filterItemStyle(genderFilter === "male")}
                    onClick={() => handleGenderSelect("male")}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    style={filterItemStyle(genderFilter === "female")}
                    onClick={() => handleGenderSelect("female")}
                  >
                    Female
                  </button>
                </div>
              )}
            </div>

            <div
              className="d-flex align-items-center px-3 py-2 rounded"
              style={{
                background: "linear-gradient(90deg, #D56CFF, #4F8EFF)",
                minWidth: screen === "mobile" ? "100%" : "300px",
              }}
            >
              <i className="bi bi-search text-white me-2" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, ID, phone, email..."
                className="form-control bg-transparent border-0 text-white"
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            color: "#fff",
            fontSize: "14px",
            marginBottom: "10px",
            opacity: 0.9,
          }}
        >
          Active Gender Filter:{" "}
          <strong style={{ textTransform: "capitalize" }}>{genderFilter}</strong>
        </div>

        {loading && (
          <p style={{ margin: "12px 0", color: "white" }}>Loading...</p>
        )}
        {error && <p style={{ color: "red", margin: "12px 0" }}>{error}</p>}

        {!loading && !error && (
          <>
            <div style={{ marginBottom: "10px" }}>
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
                color: "white",
              }}
            >
              <span style={{ opacity: 0.8 }}>
                Showing{" "}
                {filteredUsers.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}{" "}
                - {Math.min(currentPage * itemsPerPage, filteredUsers.length)}{" "}
                of {filteredUsers.length}
              </span>
            </div>

            <div style={{ marginTop: "6px" }}>
              <AppPagination
                totalItems={filteredUsers.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>

      {viewOpen && selectedUser && (
        <div
          onClick={closeView}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "800px",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#1f2937",
              color: "white",
              borderRadius: "16px",
              padding: screen === "mobile" ? "16px" : "24px",
              boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "12px",
              }}
            >
              <h4 style={{ margin: 0 }}>User Details</h4>

              <button
                onClick={closeView}
                style={{
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Close
              </button>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>User ID</div>
              <div>{selectedUser.user_id ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Username</div>
              <div>{selectedUser.username ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Name</div>
              <div>{selectedUser.name ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Email</div>
              <div>{selectedUser.email ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Mobile Number</div>
              <div>{selectedUser.mobile_number ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Age</div>
              <div>{selectedUser.age ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Gender</div>
              <div>{selectedUser.gender ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Profile Status</div>
              <div>{selectedUser.profile_status ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Status</div>
              <div>{selectedUser.status ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Coin Balance</div>
              <div>{selectedUser.coin_balance ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Rings Balance</div>
              <div>{selectedUser.rings_balance ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Average Rating</div>
              <div>{selectedUser.avg_rating ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Total Ratings</div>
              <div>{selectedUser.total_ratings ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Is Online</div>
              <div>{selectedUser.is_online ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Last Seen</div>
              <div>{selectedUser.last_seen ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Date of Birth</div>
              <div>{selectedUser.date_of_birth ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Bio</div>
              <div>{selectedUser.bio ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Country ID</div>
              <div>{selectedUser.country_id ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>State ID</div>
              <div>{selectedUser.state_id ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>City ID</div>
              <div>{selectedUser.city_id ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Language ID</div>
              <div>{selectedUser.language_id ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Latitude</div>
              <div>{selectedUser.location_lat ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Longitude</div>
              <div>{selectedUser.location_log ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Avatar ID</div>
              <div>{selectedUser.avatar_id ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>OTP</div>
              <div>{selectedUser.otp ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>OTP Expires At</div>
              <div>{selectedUser.otp_expires_at ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Last Daily Reward At</div>
              <div>{selectedUser.last_daily_reward_at ?? "-"}</div>
            </div>

            <div style={detailRow}>
              <div style={detailLabel}>Created At</div>
              <div>{selectedUser.created_at ?? "-"}</div>
            </div>

            <div style={{ ...detailRow, borderBottom: "none" }}>
              <div style={detailLabel}>Updated At</div>
              <div>
                {selectedUser.updated_at ?? selectedUser.updates_at ?? "-"}
              </div>
            </div>
          </div>
        </div>
      )}

      {callHistoryOpen && (
        <div
          onClick={closeCallHistory}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.60)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "1100px",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#111827",
              color: "white",
              borderRadius: "16px",
              padding: screen === "mobile" ? "16px" : "24px",
              boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: screen === "mobile" ? "flex-start" : "center",
                flexDirection: screen === "mobile" ? "column" : "row",
                gap: "12px",
                marginBottom: "18px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "12px",
              }}
            >
              <div>
                <h4 style={{ margin: 0 }}>Call History</h4>
                <div style={{ color: "#cbd5e1", marginTop: "6px" }}>
                  User ID: <strong>{callHistoryUser?.user_id ?? "-"}</strong>
                  {" | "}
                  Name: <strong>{callHistoryUser?.name ?? "-"}</strong>
                </div>
              </div>

              <button
                onClick={closeCallHistory}
                style={{
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Close
              </button>
            </div>

            {historyLoading && (
              <p style={{ margin: "12px 0", color: "white" }}>
                Loading call history...
              </p>
            )}

            {historyError && (
              <p style={{ color: "red", margin: "12px 0" }}>{historyError}</p>
            )}

            {!historyLoading && !historyError && callsHistory.length === 0 && (
              <p style={{ color: "#e5e7eb" }}>No call history found.</p>
            )}

            {!historyLoading && !historyError && callsHistory.length > 0 && (
              <AppTable
                columns={callHistoryColumns}
                data={callsHistory}
                tableProps={{
                  size: screen === "mobile" ? "sm" : "md",
                  responsive: true,
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserListPage;