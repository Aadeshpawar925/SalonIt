import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Form, Modal, Card } from "react-bootstrap";

const BASE_URL = "https://localhost:44371/api";

const SalonServices = () => {
  const [salons, setSalons] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState("");
  const [serviceModal, setServiceModal] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [serviceData, setServiceData] = useState({ serviceName: "", cost: "", availability: true });
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    fetchOwnerAndSalons();
  }, []);

  const fetchOwnerAndSalons = async () => {
    const ownerEmail = localStorage.getItem("Email");
    if (!ownerEmail) return;
    try {
      const ownerRes = await axios.get(`${BASE_URL}/Owners`);
      const owner = ownerRes.data.find(o => o.email === ownerEmail);
      if (!owner) return;
      setOwnerId(owner.ownerId);
      const salonsRes = await axios.get(`${BASE_URL}/Salons/owner/${owner.ownerId}`);
      setSalons(salonsRes.data);
    } catch (error) {
      console.error("Error fetching salons:", error);
    }
  };

  const fetchServices = async (salonId) => {
    setSelectedSalon(salonId);
    try {
      const res = await axios.get(`${BASE_URL}/Services/salon/${salonId}`);
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleServiceSubmit = async () => {
    try {
      const payload = { ...serviceData, salonId: selectedSalon };
      if (isEditingService) {
        await axios.put(`${BASE_URL}/Services/${serviceData.serviceId}`, payload);
      } else {
        await axios.post(`${BASE_URL}/Services`, payload);
      }
      setServiceModal(false);
      fetchServices(selectedSalon);
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`${BASE_URL}/Services/${serviceId}`);
        fetchServices(selectedSalon);
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Card className="shadow-lg p-4">
        <h2 className="text-center mb-4">Manage Services</h2>
        <Form.Group>
          <Form.Label>Select a Salon</Form.Label>
          <Form.Control as="select" value={selectedSalon} onChange={(e) => fetchServices(e.target.value)}>
            <option value="">Select a Salon</option>
            {salons.map((salon) => (
              <option key={salon.salonId} value={salon.salonId}>{salon.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        {selectedSalon && (
          <>
            <Button variant="primary" className="mt-3 mb-3"
              onClick={() => {
                setServiceData({ serviceName: "", cost: "", availability: true });
                setIsEditingService(false);
                setServiceModal(true);
              }}>
              Add Service
            </Button>
            <Table striped bordered hover responsive className="text-center">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Cost</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.serviceId}>
                    <td>{service.serviceName}</td>
                    <td>&#8377;{service.cost}</td>
                    <td>{service.availability ? "Available" : "Unavailable"}</td>
                    <td>
                      <Button variant="warning" className="me-2" 
                        onClick={() => {
                          setServiceData(service);
                          setIsEditingService(true);
                          setServiceModal(true);
                        }}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteService(service.serviceId)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Card>

      {/* Service Modal */}
      <Modal style={{marginTop : "50px"}} show={serviceModal} onHide={() => setServiceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditingService ? "Edit Service" : "Add Service"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                value={serviceData.serviceName}
                onChange={(e) => setServiceData({ ...serviceData, serviceName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                value={serviceData.cost}
                onChange={(e) => setServiceData({ ...serviceData, cost: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={serviceData.availability}
                onChange={(e) => setServiceData({ ...serviceData, availability: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setServiceModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleServiceSubmit}>{isEditingService ? "Update" : "Add"} Service</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SalonServices;
