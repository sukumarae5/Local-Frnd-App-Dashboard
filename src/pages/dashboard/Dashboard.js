import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [screen, setScreen] = useState("desktop");
  const [activeMenu, setActiveMenu] = useState("dashboard");

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

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

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
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        {/* Removed Title + Search completely */}

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

        <div style={{ width: "100%", position: "relative", zIndex: 10 }}>
          <BottomNavbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
