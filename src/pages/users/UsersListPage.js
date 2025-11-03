import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetchRequest } from "../../features/user/userAction";
import AppTable from "../../components/tables/AppTable";
import AppButton from "../../components/button/AppButton";

const UserListPage = () => {
  const [q, setQ] = useState("");
  const [screenSize, setScreenSize] = useState("desktop");
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((s) => s.user || {});
  const users = Array.isArray(user) ? user : [];

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) setScreenSize("mobile");
      else if (window.innerWidth <= 992) setScreenSize("tablet");
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

  // ✅ Disable body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // ✅ Search handler
  const onSearch = (e) => {
    e.preventDefault();
    dispatch(userFetchRequest(q));
  };

  // ✅ Table actions
  const handleView = (row) => alert(`Viewing user: ${row.firstName}`);
  const handleEdit = (row) => alert(`Editing user: ${row.firstName}`);
  const handleDelete = (row) =>
    window.confirm(`Delete ${row.firstName}?`) && alert(`Deleted ${row.firstName}`);

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
        render: (r) => (
          <AppButton
            onView={() => handleView(r)}
            onEdit={() => handleEdit(r)}
            onDelete={() => handleDelete(r)}
          />
        ),
      },
    ],
    []
  );

  // ✅ Responsive container styling
  const containerStyles = {
    position: "fixed",
    top:
      screenSize === "mobile"
        ? "210px" // 📱 more top gap for mobile
        : screenSize === "tablet"
        ? "200px"
        : "210px", // 💻 even more top gap for desktop
    bottom: "20px",
    left:
      screenSize === "mobile"
        ? "100px"
        : screenSize === "tablet"
        ? "100px"
        : "280px",
    right:
      screenSize === "mobile"
        ? "20px"
        : screenSize === "tablet"
        ? "20px"
        : "60px",
    backgroundColor: "#f7f7f7ff",
    borderRadius: screenSize === "mobile" ? "8px" : "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding:
      screenSize === "mobile"
        ? "14px"
        : screenSize === "tablet"
        ? "20px 26px"
        : "26px 36px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
  };

  // ✅ Page background with top padding for all devices
  const pageBackground = {
    position: "absolute",
    top:
      screenSize === "mobile"
        ? "20px"
        : screenSize === "tablet"
        ? "30px"
        : "60px", // 🖥️ Add more space only on desktop
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f8f9fcff",
    overflow: "hidden",
  };

  return (
    <div style={pageBackground}>
      <div style={containerStyles}>
        <h4
          style={{
            fontWeight: 600,
            fontSize: screenSize === "mobile" ? "1.1rem" : "1.25rem",
            marginBottom: "15px",
            textAlign: screenSize === "mobile" ? "center" : "left",
            position: "sticky",
            top: "0",
            background: "#f9f7f7ff",
            zIndex: 2,
            paddingBottom: "10px",
            borderBottom: "2px solid #eee",
          }}
        >
          User List
        </h4>

        <form
          onSubmit={onSearch}
          style={{
            display: "flex",
            flexDirection: screenSize === "mobile" ? "column" : "row",
            alignItems: "center",
            justifyContent: screenSize === "mobile" ? "center" : "flex-start",
            gap: "10px",
            marginBottom: "16px",
            position: "sticky",
            top: "40px",
            background: "#f9f9f9ff",
            zIndex: 2,
            paddingBottom: "10px",
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name/email..."
            style={{
              flex: 1,
              width: screenSize === "mobile" ? "100%" : "auto",
              minWidth: "200px",
              padding: "8px 10px",
              borderRadius: 8,
              border: "2px solid #ced4da",
              fontSize: "0.95rem",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: "#538ee6ff",
              color: "white",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.95rem",
              width: screenSize === "mobile" ? "100%" : "auto",
            }}
          >
            Search
          </button>
        </form>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "auto",
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "8px",
            scrollbarWidth: "thin",
            WebkitOverflowScrolling: "touch",
            backgroundColor: "#ffffff",
          }}
        >
          {loading && <p>Loading…</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && users.length > 0 && (
            <AppTable
              columns={columns}
              data={users}
              tableProps={{
                bordered: true,
                responsive: true,
                style: {
                  width: "100%",
                  minWidth: screenSize === "mobile" ? "600px" : "100%",
                  whiteSpace: "nowrap",
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
