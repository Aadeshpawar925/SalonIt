import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "https://localhost:44371/api";

const UserAppointment = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const appointmentsRes = await axios.get(`${BASE_URL}/Appointments`);
        const salonsRes = await axios.get(`${BASE_URL}/Salons`);
        const servicesRes = await axios.get(`${BASE_URL}/Services`);

        const userAppointments = appointmentsRes.data
          .filter((app) => app.userId === userId)
          .map((app) => {
            const salon = salonsRes.data.find((s) => s.salonId === app.salonId);
            const service = servicesRes.data.find((s) => s.serviceId === app.serviceId);

            return {
              ...app,
              salonName: salon ? salon.name : "Unknown Salon",
              serviceName: service ? service.serviceName : "Unknown Service",
              formattedDate: new Date(app.appointmentDate).toLocaleString(),
            };
          });

        setAppointments(userAppointments);
      } catch (error) {
        setError("Failed to load appointments.");
        console.error("Error fetching appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`${BASE_URL}/Appointments/${appointmentId}`);
      setAppointments((prev) => prev.filter((app) => app.appointmentId !== appointmentId));
    } catch (error) {
      console.error("Error deleting appointment", error);
    }
  };

  return (
    <div style={{ marginTop: "100px" }} className="container p-4 bg-light shadow rounded">
      <h2 className="text-center text-primary mb-4">My Appointments</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loading ? (
        <p className="text-center text-muted">Loading appointments...</p>
      ) : appointments.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Salon</th>
                <th>Service</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.formattedDate}</td>
                  <td>{appointment.salonName}</td>
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
        </div>
      ) : (
        <p className="text-center text-muted">No appointments found.</p>
      )}
    </div>
  );
};

export default UserAppointment;
