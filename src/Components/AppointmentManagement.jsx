import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "https://localhost:44371/api";

const AppointmentManagement = () => {
  const [ownerId, setOwnerId] = useState(null);
  const [salons, setSalons] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwnerAndSalons = async () => {
      const ownerEmail = localStorage.getItem("Email");
      if (!ownerEmail) return;
      try {
        const ownerRes = await axios.get(`${BASE_URL}/Owners`);
        const owner = ownerRes.data.find((o) => o.email === ownerEmail);
        if (!owner) return;
        setOwnerId(owner.ownerId);

        const salonsRes = await axios.get(`${BASE_URL}/Salons`);
        const ownedSalons = salonsRes.data.filter((salon) => salon.ownerId === owner.ownerId);
        setSalons(ownedSalons);
      } catch (error) {
        setError("Failed to load salons.");
        console.error("Error fetching owner and salons", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOwnerAndSalons();
  }, []);

  const fetchAppointments = useCallback(async (salonId) => {
    setAppointments([]); // Clear old appointments before fetching new ones
    try {
      const res = await axios.get(`${BASE_URL}/Appointments`);
      const usersRes = await axios.get(`${BASE_URL}/Users`);
      const servicesRes = await axios.get(`${BASE_URL}/Services`);

      const salonAppointments = res.data
        .filter((app) => app.salonId === salonId)
        .map((app) => {
          const user = usersRes.data.find((u) => u.userId === app.userId);
          const service = servicesRes.data.find((s) => s.serviceId === app.serviceId);
          return {
            ...app,
            clientName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
            serviceName: service ? service.serviceName : "Unknown Service",
            formattedDate: new Date(app.appointmentDate).toLocaleString(),
          };
        });

      setAppointments(salonAppointments);
    } catch (error) {
      setError("Failed to load appointments.");
      console.error("Error fetching appointments", error);
    }
  }, []);

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/Appointments/${id}`);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.appointmentId !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment", error);
    }
  };

  return (
    <div style={{ marginTop: "100px" }} className="container p-4 bg-light shadow rounded">
      <h2 className="text-center text-primary mb-4">Manage Appointments</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loading ? (
        <p className="text-center text-muted">Loading salons...</p>
      ) : (
        <>
          <h4 className="mb-3 text-secondary">Select a Salon</h4>
          <div className="d-flex flex-wrap mb-4">
            {salons.length > 0 ? (
              salons.map((salon) => (
                <button
                  key={salon.salonId}
                  className={`btn me-2 mb-2 ${selectedSalon === salon.salonId ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => {
                    setSelectedSalon(salon.salonId);
                    fetchAppointments(salon.salonId);
                  }}
                >
                  {salon.name}
                </button>
              ))
            ) : (
              <p className="text-muted">No salons found</p>
            )}
          </div>

          {selectedSalon && (
            <>
              <h3 className="text-secondary mb-3">Appointments</h3>
              <div className="table-responsive">
                {appointments.length > 0 ? (
                  <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Date</th>
                        <th>Client Name</th>
                        <th>Service</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.appointmentId}>
                          <td>{appointment.formattedDate}</td>
                          <td>{appointment.clientName}</td>
                          <td>{appointment.serviceName}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteAppointment(appointment.appointmentId)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-muted">No appointments available</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentManagement;
