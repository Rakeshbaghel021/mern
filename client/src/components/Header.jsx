import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  const [user, setuser] = useState("");

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>Multi-Login</Navbar.Brand>
          <Nav className="me-right">
            {!localStorage.tokenStore ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/">Signup</Nav.Link>
              </>
            ) : (
              <>
                {
                  <Nav.Link href="#">
                    {localStorage.name} ({localStorage.role})
                  </Nav.Link>
                }
                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
