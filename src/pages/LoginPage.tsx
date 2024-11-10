import React from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "react-bootstrap";

const LoginPage: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <LoginForm />
      </div>
    </Container>
  );
};

export default LoginPage;
