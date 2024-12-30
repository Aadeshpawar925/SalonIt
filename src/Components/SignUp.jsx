import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "./Login.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let firstNameError = "";
    let lastNameError = "";
    let contactError = "";
    let emailError = "";
    let passwordError = "";
    let roleError = "";

    if (!formData.firstName) {
      firstNameError = "First Name is required";
      valid = false;
    }

    if (!formData.lastName) {
      lastNameError = "Last Name is required";
      valid = false;
    }

    if (!formData.contact) {
      contactError = "Contact is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      contactError = "Invalid contact number";
      valid = false;
    }

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
    } else if (
      !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(
        formData.password
      )
    ) {
      passwordError =
        "Password must be at least 8 characters, include a number, a symbol, and an uppercase letter";
      valid = false;
    }

    if (!formData.role) {
      roleError = "Role is required";
      valid = false;
    }

    setErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      contact: contactError,
      email: emailError,
      password: passwordError,
      role: roleError,
    });

    return valid;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      alert("Sign up successful! Please login.");
      navigate("/");
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
        <h1 className="text-center mb-4">SIGN-UP</h1>
        <Form>
          <div className="d-flex">
            <Form.Group className="mb-3 me-2 w-50">
              <Form.Label className="login-name">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 w-50">
              <Form.Label className="login-name">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label className="login-name">Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              isInvalid={!!errors.contact}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.contact}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="login-name">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="login-name">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="login-name">Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              isInvalid={!!errors.role}
              required
            >
              <option value="">Select Role</option>
              <option value="owner">Owner</option>
              <option value="customer">Customer</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.role}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            className="w-100 signup-button"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Form>
        <p className="text-center mt-4">
          <Button
            variant="link"
            className="p-0 "
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </Button>
        </p>
      </div>
    </Container>
  );
};

export default SignUp;


