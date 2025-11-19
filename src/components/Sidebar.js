import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ sidebarOpen = true, toggleSidebar = () => {}, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isMobile ? (sidebarOpen ? "250px" : "80px") : "250px";

  const menuItems = [
    { key: "dashboard", icon: "bi-speedometer2", label: "Dashboard", path: "/dashboard/userlistpage" },
    { key: "userlistpage", icon: "bi-people", label: "User List", path: "/dashboard/userlistpage" },
    { key: "photolistpage", icon: "bi-image", label: "Photo List", path: "/dashboard/photolistpage" },
    { key: "moderation", icon: "bi-gear", label: "Moderation", path: "/dashboard/moderation" },
    { key: "review", icon: "bi-person-check", label: "Profile Review", path: "/dashboard/review" },
    { key: "monetization", icon: "bi-cash-stack", label: "Monetization", path: "/dashboard/monetization" },
    { key: "analytics", icon: "bi-bar-chart-line", label: "Analytics", path: "/dashboard/analytics" },
  ];

  const menuItemStyle = (isActive) => ({
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s",
    background: isActive ? "#2563eb" : "transparent",
    color: isActive ? "white" : "#e5e7eb",
    justifyContent: sidebarOpen || !isMobile ? "flex-start" : "center",
  });

  return (
    <>
      {isMobile && sidebarOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 4999,
          }}
        ></div>
      )}

      <div
        style={{
          width: sidebarWidth,
          background: "linear-gradient(180deg, #0b0b0b, #1a1a1a, #222)",
          color: "white",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 5000,
          transition: "all 0.3s ease-in-out",
          overflowX: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: "60px",
            borderBottom: "1px solid #333",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5
            style={{
              background: "linear-gradient(90deg, #0dcaf0, #66e1d3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Lokal Friend
          </h5>
        </div>

        {/* Menu Items */}
        <div style={{ padding: "12px" }}>
          {menuItems.map((item) => {
            const isActive = activeMenu === item.key; // highlight active based on shared state
            return (
              <div
                key={item.key}
                style={menuItemStyle(isActive)}
                onClick={() => {
                  setActiveMenu(item.key); // update Dashboard + BottomNavbar
                  navigate(item.path);
                  if (isMobile) toggleSidebar();
                }}
              >
                <i className={`bi ${item.icon} fs-5`} />
                {(sidebarOpen || !isMobile) && (
                  <span style={{ marginLeft: "12px" }}>{item.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
