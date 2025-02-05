import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="dashboard-container">
      <h1 className="dashboard-title">Customer Dashboard</h1>
      <div className="dashboard-buttons">
        <Button onClick={() => navigate("/book-appointment")}>Book Appointment</Button>
        <Button onClick={() => navigate("/browse-salons")}>Browse Salons</Button>
        <Button onClick={() => navigate("/my-bookings")}>My Bookings</Button>
      </div>
    </Container>
  );
};

export default CustomerDashboard;
