// Updated Login Component with Axios authentication
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";

    if (!formData.email) {
      emailError = "Email is required";
      valid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
      emailError = "Invalid email format";
      valid = false;
    }

    if (!formData.password) {
      passwordError = "Password is required";
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError });
    return valid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post("https://localhost:44371/api/Users/login", formData);
        const { token, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);

        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "owner") navigate("/salon-dashboard");
        else if (role === "customer") navigate("/customer-dashboard");
      } catch (error) {
        setErrors({ email: "Invalid credentials", password: "" });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <Container className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" className="login-button" onClick={handleLogin}>
            Login
          </Button>
        </Form>
        <p>Don't have an account? <Link to="/signup">Register</Link></p>
      </div>
    </Container>
  );
};

export default Login;

