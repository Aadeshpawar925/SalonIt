import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = "https://localhost:44371/api/Users";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", role: "customer", contact: "", password: "" });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  const handleShow = (user) => {
    if (user) {
      setIsEdit(true);
      setFormData({ ...user, role: user.role.toLowerCase() });
    } else {
      setIsEdit(false);
      setFormData({ firstName: "", lastName: "", email: "", role: "customer", contact: "", password: "" });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    try {
      if (isEdit) {
        await axios.put(`${API_BASE_URL}/${formData.userId}`, formData);
      } else {
        const newUser = { ...formData };
        delete newUser.userId;
        await axios.post(API_BASE_URL, newUser);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    }
  };

  return (
    <Container style={{marginTop : "100px"}} className=" p-4 shadow-lg rounded bg-light">
      <h2 className="text-center mb-4 text-primary">User Management Dashboard</h2>
      <Button className="mb-3 btn-success" onClick={() => handleShow(null)}>Add User</Button>
      <Table striped bordered hover responsive className="table-sm text-center">
        <thead className="bg-dark text-white">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Contact</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.contact}</td>
              <td>{user.password}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleShow(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user.userId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value.toLowerCase() })}>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
                <option value="customer">Customer</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
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

export default ManageUsers;
