import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userAction";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, password);
      navigate("/login");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{
          maxWidth: "400px",
          padding: "2rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="text-center mb-4">Create an account</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Register
          </Button>
        </Form>
        <Button
          variant="link"
          className="text-center mt-2"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>
      </Card>
    </Container>
  );
};

export default RegisterForm;
