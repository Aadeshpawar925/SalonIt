import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
    const userName =  `${user.firstName} ${user.lastName}` ;
  return (
    <Container className="dashboard-container">
       <h1 style={{textAlign : "left"}} className="dashboard-title">Hey {userName} enjoy your time on our site...XD</h1>
      <h2 style={{marginTop : "50px"}} className="dashboard-title">Customer Dashboard</h2>
      <div className="dashboard-buttons">
        
        <Button onClick={() => navigate("/salons")}>Browse Salons</Button>
        <Button onClick={() => navigate("/my-bookings")}>My Bookings</Button>
      </div>
    </Container>
  );
};

export default CustomerDashboard;
