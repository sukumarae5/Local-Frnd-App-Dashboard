import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";

const Header = ({ toggleSidebar, sidebarOpen }) => {
  return (
     
    <Navbar
      variant="dark"
      fixed="top"
      className="px-3"
      style={{
        background: "linear-gradient(180deg, #0a0a0a, #1a1919, #262323)",
        height: "60px",
        zIndex: 4000,
      }}
    >
 

      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* ☰ or × toggle button visible only on mobile */}
        <Button
          variant="light"
          size="sm"
          onClick={toggleSidebar}
          className="d-md-none"
          style={{
            width: "35px",
            height: "35px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {sidebarOpen ? "×" : "☰"}
        </Button>

        {/* Header title */}
        
      </Container>
       <h6
  className="text-white m-0"
  style={{
    paddingRight: "10px",
    whiteSpace: "nowrap", // 👈 keeps text in one line
  }}
>
  Welcome Admin Panel
</h6>
    </Navbar>
     
  );
};

export default Header;
