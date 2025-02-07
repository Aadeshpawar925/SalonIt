import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
    const userName =  `${user.firstName} ${user.lastName}` ; 
  return (
    <Container className="dashboard-container">
      <h1 style={{textAlign : "left"}} className="dashboard-title">Hey {userName} enjoy your time on our site...XD</h1>
      <h2 style={{marginTop : "50px"}} className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <Button onClick={() => navigate("/admin/manage-salons")}>Manage Salons</Button>
        <Button onClick={() => navigate("/admin/manage-users")}>Manage Users</Button>
        
      </div>
    </Container>
  );
};

export default AdminDashboard;
