import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        {!isAuthenticated && (
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Exhibits
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Button
                  variant="link"
                  onClick={() => navigate("/")}
                  className="text-white text-decoration-none"
                >
                  Home
                </Button>

                <Button
                  variant="link"
                  onClick={() => navigate("/my-posts")}
                  className="text-white text-decoration-none"
                >
                  My Posts
                </Button>
                <Button
                  variant="link"
                  onClick={() => navigate("/new-post")}
                  className="text-white text-decoration-none"
                >
                  Create Post
                </Button>
              </>
            )}
          </Nav>
          {isAuthenticated ? (
            <Button
              variant="outline-light"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outline-light"
              onClick={() =>
                navigate(
                  location.pathname === "/login" ? "/register" : "/login"
                )
              }
            >
              {location.pathname === "/login" ? "Register" : "Login"}
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
