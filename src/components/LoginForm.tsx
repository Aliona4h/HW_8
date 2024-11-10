import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/userAction";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/userSlice";
import { Form, Button, Card, Alert } from "react-bootstrap";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginUser(username, password);
      localStorage.setItem("token", token.access_token);
      dispatch(login(token.access_token));
      navigate("/");
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Card
      style={{ padding: "2rem", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <h3 className="text-center mb-4">Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
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
          Login
        </Button>
      </Form>
      <Button
        variant="link"
        className="text-center mt-2"
        onClick={() => navigate("/register")}
      >
        Don't have an account? Register
      </Button>
    </Card>
  );
};

export default LoginForm;
