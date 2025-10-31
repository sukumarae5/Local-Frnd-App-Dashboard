import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ open, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Overlay background when sidebar is open on mobile */}
      {isMobile && open && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 4999,
            transition: "opacity 0.3s ease",
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className="position-fixed d-flex flex-column"
        style={{
          background: "linear-gradient(180deg, #1c1c1c, #333333, #4f4f4f)",
          width: "250px",
          height: "100vh",
          top: 0,
          left: open ? "0" : "-250px",
          transition: "left 0.3s ease-in-out",
          overflowY: "auto",
          zIndex: 5000,
          boxShadow: open ? "2px 0 10px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* ✅ Brand name + close icon */}
        <div
          className="fw-bold border-bottom border-secondary px-3 py-3 d-flex justify-content-between align-items-center"
          style={{
            whiteSpace: "nowrap",
            fontSize: "1.3rem",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #0dcaf0, #66e1d3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Lokal Friend
          </span>

          {isMobile && (
            <i
              className="bi bi-x-lg text-white fs-5"
              style={{ cursor: "pointer" }}
              onClick={toggleSidebar}
            ></i>
          )}
        </div>

        {/* ✅ Navigation items */}
        <Nav className="flex-column text-start px-2 py-3">
          {[
            { to: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
            { to: "userpagelist", icon: "bi-people", label: "User List" },
            { to: "moderation", icon: "bi-gear", label: "Moderation" },
            { to: "review", icon: "bi-person-check", label: "Profile Review" },
            { to: "monetization", icon: "bi-cash-stack", label: "Monetization" },
            { to: "analytics", icon: "bi-bar-chart-line", label: "Analytics" },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-white mb-2 d-flex align-items-center sidebar-item ${
                  isActive ? "fw-bold text-info" : ""
                }`
              }
              style={{ textDecoration: "none" }}
              onClick={() => isMobile && toggleSidebar()} // auto close when clicking a link on mobile
            >
              <i className={`bi ${icon} fs-5`}></i>
              <span className="fw-semibold ms-3">{label}</span>
            </NavLink>
          ))}
        </Nav>

        <style jsx="true">{`
          .sidebar-item {
            padding: 6px 10px;
            border-radius: 6px;
          }
          .sidebar-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: #0dcaf0 !important;
            transition: 0.3s ease-in-out;
          }
          .sidebar-item:hover i {
            color: #0dcaf0;
          }
        `}</style>
      </div>
    </>
  );
};

export default Sidebar;
