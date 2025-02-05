import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-buttons">
        <Button onClick={() => navigate("/admin/manage-salons")}>Manage Salons</Button>
        <Button onClick={() => navigate("/admin/manage-users")}>Manage Users</Button>
        
      </div>
    </Container>
  );
};

export default AdminDashboard;
