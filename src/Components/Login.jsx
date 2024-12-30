import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
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

  const handleLogin = (role) => {
    if (validateForm()) {
      // Set login status in localStorage
      localStorage.setItem("userLoggedIn", true);
  
      // Redirect to appropriate role page
      if (role === "salon") {
        navigate("/"); // Adjust destination as needed
      } else if (role === "customer") {
        navigate("/"); // Adjust destination as needed
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
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" className="login-button" onClick={handleLogin}>
            Login
          </Button>
        </Form>
        <p className="signup-text">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign up here
          </Button>
        </p>
      </div>
    </Container>
  );
};

export default Login;
