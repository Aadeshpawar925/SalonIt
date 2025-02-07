import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = "https://localhost:44371/api/Salons";

const ManageSalons = () => {
  const [salons, setSalons] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ salonId: "", name: "", address: "", ownerId: "", contact: "", email: "" });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setSalons(response.data);
    } catch (error) {
      console.error("Error fetching salons:", error);
    }
  };

  const handleShow = (salon) => {
    if (salon) {
      setIsEdit(true);
      setFormData(salon);
    } else {
      setIsEdit(false);
      setFormData({ salonId: "", name: "", address: "", ownerId: "", contact: "", email: "" });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    try {
      if (isEdit) {
        await axios.put(`${API_BASE_URL}/${formData.salonId}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      fetchSalons();
      handleClose();
    } catch (error) {
      console.error("Error saving salon:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchSalons();
    } catch (error) {
      console.error("Error deleting salon:", error);
    }
  };

  return (
    <Container style={{marginTop : "100px"}} className=" p-4 shadow-lg rounded bg-light">
      <h2 className="text-center mb-4 text-primary">Salon Management Dashboard</h2>
      <Button className="mb-3 btn-success" onClick={() => handleShow(null)}>Add Salon</Button>
      <Table striped bordered hover responsive className="table-sm text-center">
        <thead  className="bg-dark text-white">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Owner ID</th>
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
              <td>{salon.ownerId}</td>
              <td>{salon.contact}</td>
              <td>{salon.email}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleShow(salon)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(salon.salonId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Salon" : "Add Salon"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{marginTop :"100px"}}>
            <Form.Group className="mb-3">
              <Form.Label>Salon Name</Form.Label>
              <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Owner ID</Form.Label>
              <Form.Control type="text" value={formData.ownerId} onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>{isEdit ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageSalons;
