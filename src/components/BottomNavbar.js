import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const BottomNavbar = () => {
  const [screen, setScreen] = useState("desktop"); // mobile | tablet | desktop
  const [layout, setLayout] = useState({
    width: "70%",
    leftOffset: "calc(50% + 120px)",
    paddingX: "25px",
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 576) {
        // 📱 Mobile — icons only
        setScreen("mobile");
        setLayout({
          width: "80%",
          leftOffset: "58%", // slightly left
          paddingX: "25px",
        });
      } else if (width <= 992) {
        // 💻 Tablet — icons only
        setScreen("tablet");
        setLayout({
          width: "85%",
          leftOffset: "53%", // better center alignment
          paddingX: "55px",
        });
      } else {
        // 🖥️ Desktop — icons + labels
        setScreen("desktop");
        setLayout({
          width: "70%",
          leftOffset: "calc(50% + 120px)",
          paddingX: "30px",
        });
      }
    };

    handleResize(); // Run once when mounted
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { to: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/userpagelist", icon: "bi-people", label: "User List" },
    { to: "/moderation", icon: "bi-gear", label: "Moderation" },
    { to: "/review", icon: "bi-person-check", label: "Profile Review" },
    { to: "/monetization", icon: "bi-cash-stack", label: "Monetization" },
    { to: "/analytics", icon: "bi-bar-chart-line", label: "Analytics" },
  ];

  return (
    <>
      {/* ✅ Title */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          left: layout.leftOffset,
          transform: "translateX(-50%)",
          width: layout.width,
          textAlign: screen === "desktop" ? "center" : "left", // 📱 Left align on mobile
          paddingLeft: screen === "desktop" ? "0" : "25px", // Add left padding
          fontWeight: "600",
          fontSize: "1.2rem",
          color: "#333",
          transition: "all 0.3s ease",
          zIndex: 1051,
        }}
      >
        Welcome Admin Panel
      </div>

      {/* ✅ Navbar */}
      <div
        style={{
          position: "fixed",
          top: "120px",
          left: layout.leftOffset,
          transform: "translateX(-50%)",
          width: layout.width,
          backgroundColor: "#bdbbbbff",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          padding: `10px ${layout.paddingX}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          transition: "all 0.3s ease",
          zIndex: 1050,
          boxSizing: "border-box",
        }}
        className="custom-scrollbar"
      >
        {menuItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `fw-semibold d-flex align-items-center justify-content-center gap-2 ${
                isActive
                  ? "text-primary border-bottom border-primary"
                  : "text-dark"
              }`
            }
            style={{
              textDecoration: "none",
              fontSize: "1rem",
              padding: "6px 12px",
              borderRadius: "8px",
              borderBottom: "2px solid transparent",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            <i className={`bi ${icon}`}></i>
            {/* ✅ Only show labels on desktop */}
            {screen === "desktop" && label}
          </NavLink>
        ))}
      </div>

      {/* ✅ Custom Scrollbar Styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #999;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #666;
          }
        `}
      </style>
    </>
  );
};

export default BottomNavbar;
