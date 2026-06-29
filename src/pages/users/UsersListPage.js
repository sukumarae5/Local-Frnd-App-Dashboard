// src/pages/users/UsersListPage.jsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  userDeleteRequest,
  userFetchRequest,
} from "../../features/user/userAction";

import { fetchLanguagesRequest } from "../../features/Languages/LanguagesAction";

import { callsHistoryFetchRequest } from "../../features/CallsShistory/CallsHistoryAction";

import AppTable from "../../components/tables/AppTable";
import AppPagination from "../../components/pagination/AppPagination";

import "bootstrap-icons/font/bootstrap-icons.css";

const ITEMS_PER_PAGE = 10;

const formatDateTime = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString();
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString();
};

const getErrorMessage = (error, fallback) => {
  if (!error) return "";

  if (typeof error === "string") {
    return error;
  }

  return error?.message || fallback;
};

const getUsersArray = (user) => {
  if (Array.isArray(user)) return user;
  if (Array.isArray(user?.data)) return user.data;
  if (Array.isArray(user?.users)) return user.users;

  return [];
};

const getLanguagesArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;

  return [];
};

const getLanguageText = (row) => {
  if (!row?.language_name) {
    return "-";
  }

  return row.language_native_name
    ? `${row.language_name} (${row.language_native_name})`
    : row.language_name;
};

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterRef = useRef(null);

  const [searchText, setSearchText] = useState("");
  const [screen, setScreen] = useState("desktop");
  const [genderFilter, setGenderFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);

  const [callHistoryUser, setCallHistoryUser] =
    useState(null);

  const {
    loading: userLoading,
    user,
    error: userError,
  } = useSelector((state) => state.user || {});

  const {
    data: languageData,
    error: languageError,
  } = useSelector(
    (state) => state.language || {}
  );

  const {
    loading: historyLoading,
    callsHistory = [],
    error: historyError,
  } = useSelector(
    (state) => state.callsHistory || {}
  );

  const users = useMemo(
    () => getUsersArray(user),
    [user]
  );

  const languages = useMemo(
    () => getLanguagesArray(languageData),
    [languageData]
  );

  const usersWithLanguage = useMemo(() => {
    return users.map((userItem) => {
      const matchedLanguage = languages.find(
        (language) =>
          String(language.id) ===
          String(userItem.language_id)
      );

      return {
        ...userItem,
        language_name:
          matchedLanguage?.name_en || "",
        language_native_name:
          matchedLanguage?.native_name || "",
        language_code:
          matchedLanguage?.code || "",
        language: matchedLanguage || null,
      };
    });
  }, [users, languages]);

  useEffect(() => {
    dispatch(userFetchRequest());
    dispatch(fetchLanguagesRequest());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 576) {
        setScreen("mobile");
      } else if (width <= 992) {
        setScreen("tablet");
      } else {
        setScreen("desktop");
      }
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setFilterOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    if (!selectedUser && !callHistoryUser) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedUser, callHistoryUser]);

  const filteredUsers = useMemo(() => {
    const search = searchText
      .trim()
      .toLowerCase();

    let result = usersWithLanguage;

    if (genderFilter !== "all") {
      result = result.filter(
        (item) =>
          String(
            item.gender || ""
          ).toLowerCase() === genderFilter
      );
    }

    if (!search) {
      return result;
    }

    return result.filter((item) => {
      const values = [
        item.user_id,
        item.name,
        item.username,
        item.mobile_number,
        item.email,
        item.language_name,
        item.language_native_name,
      ];

      return values.some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(search)
      );
    });
  }, [
    usersWithLanguage,
    searchText,
    genderFilter,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, genderFilter]);

  const pagedUsers = useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredUsers.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredUsers, currentPage]);

  const openEdit = useCallback(
    (row) => {
      navigate("edit", {
        state: {
          row,
        },
      });
    },
    [navigate]
  );

  const handleView = useCallback((row) => {
    setSelectedUser(row);
  }, []);

  const handleCallHistory = useCallback(
    (row) => {
      setCallHistoryUser(row);

      dispatch(
        callsHistoryFetchRequest(row.user_id)
      );
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (row) => {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${
          row.name || row.user_id
        }"?`
      );

      if (!confirmed) return;

      dispatch(
        userDeleteRequest({
          id: row.user_id,
          data: row,
        })
      );
    },
    [dispatch]
  );

  const actionButtonStyle = useMemo(
    () => ({
      width: "34px",
      height: "34px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        key: "user_id",
        label: "ID",
      },
      {
        key: "name",
        label: "Name",
        render: (row) => row.name || "-",
      },
      {
        key: "username",
        label: "Username",
        render: (row) => row.username || "-",
      },
      {
        key: "age",
        label: "Age",
        render: (row) => row.age ?? "-",
      },
      {
        key: "gender",
        label: "Gender",
        render: (row) => row.gender || "-",
      },
      {
        key: "language",
        label: "Language",
        render: getLanguageText,
      },
      {
        key: "email",
        label: "Email",
        render: (row) => row.email || "-",
      },
      {
        key: "mobile_number",
        label: "Phone",
        render: (row) =>
          row.mobile_number || "-",
      },
      {
        key: "status",
        label: "Status",
        render: (row) => row.status ?? "-",
      },
      {
        key: "profile_status",
        label: "Profile",
        render: (row) =>
          row.profile_status || "-",
      },
      {
        key: "location",
        label: "Location",
        render: (row) =>
          `${row.location_lat ?? "-"}, ${
            row.location_log ?? "-"
          }`,
      },
      {
        key: "coin_balance",
        label: "Coins",
        render: (row) =>
          row.coin_balance ?? "-",
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div style={styles.actions}>
            <ActionButton
              title="View"
              className="btn-info text-white"
              icon="bi-eye-fill"
              onClick={() => handleView(row)}
              style={actionButtonStyle}
            />

            <ActionButton
              title="Edit"
              className="btn-warning text-dark"
              icon="bi-pencil-square"
              onClick={() => openEdit(row)}
              style={actionButtonStyle}
            />

            <ActionButton
              title="Call History"
              className="btn-primary"
              icon="bi-clock-history"
              onClick={() =>
                handleCallHistory(row)
              }
              style={actionButtonStyle}
            />

            <ActionButton
              title="Delete"
              className="btn-danger"
              icon="bi-trash-fill"
              onClick={() => handleDelete(row)}
              style={actionButtonStyle}
            />
          </div>
        ),
      },
    ],
    [
      actionButtonStyle,
      handleCallHistory,
      handleDelete,
      handleView,
      openEdit,
    ]
  );

  const callHistoryColumns = useMemo(
    () => [
      {
        key: "id",
        label: "ID",
        render: (row) =>
          row.id ?? row.call_id ?? "-",
      },
      {
        key: "caller_id",
        label: "Caller ID",
        render: (row) =>
          row.caller_id ??
          row.from_user ??
          "-",
      },
      {
        key: "receiver_id",
        label: "Receiver ID",
        render: (row) =>
          row.receiver_id ??
          row.to_user ??
          "-",
      },
      {
        key: "call_type",
        label: "Call Type",
        render: (row) =>
          row.call_type ?? row.type ?? "-",
      },
      {
        key: "status",
        label: "Status",
        render: (row) => row.status ?? "-",
      },
      {
        key: "duration",
        label: "Duration",
        render: (row) =>
          row.duration ??
          row.call_duration ??
          "-",
      },
      {
        key: "started_at",
        label: "Started At",
        render: (row) =>
          formatDateTime(
            row.started_at ??
              row.start_time ??
              row.created_at
          ),
      },
      {
        key: "ended_at",
        label: "Ended At",
        render: (row) =>
          formatDateTime(
            row.ended_at ??
              row.end_time ??
              row.updated_at
          ),
      },
    ],
    []
  );

  const detailRowStyle = {
    ...styles.detailRow,
    gridTemplateColumns:
      screen === "mobile"
        ? "1fr"
        : "180px 1fr",
  };

  return (
    <>
      <div
        style={{
          ...styles.container,
          padding:
            screen === "mobile"
              ? "14px"
              : "20px",
        }}
      >
        <div
          style={{
            ...styles.header,
            flexDirection:
              screen === "mobile"
                ? "column"
                : "row",
          }}
        >
          <h4 style={styles.title}>
            User List
          </h4>

          <div style={styles.toolbar}>
            <div
              ref={filterRef}
              style={{ position: "relative" }}
            >
              <button
                type="button"
                className="btn btn-light"
                style={styles.filterButton}
                onClick={() =>
                  setFilterOpen(
                    (previous) => !previous
                  )
                }
              >
                <i className="bi bi-funnel-fill" />
              </button>

              {filterOpen && (
                <div style={styles.filterMenu}>
                  {["all", "male", "female"].map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        style={{
                          ...styles.filterItem,
                          background:
                            genderFilter === value
                              ? "#0d6efd"
                              : "transparent",
                          color:
                            genderFilter === value
                              ? "#ffffff"
                              : "#212529",
                        }}
                        onClick={() => {
                          setGenderFilter(value);
                          setFilterOpen(false);
                        }}
                      >
                        {value
                          .charAt(0)
                          .toUpperCase() +
                          value.slice(1)}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <div style={styles.searchBox}>
              <i className="bi bi-search text-white me-2" />

              <input
                type="text"
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target.value
                  )
                }
                placeholder="Search users..."
                className="form-control bg-transparent border-0 text-white"
              />
            </div>
          </div>
        </div>

        {languageError && (
          <p style={styles.errorText}>
            {getErrorMessage(
              languageError,
              "Unable to load languages."
            )}
          </p>
        )}

        {userLoading && (
          <p style={styles.infoText}>
            Loading users...
          </p>
        )}

        {userError && (
          <p style={styles.errorText}>
            {getErrorMessage(
              userError,
              "Unable to load users."
            )}
          </p>
        )}

        {!userLoading && !userError && (
          <>
            <AppTable
              columns={columns}
              data={pagedUsers}
              tableProps={{
                responsive: true,
              }}
            />

            <div style={styles.resultText}>
              Showing{" "}
              {filteredUsers.length
                ? (currentPage - 1) *
                    ITEMS_PER_PAGE +
                  1
                : 0}{" "}
              -{" "}
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredUsers.length
              )}{" "}
              of {filteredUsers.length}
            </div>

            <AppPagination
              totalItems={filteredUsers.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {selectedUser && (
        <Modal
          title="User Details"
          onClose={() => setSelectedUser(null)}
          maxWidth="800px"
        >
          <DetailRow
            label="User ID"
            value={selectedUser.user_id}
            style={detailRowStyle}
          />

          <DetailRow
            label="Name"
            value={selectedUser.name}
            style={detailRowStyle}
          />

          <DetailRow
            label="Username"
            value={selectedUser.username}
            style={detailRowStyle}
          />

          <DetailRow
            label="Email"
            value={selectedUser.email}
            style={detailRowStyle}
          />

          <DetailRow
            label="Mobile Number"
            value={selectedUser.mobile_number}
            style={detailRowStyle}
          />

          <DetailRow
            label="Age"
            value={selectedUser.age}
            style={detailRowStyle}
          />

          <DetailRow
            label="Gender"
            value={selectedUser.gender}
            style={detailRowStyle}
          />

          <DetailRow
            label="Language"
            value={getLanguageText(
              selectedUser
            )}
            style={detailRowStyle}
          />

          <DetailRow
            label="Date of Birth"
            value={formatDate(
              selectedUser.date_of_birth
            )}
            style={detailRowStyle}
          />

          <DetailRow
            label="Profile Status"
            value={
              selectedUser.profile_status
            }
            style={detailRowStyle}
          />

          <DetailRow
            label="Status"
            value={selectedUser.status}
            style={detailRowStyle}
          />

          <DetailRow
            label="Coin Balance"
            value={
              selectedUser.coin_balance
            }
            style={detailRowStyle}
          />

          <DetailRow
            label="Latitude"
            value={
              selectedUser.location_lat
            }
            style={detailRowStyle}
          />

          <DetailRow
            label="Longitude"
            value={
              selectedUser.location_log
            }
            style={detailRowStyle}
          />

          <DetailRow
            label="Bio"
            value={selectedUser.bio}
            style={detailRowStyle}
          />

          <DetailRow
            label="Created At"
            value={formatDateTime(
              selectedUser.created_at
            )}
            style={detailRowStyle}
          />

          <DetailRow
            label="Updated At"
            value={formatDateTime(
              selectedUser.updated_at
            )}
            style={detailRowStyle}
          />
        </Modal>
      )}

      {callHistoryUser && (
        <Modal
          title={`Call History - ${
            callHistoryUser.name ||
            callHistoryUser.user_id
          }`}
          onClose={() =>
            setCallHistoryUser(null)
          }
          maxWidth="1100px"
        >
          {historyLoading && (
            <p>Loading call history...</p>
          )}

          {historyError && (
            <p style={styles.errorText}>
              {getErrorMessage(
                historyError,
                "Unable to load call history."
              )}
            </p>
          )}

          {!historyLoading &&
            !historyError &&
            callsHistory.length === 0 && (
              <p>No call history found.</p>
            )}

          {!historyLoading &&
            !historyError &&
            callsHistory.length > 0 && (
              <AppTable
                columns={callHistoryColumns}
                data={callsHistory}
                tableProps={{
                  responsive: true,
                }}
              />
            )}
        </Modal>
      )}
    </>
  );
};

const ActionButton = ({
  title,
  className,
  icon,
  onClick,
  style,
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`btn btn-sm ${className}`}
    style={style}
  >
    <i className={`bi ${icon}`} />
  </button>
);

const DetailRow = ({
  label,
  value,
  style,
}) => (
  <div style={style}>
    <div style={styles.detailLabel}>
      {label}
    </div>

    <div>
      {value === null ||
      value === undefined ||
      value === ""
        ? "-"
        : String(value)}
    </div>
  </div>
);

const Modal = ({
  title,
  children,
  onClose,
  maxWidth,
}) => (
  <div
    style={styles.overlay}
    onClick={onClose}
  >
    <div
      style={{
        ...styles.modal,
        maxWidth,
      }}
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      <div style={styles.modalHeader}>
        <h4 style={{ margin: 0 }}>
          {title}
        </h4>

        <button
          type="button"
          onClick={onClose}
          style={styles.closeButton}
        >
          Close
        </button>
      </div>

      {children}
    </div>
  </div>
);

const styles = {
  container: {
    marginTop: "50px",
    background: "rgba(47, 53, 69, 0.79)",
    borderRadius: "12px",
    boxShadow:
      "0 0 15px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: "2px solid #eeeeee",
  },

  title: {
    margin: 0,
    color: "#ffffff",
    fontWeight: 600,
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  filterButton: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
  },

  filterMenu: {
    position: "absolute",
    top: "110%",
    right: 0,
    minWidth: "160px",
    padding: "8px",
    zIndex: 999,
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.15)",
  },

  filterItem: {
    width: "100%",
    border: "none",
    textAlign: "left",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    minWidth: "300px",
    padding: "8px 12px",
    borderRadius: "8px",
    background:
      "linear-gradient(90deg, #D56CFF, #4F8EFF)",
  },

  actions: {
    display: "flex",
    gap: "6px",
    justifyContent: "center",
  },

  infoText: {
    color: "#ffffff",
  },

  errorText: {
    color: "#fca5a5",
  },

  resultText: {
    color: "#ffffff",
    fontSize: "12px",
    margin: "10px 6px",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "rgba(0,0,0,0.6)",
  },

  modal: {
    width: "100%",
    maxHeight: "85vh",
    overflowY: "auto",
    padding: "24px",
    color: "#ffffff",
    background: "#1f2937",
    borderRadius: "16px",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
    paddingBottom: "12px",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
  },

  closeButton: {
    border: "none",
    padding: "8px 14px",
    color: "#ffffff",
    background: "#ef4444",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },

  detailRow: {
    display: "grid",
    gap: "8px",
    padding: "10px 0",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
  },

  detailLabel: {
    color: "#cbd5e1",
    fontWeight: 600,
  },
};

export default UserListPage;