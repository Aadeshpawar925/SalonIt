import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SalonDetails.css";

export default function SalonDetails() {
  const { salonId } = useParams(); // Fetch salon ID from URL
  
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [salon, setSalon] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localSelectedServices, setLocalSelectedServices] = useState([]);
  const user = localStorage.getItem("user");
const isLoggedIn = user && user !== "undefined" && user !== "null"; 
  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        const salonResponse = await axios.get(`https://localhost:44371/api/salons/${salonId}`);
        setSalon(salonResponse.data);
      } catch (err) {
        setError("Error fetching salon details.");
      }
    };

    const fetchServices = async () => {
      try {
        const serviceResponse = await axios.get(`https://localhost:44371/api/services/salon/${salonId}`);
        setServices(serviceResponse.data);
      } catch (err) {
        setError("Error fetching services.");
      }
    };

    fetchSalonDetails();
    fetchServices();
    setLoading(false);
  }, [salonId]);

  const handleServiceSelect = (service) => {
    setLocalSelectedServices((prevSelected) => {
      const isAlreadySelected = prevSelected.some((s) => s.serviceId === service.serviceId);
      let updatedServices;
      if (isAlreadySelected) {
        updatedServices = prevSelected.filter((s) => s.serviceId !== service.serviceId);
      } else {
        updatedServices = [...prevSelected, service];
      }
      // setSelectedServices(updatedServices); // Update global state in App.js
      setTotalPrice(updatedServices.reduce((sum, s) => sum + s.cost, 0));
      return updatedServices;
    });
  };

  const handleBookNow = async () => {
    

  
    if (localSelectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }
  
    // const totalPrice = localSelectedServices.reduce((sum, service) => sum + service.cost, 0);
    // setSelectedServices(localSelectedServices);
    
  
    if (isLoggedIn) {
      try {
        const response = await axios.post("https://localhost:44371/api/Appointments", {
          UserId : JSON.parse(localStorage.getItem("user")).userId,
          SalonId : salonId,
          Services: localSelectedServices.map((s) => s.serviceId),
        });
        console.log(response.data);
        navigate(`/salons/${salonId}/booking`, {
          state: { selectedServices: localSelectedServices, totalPrice: totalPrice , appointmentData : response.data },
        });
      } catch (error) {
        alert("Booking Failed.")
      }
      
    } else {
      alert("Please log in to proceed with the booking.");
      navigate("/login");
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!salon) {
    return (
      <div className="salon-details">
        <h1>Salon Not Found</h1>
        <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="salon-details">
      <div className="salon-info">
        <h1>{salon.name}</h1>
        <p>{salon.address}</p>
        <p>Contact: {salon.contact}</p>
      </div>

      <h2>Services Offered:</h2>
      <div className="services-list">
        {services.map((service) => (
          <div className="service-card" key={service.serviceId}>
            <div className="card">
              <div className="card-text">
                <h2 className="card-title">{service.serviceName}</h2>
                <p className="card-price">₹{service.cost}</p>
              </div>
            </div>
            <div className="service-select">
              <input
                type="checkbox"
                id={`service-${service.serviceId}`}
                checked={localSelectedServices.some((s) => s.serviceId === service.serviceId)}
                onChange={() => handleServiceSelect(service)}
              />
              <label htmlFor={`service-${service.serviceId}`}>Select</label>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-book-now" onClick={handleBookNow}>Book Now</button>
    </div>
  );
}
