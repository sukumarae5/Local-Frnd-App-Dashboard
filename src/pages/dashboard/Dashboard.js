import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const [open, setOpen] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      // Collapse only when moving below 768, expand only when moving above 768
      if (window.innerWidth < 768 && open) {
        setOpen(false);
      } else if (window.innerWidth >= 768 && !open) {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={open} toggleSidebar={toggleSidebar} />

      <div
        style={{
          marginLeft: open ? "230px" : "70px",
          marginTop: "56px",
          transition: "all 0.3s ease",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
