import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Customer", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Salon Owner", email: "jane@example.com" },
  ]);

  const handleDelete = (id) => setUsers(users.filter((user) => user.id !== id));

  return (
    <div>
      <h2>Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
