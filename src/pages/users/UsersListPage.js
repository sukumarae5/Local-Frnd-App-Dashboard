import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetchRequest } from "../../features/user/userAction";
import AppTable from "../../components/tables/AppTable";
import { AppAddButton, AppButtonRow } from "../../components/button/AppButton";
import AppPagination from "../../components/pagination/AppPagination";
import "bootstrap-icons/font/bootstrap-icons.css";

const UserListPage = () => {
  const [q, setQ] = useState("");
  const [screenSize, setScreenSize] = useState("desktop");

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((s) => s.user || {});
  const users = Array.isArray(user) ? user : [];

  // ✅ Detect screen size
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

  // ✅ Fetch users
  useEffect(() => {
    dispatch(userFetchRequest());
  }, [dispatch]);

  // ✅ Reset pagination when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [users.length]);

  // ✅ Disable body scroll to prevent double scrollbars
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // ✅ Search handler (auto search when typing)
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(userFetchRequest(q));
    }, 400);
    return () => clearTimeout(delay);
  }, [q, dispatch]);

  // ✅ Table actions
  const handleView = (row) => alert(`Viewing user: ${row.firstName} ${row.lastName}`);
  const handleEdit = (row) => alert(`Editing user: ${row.firstName} ${row.lastName}`);
  const handleDelete = (row) => {
    if (window.confirm(`Are you sure to delete ${row.firstName}?`)) {
      alert(`Deleted user: ${row.firstName}`);
    }
  };
  const handleAddUser = () => alert("Add new user form or modal can open here.");

  // ✅ Table columns
  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "Name", render: (r) => `${r.firstName} ${r.lastName}` },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "company", label: "Company", render: (r) => r.company?.name || "-" },
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

  // ✅ Layout container (responsive)
  const containerStyles = {
    position: "fixed",
    top: screenSize === "mobile" ? "200px" : screenSize === "tablet" ? "200px" : "230px",
    left: screenSize === "mobile" ? "100px" : screenSize === "tablet" ? "100px" : "280px",
    right: screenSize === "mobile" ? "20px" : screenSize === "tablet" ? "40px" : "60px",
    bottom: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: screenSize === "mobile" ? "8px" : "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding:
      screenSize === "mobile"
        ? "16px"
        : screenSize === "tablet"
        ? "20px 26px"
        : "26px 36px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
  };

  // ✅ Page background
  const pageBackground = {
    position: "absolute",
    top: screenSize === "desktop" ? "80px" : "40px",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f8f9fc",
  };

  // ✅ Pagination slice
  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  }, [users, currentPage]);

  return (
    <div style={pageBackground} >
      <div style={containerStyles}>
        {/* ✅ Header */}
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

          {/* ✅ Search & Add User Row */}
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
            {/* Search Box */}
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
              ></i>
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

            {/* Add User Button */}
            <AppAddButton onAdd={handleAddUser} />
          </div>
        </div>

        {/* ✅ Table Section */}
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

            {/* ✅ Page Info */}
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
                {users.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, users.length)} of {users.length}
              </span>
            </div>

            {/* ✅ Pagination */}
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
