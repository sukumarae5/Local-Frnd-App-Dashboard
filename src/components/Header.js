import React, { useState, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const headerMarginLeft = isMobile ? "0px" : sidebarOpen ? "250px" : "80px";
  const headerWidth = isMobile
    ? "100%"
    : sidebarOpen
    ? "calc(100% - 250px)"
    : "calc(100% - 80px)";

  return (
    <Navbar
      fixed="top"
      variant="dark"
      style={{
        background: "linear-gradient(180deg, #0a0a0a, #1a1919, #262323)",
        height: "60px",
        zIndex: 4000,
        marginLeft: headerMarginLeft,
        width: headerWidth,
        transition: "all 0.3s ease-in-out",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",   // <-- EVERYTHING moves to the RIGHT
        gap: "15px",                   // spacing between items
      }}
    >

      {/* TITLE on right side */}
      <h6
        className="text-white m-0"
        style={{
          fontSize: "1rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Welcome Admin Panel
      </h6>

      {/* TOGGLE on right side (only mobile) */}
      {isMobile && (
        <Button
          variant="light"
          size="sm"
          onClick={toggleSidebar}
          style={{
            width: "38px",
            height: "38px",
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "6px",
          }}
        >
          {sidebarOpen ? "×" : "☰"}
        </Button>
      )}

    </Navbar>
  );
};

export default Header;
