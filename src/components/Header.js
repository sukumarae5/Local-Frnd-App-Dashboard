import React, { useState, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 992
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const headerMarginLeft = isMobile
    ? "0px"
    : sidebarOpen
    ? "250px"
    : "80px";

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
        background: "#2F3545",
        height: "60px",
        zIndex: 4000,
        marginLeft: headerMarginLeft,
        width: headerWidth,
        transition: "all 0.3s ease-in-out",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
              padding: 0,
            }}
          >
            {sidebarOpen ? "×" : "☰"}
          </Button>
        )}

        <h6
          className="text-white m-0"
          style={{
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Welcome Admin Panel
        </h6>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: "14px",
          }}
        >
          Admin
        </span>

        <Button
          variant="danger"
          size="sm"
          onClick={handleLogout}
          style={{
            padding: "6px 15px",
            borderRadius: "6px",
          }}
        >
          Logout
        </Button>
      </div>
    </Navbar>
  );
};

export default Header;