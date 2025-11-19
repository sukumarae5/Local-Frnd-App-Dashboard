import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [screen, setScreen] = useState("desktop");
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 580) setScreen("mobile");
      else if (width <= 954) setScreen("tablet");
      else setScreen("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Title/Search independent margins ---
  const getTitleMarginLeft = () => {
    if (screen === "mobile") return "20px";
    if (screen === "tablet") return "40px";
    return "200px"; // desktop
  };
  const getTitleMarginRight = () => {
    if (screen === "mobile") return "20px";
    if (screen === "tablet") return "50px";
    return "180px"; // desktop
  };

  // --- Outlet independent padding ---
  const getOutletPaddingLeft = () => {
    if (screen === "mobile") return "12px";
    if (screen === "tablet") return "16px";
    return "150px";
  };
  const getOutletPaddingRight = () => {
    if (screen === "mobile") return "12px";
    if (screen === "tablet") return "20px";
    return "150px";
  };

  // --- Content margin independent of title ---
  const getContentMarginLeft = () => {
    if (screen === "mobile") return "60px";
    if (screen === "tablet") return sidebarOpen ? "240px" : "60px";
    return sidebarOpen ? "200px" : "80px";
  };
  const getContentMarginRight = () => {
    if (screen === "mobile") return "-20px";
    if (screen === "tablet") return sidebarOpen ? "20px" : "-40px";
    return "-150px";
  };

  const menuTitles = {
    dashboard: "Dashboard",
    userlistpage: "User List",
    photolistpage: "Photo List",
    moderation: "Moderation",
    review: "Profile Review",
    monetization: "Monetization",
    analytics: "Analytics",
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: getContentMarginLeft(),
          marginRight: getContentMarginRight(),
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          marginTop: "200px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        {/* Title & Search (Side by Side Always) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row", // always side by side
            marginLeft: getTitleMarginLeft(),
            marginRight: getTitleMarginRight(),
            border: "1px solid #ddd",
            backgroundColor: "#fff",
            gap: "10px",
            height: "50px",
            paddingLeft: "5px",
            paddingRight: "5px",
            borderRadius: "10px",
          }}
        >
          <h3 style={{ margin: 0 }}>{menuTitles[activeMenu]}</h3>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              width: screen === "mobile" ? "150px" : "200px",
            }}
          />
        </div>

        {/* Outlet Section (Independent Padding) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingLeft: getOutletPaddingLeft(),
            paddingRight: getOutletPaddingRight(),
            WebkitOverflowScrolling: "touch",
          }}
        >
          {screen === "desktop" && (
            <style>
              {`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
          )}
          <Outlet />
        </div>

        {/* Bottom Navbar */}
        <div style={{ width: "100%", position: "relative", zIndex: 10 }}>
          <BottomNavbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
