import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "auto" }}>
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: sidebarOpen ? "220px" : "70px",
          transition: "all 0.3s ease",
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ✅ Header */}
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* ✅ Sticky Top Navbar */}
        <BottomNavbar />

        {/* ✅ Page Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
