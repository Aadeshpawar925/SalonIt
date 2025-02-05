import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const SalonDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="dashboard-container">
      <h1 className="dashboard-title">Salon Dashboard</h1>
      <div className="dashboard-buttons">
        <Button onClick={() => navigate("/appointments")}>Manage Appointments</Button>
        <Button onClick={() => navigate("/services")}>Manage Services</Button>
        <Button onClick={() => navigate("/staff")}>Manage Staff</Button>
      </div>
    </Container>
  );
};

export default SalonDashboard;
