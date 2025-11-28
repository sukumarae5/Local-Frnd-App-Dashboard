import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BottomNavbar({
  activeMenu,
  setActiveMenu,
  sidebarWidth = 150,
}) {
  const [screen, setScreen] = useState("desktop");
  const [layout, setLayout] = useState({});
  const navigate = useNavigate();

  const layoutOptions = {
    mobile: { width: "70%", paddingX: "0px", titleTop: "75px", navTop: "115px", marginLeft: "20%", marginRight: "10%" },
    tablet: { width: "65%", paddingX: "20px", titleTop: "78px", navTop: "118px", marginLeft: "17.5%", marginRight: "17.5%" },
    desktop: { width: "65%", paddingX: "25px", titleTop: "80px", navTop: "120px", marginLeft: `${sidebarWidth + 300}px`, marginRight: "auto" },
  };

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 576) { setScreen("mobile"); setLayout(layoutOptions.mobile); }
      else if (w <= 992) { setScreen("tablet"); setLayout(layoutOptions.tablet); }
      else { setScreen("desktop"); setLayout(layoutOptions.desktop); }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarWidth]);

 const menuItems = [
    { key: "dashboard", icon: "bi-speedometer2", label: "Dashboard", path: "/" },
    { key: "userlistpage", icon: "bi-people", label: "User List", path: "/userlistpage" },
    { key: "photolistpage", icon: "bi-image", label: "Photo List", path: "/photolistpage" },
    { key: "moderation", icon: "bi-gear", label: "Moderation", path: "/" },
    { key: "review", icon: "bi-person-check", label: "Profile Review", path: "/" },
    { key: "monetization", icon: "bi-cash-stack", label: "Monetization", path: "/" },
    { key: "analytics", icon: "bi-bar-chart-line", label: "Analytics", path: "/" },
  ];

  return (
    <>
      <div style={{ position: "fixed", top: layout.titleTop, left: layout.marginLeft, right: layout.marginRight, width: layout.width, fontWeight: "600", fontSize: "1.2rem", color: "#333", textAlign: "center", zIndex: 1051 }}>
        Welcome Admin Panel
      </div>

      <div style={{ position: "fixed", top: layout.navTop, left: layout.marginLeft, right: layout.marginRight, width: layout.width, backgroundColor: "#bdbbbb", borderRadius: "15px", padding: `10px ${layout.paddingX}`, display: "flex", justifyContent: screen === "desktop" ? "flex-start" : "space-around", gap: "10px", overflowX: screen === "desktop" ? "auto" : "hidden", whiteSpace: "nowrap", zIndex: 1050 }}>
        {menuItems.map((item) => {
          const isActive = activeMenu === item.key;
          return (
            <div
              key={item.key}
              onClick={() => { setActiveMenu(item.key); navigate(item.path); }}
              style={{ padding: "6px 12px", borderBottom: isActive ? "2px solid #007bff" : "2px solid transparent", borderRadius: "6px", color: isActive ? "#007bff" : "#222", fontWeight: isActive ? "600" : "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <i className={`bi ${item.icon}`} />
              {screen === "desktop" && <span>{item.label}</span>}
            </div>
          );
        })}
      </div>
    </>
  );
}
