import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const BASE_URL = "https://localhost:44371/api";

const ManageSalons = () => {
  const [salons, setSalons] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [showSalonModal, setShowSalonModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [salonData, setSalonData] = useState({ name: "", address: "", contact: "", email: "" });
  const [serviceData, setServiceData] = useState({ serviceName: "", cost: "", availability: true });
  const [isEditingSalon, setIsEditingSalon] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [ownerId, setOwnerId] = useState(null);
  
  
  useEffect(() => {
    fetchOwnerAndSalons();
  }, []);

  // Fetch Owner and their Salons
  const fetchOwnerAndSalons = async () => {
    const ownerEmail = localStorage.getItem("Email");
    if (!ownerEmail) return;

    try {
      const ownerRes = await axios.get(`${BASE_URL}/Owners`);
      const owner = ownerRes.data.find(o => o.email === ownerEmail);
      if (!owner) return;
      setOwnerId(owner.ownerId);

      const salonsRes = await axios.get(`${BASE_URL}/Salons`);
      setSalons(salonsRes.data.filter(s => s.ownerId === owner.ownerId));
    } catch (error) {
      console.error("Error fetching salons:", error);
    }
  };

  // Fetch Services for Selected Salon
  const fetchServices = async (salonId) => {
    try {
      const servicesRes = await axios.get(`${BASE_URL}/Services/salon/${salonId}`);
      setServices(servicesRes.data);
      setSelectedSalon(salonId);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Handle Salon Add/Edit
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

  // Handle Salon Delete
  const handleDeleteSalon = async (salonId) => {
    if (window.confirm("Are you sure you want to delete this salon?")) {
      await axios.delete(`${BASE_URL}/Salons/${salonId}`);
      fetchOwnerAndSalons();
    }
  };

  // Handle Service Add/Edit
  const handleServiceSubmit = async () => {
    try {
      const servicePayload = { ...serviceData, salonId: selectedSalon };
      if (isEditingService) {
        await axios.put(`${BASE_URL}/Services/${serviceData.serviceId}`, servicePayload);
      } else {
        await axios.post(`${BASE_URL}/Services`, servicePayload);
      }
      setShowServiceModal(false);
      fetchServices(selectedSalon);
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  // Handle Service Delete
  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await axios.delete(`${BASE_URL}/Services/${serviceId}`);
      fetchServices(selectedSalon);
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1>Manage Salons</h1>
      <Button onClick={() => { setSalonData({ name: "", address: "", contact: "", email: "" }); setIsEditingSalon(false); setShowSalonModal(true); }}>Add Salon</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salons.map((salon) => (
            <tr key={salon.salonId}>
              <td>{salon.name}</td>
              <td>{salon.address}</td>
              <td>{salon.contact}</td>
              <td>
                <Button onClick={() => { setSalonData(salon); setIsEditingSalon(true); setShowSalonModal(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteSalon(salon.salonId)}>Delete</Button>
                <Button onClick={() => fetchServices(salon.salonId)}>Manage Services</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedSalon && (
        <>
          <h2>Manage Services</h2>
          <Button onClick={() => { setServiceData({ serviceName: "", cost: "", availability: true }); setIsEditingService(false); setShowServiceModal(true); }}>Add Service</Button>
          <Table striped bordered hover>
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
                  <td>{service.cost}</td>
                  <td>{service.availability ? "Available" : "Unavailable"}</td>
                  <td>
                    <Button onClick={() => { setServiceData(service); setIsEditingService(true); setShowServiceModal(true); }}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteService(service.serviceId)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default ManageSalons;
