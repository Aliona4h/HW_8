import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Container } from "react-bootstrap";

const RegisterPage: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <RegisterForm />
      </div>
    </Container>
  );
};

export default RegisterPage;
