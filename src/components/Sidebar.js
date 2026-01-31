import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img1 from "../assets/logo1lf.png";

export default function Sidebar({
  sidebarOpen = true,
  toggleSidebar = () => {},
  activeMenu,
  setActiveMenu,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isMobile
    ? sidebarOpen
      ? "250px"
      : "80px"
    : "250px";

  const menuItems = [
    { key: "dashboard", icon: "bi-speedometer2", label: "Dashboard", path: "/" },
    { key: "userlistpage", icon: "bi-people", label: "User List", path: "/userlistpage" },
    { key: "photolistpage", icon: "bi-image", label: "Photo List", path: "/photolistpage" },
    { key: "languagepage", icon: "bi-translate", label: " Language", path: "/languagepage" },
    { key: "moderation", icon: "bi-gear", label: "Moderation", path: "/" },
    { key: "review", icon: "bi-person-check", label: "Profile Review", path: "/" },
    { key: "monetization", icon: "bi-cash-stack", label: "Monetization", path: "/" },
    { key: "analytics", icon: "bi-bar-chart-line", label: "Analytics", path: "/" },
  ];

  // ✅ ONLY active menu color changed here
  const menuItemStyle = (isActive) => ({
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s",
    background: isActive
      ? "linear-gradient(90deg, #7F00FF, #BF28E1, rgba(35,33,33,0.5))"
      : "transparent",
    color: isActive ? "white" : "#e5e7eb",
    justifyContent: sidebarOpen || !isMobile ? "flex-start" : "center",
  });

  return (
    <>
      {/* Mobile Overlay */}
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
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          width: sidebarWidth,
          background: "#2F3545",
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
        {/* Logo Section */}
        <div
          style={{
            height: "60px",
            borderBottom: "1px solid #333",
            display: "flex",
            alignItems: "center",
            paddingLeft: "12px",
            gap: "10px",
          }}
        >
          <img
            src={img1}
            alt="Logo"
            style={{
              height: "70px",
              width: "70px",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          {(sidebarOpen || !isMobile) && (
            <h5
              style={{
                margin: 0,
                background: "white",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "nowrap",
              }}
            >
              Lokal Friend
            </h5>
          )}
        </div>

        {/* Menu Items */}
        <div style={{ padding: "12px" }}>
          {menuItems.map((item) => {
            const isActive = activeMenu === item.key;

            return (
              <div
                key={item.key}
                style={menuItemStyle(isActive)}
                onClick={() => {
                  setActiveMenu(item.key);
                  navigate(item.path);
                  if (isMobile) toggleSidebar();
                }}
              >
                <i className={`bi ${item.icon} fs-5`} />
                {(sidebarOpen || !isMobile) && (
                  <span style={{ marginLeft: "12px" }}>
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
