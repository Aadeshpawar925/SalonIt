import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const DashboardCard = ({ title, description, onClick }) => {
  return (
    <Card className="dashboard-card shadow-lg">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={onClick}>Manage</Button>
      </Card.Body>
    </Card>
  );
};

const SalonDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
    const userName =  `${user.firstName} ${user.lastName}` ; 

  return (
    <Container  className="dashboard-container">
      <h1 style={{textAlign : "left"}} className="dashboard-title">Hey {userName} enjoy your time on our site...XD</h1>
      <h2 style={{marginTop : "50px"}} className="dashboard-title">Salon Dashboard</h2>
      <Row className="dashboard-row">
        <Col md={6} className="mb-4">
          <DashboardCard 
            title="Appointments" 
            description="Manage all customer appointments efficiently." 
            onClick={() => navigate("/appointments")} 
          />
        </Col>
        <Col md={6} className="mb-4">
          <DashboardCard 
            title="Manage Salon." 
            description="Add, edit, or remove salon  easily." 
            onClick={() => navigate("/ownerSalons")} 
          />
        </Col>
        <Col md={6} className="mb-4">
          <DashboardCard 
            title="Manage Services." 
            description="Add, edit, or remove services of salons  easily." 
            onClick={() => navigate("/salonServices")} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SalonDashboard;
