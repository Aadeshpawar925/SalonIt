import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const ManageSalons = () => {
  const [salons, setSalons] = useState([
    { id: 1, name: "Luxury Salon", owner: "Alice Johnson", location: "New York" },
    { id: 2, name: "Elite Beauty", owner: "Michael Smith", location: "Los Angeles" },
  ]);

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", owner: "", location: "" });
  const [isEdit, setIsEdit] = useState(false);

  const handleShow = (salon) => {
    if (salon) {
      setIsEdit(true);
      setFormData(salon);
    } else {
      setIsEdit(false);
      setFormData({ id: "", name: "", owner: "", location: "" });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = () => {
    if (isEdit) {
      setSalons(salons.map((s) => (s.id === formData.id ? formData : s)));
    } else {
      setSalons([...salons, { ...formData, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => setSalons(salons.filter((s) => s.id !== id));

  return (
    <div>
      <h2>Manage Salons</h2>
      <Button onClick={() => handleShow(null)}>Add Salon</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salons.map((salon) => (
            <tr key={salon.id}>
              <td>{salon.name}</td>
              <td>{salon.owner}</td>
              <td>{salon.location}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(salon)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(salon.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Salon */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Salon" : "Add Salon"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Salon Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Owner</Form.Label>
              <Form.Control
                type="text"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>{isEdit ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageSalons;
