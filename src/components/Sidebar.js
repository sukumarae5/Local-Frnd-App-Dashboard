import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { to: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/userlistpage", icon: "bi-people", label: "User List" },
    { to: "/photolistpage", icon: "bi-people", label: "Photo List" },
    { to: "/moderation", icon: "bi-gear", label: "Moderation" },
    { to: "/review", icon: "bi-person-check", label: "Profile Review" },
    { to: "/monetization", icon: "bi-cash-stack", label: "Monetization" },
    { to: "/analytics", icon: "bi-bar-chart-line", label: "Analytics" },
  ];

  // Determine sidebar width
  const sidebarWidth = isMobile
    ? sidebarOpen
      ? "250px" // Expanded on toggle
      : "80px" // Default collapsed on mobile
    : "250px"; // Always open on desktop

  return (
    <>
      {/* Overlay when sidebar is open on mobile */}
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

      {/* Sidebar */}
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
          boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Sidebar Header */}
        <div
          className="d-flex align-items-center justify-content-center px-3"
          style={{
            height: "60px",
            borderBottom: "1px solid #333",
          }}
        >
          <h5
            className="m-0 text-center"
            style={{
              background: "linear-gradient(90deg, #0dcaf0, #66e1d3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontSize: "1rem",
              whiteSpace: "nowrap",
            }}
          >
            Lokal Friend
          </h5>
        </div>

        {/* Sidebar Menu */}
        <Nav className="flex-column mt-3 px-2">
          {menuItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => isMobile && toggleSidebar()}
              className={({ isActive }) =>
                `d-flex align-items-center mb-2 text-decoration-none ${
                  isActive ? "text-info fw-semibold" : "text-white"
                }`
              }
              style={{
                padding: "10px",
                borderRadius: "6px",
                transition: "0.3s ease",
                justifyContent:
                  sidebarOpen || !isMobile ? "flex-start" : "center",
              }}
            >
              <i className={`bi ${icon} fs-5`}></i>
              <span
                style={{
                  marginLeft: sidebarOpen || !isMobile ? "12px" : "0",
                  display: sidebarOpen || !isMobile ? "inline" : "none",
                  transition: "opacity 0.3s ease",
                }}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
