import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  // ⭐ FIX: Add activeMenu + setActiveMenu
  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width <= 992;
      setIsMobile(mobile);

      // Auto open sidebar on desktop
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      fluid
      className="p-0 m-0"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Row className="g-0 h-100">

        {/* SIDEBAR */}
        <Col
          xs={sidebarOpen ? 9 : 1}
          sm={sidebarOpen ? 3 : 1}
          md={sidebarOpen ? 2 : 1}
          className="p-0"
        >
          <Sidebar
           sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
          />
        </Col>

        {/* MAIN CONTENT */}
        <Col
          xs={sidebarOpen ? 3 : 11}
          sm={sidebarOpen ? 9 : 11}
          md={sidebarOpen ? 10 : 11}
          className="d-flex flex-column position-relative"
          style={{ backgroundColor: "#0d0d0dff", height: "100%" }}
        >
          {/* HEADER */}
          <Header
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />

          {/* SCROLLABLE OUTLET CONTENT */}
          <div
            className="flex-grow-1 overflow-auto pt-4 px-3"
            style={{  
              marginTop: "170px",
              marginLeft: isMobile ? "20px" : "70px",
              paddingBottom: "0px",
            }}
          >
            <Outlet />
          </div>

          {/* BOTTOM NAVBAR */}
          <div
            className="w-50 position-sticky bottom-0"
            style={{ zIndex: 10 }}
          >
            <BottomNavbar
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}   // ✔ FIXED
              sidebarWidth={150}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
