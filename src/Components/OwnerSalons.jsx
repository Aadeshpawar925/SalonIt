import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form, Card } from "react-bootstrap";

const BASE_URL = "https://localhost:44371/api";

const OwnerSalon = () => {
  const [salons, setSalons] = useState([]);
  const [showSalonModal, setShowSalonModal] = useState(false);
  const [salonData, setSalonData] = useState({ name: "", address: "", contact: "", email: "" });
  const [isEditingSalon, setIsEditingSalon] = useState(false);
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    fetchOwnerAndSalons();
  }, []);

  const fetchOwnerAndSalons = async () => {
    const ownerEmail = localStorage.getItem("Email");
    if (!ownerEmail) return;
    try {
      const ownerRes = await axios.get(`${BASE_URL}/Owners`);
      const owner = ownerRes.data.find((o) => o.email === ownerEmail);
      if (!owner) return;
      setOwnerId(owner.ownerId);

      // Fetch only the logged-in owner's salons
      const salonsRes = await axios.get(`${BASE_URL}/Salons/owner/${owner.ownerId}`);
      setSalons(salonsRes.data);
    } catch (error) {
      console.error("Error fetching salons:", error);
    }
  };

  const handleSalonSubmit = async () => {
    try {
      if (isEditingSalon) {
        await axios.put(`${BASE_URL}/Salons/${salonData.salonId}`, salonData);
      } else {
        await axios.post(`${BASE_URL}/Salons`, { ...salonData, ownerId });
      }
      setShowSalonModal(false);
      fetchOwnerAndSalons();
    } catch (error) {
      console.error("Error saving salon:", error);
    }
  };

  const handleDeleteSalon = async (salonId) => {
    if (window.confirm("Are you sure you want to delete this salon?")) {
      try {
        await axios.delete(`${BASE_URL}/Salons/${salonId}`);
        fetchOwnerAndSalons();
      } catch (error) {
        console.error("Error deleting salon:", error);
      }
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Card className="shadow-lg p-4">
        <h1 className="text-center mb-4">Manage Salons</h1>
        <Button 
          variant="primary" 
          className="mb-3"
          onClick={() => {
            setSalonData({ name: "", address: "", contact: "", email: "" });
            setIsEditingSalon(false);
            setShowSalonModal(true);
          }}
        >
          Add Salon
        </Button>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salons.map((salon) => (
              <tr key={salon.salonId}>
                <td>{salon.name}</td>
                <td>{salon.address}</td>
                <td>{salon.contact}</td>
                <td>{salon.email}</td>
                <td>
                  <Button 
                    variant="warning" 
                    className="me-2"
                    onClick={() => {
                      setSalonData(salon);
                      setIsEditingSalon(true);
                      setShowSalonModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteSalon(salon.salonId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Add/Edit Salon Modal */}
      <Modal style={{ marginTop: "50px" }} show={showSalonModal} onHide={() => setShowSalonModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditingSalon ? "Edit Salon" : "Add Salon"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={salonData.name}
                onChange={(e) => setSalonData({ ...salonData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={salonData.address}
                onChange={(e) => setSalonData({ ...salonData, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={salonData.contact}
                onChange={(e) => setSalonData({ ...salonData, contact: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={salonData.email}
                onChange={(e) => setSalonData({ ...salonData, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSalonModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSalonSubmit}>
            {isEditingSalon ? "Update" : "Add"} Salon
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OwnerSalon;
