import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SalonDetails.css";

export default function SalonDetails() {
  const { salonId } = useParams();
  const navigate = useNavigate();
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [salon, setSalon] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]); // New state for reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localSelectedServices, setLocalSelectedServices] = useState([]);
  
  const user = localStorage.getItem("user");
  const isLoggedIn = user && user !== "undefined" && user !== "null";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salonResponse, serviceResponse, reviewResponse] = await Promise.all([
          axios.get(`https://localhost:44371/api/salons/${salonId}`),
          axios.get(`https://localhost:44371/api/services/salon/${salonId}`),
          axios.get(`https://localhost:44371/api/reviewfeedbacks/salon/${salonId}`)
        ]);

        setSalon(salonResponse.data);
        setServices(serviceResponse.data);
        setReviews(reviewResponse.data); // Store reviews
      } catch (err) {
        setError("Error loading salon details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [salonId]);

  const handleServiceSelect = (service) => {
    setLocalSelectedServices((prevSelected) => {
      const isAlreadySelected = prevSelected.some((s) => s.serviceId === service.serviceId);
      let updatedServices = isAlreadySelected
        ? prevSelected.filter((s) => s.serviceId !== service.serviceId)
        : [...prevSelected, service];

      setTotalPrice(updatedServices.reduce((sum, s) => sum + s.cost, 0));
      return updatedServices;
    });
  };

  const handleBookNow = async () => {
    if (localSelectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    if (isLoggedIn) {
      try {
        const response = await axios.post("https://localhost:44371/api/Appointments", {
          UserId: JSON.parse(localStorage.getItem("user")).userId,
          SalonId: salonId,
          Services: localSelectedServices.map((s) => s.serviceId),
        });

        navigate(`/salons/${salonId}/booking`, {
          state: { selectedServices: localSelectedServices, totalPrice, appointmentData: response.data },
        });
      } catch (error) {
        alert("Booking Failed.");
      }
    } else {
      alert("Please log in to proceed with the booking.");
      navigate("/login");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
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
      {/* Salon Information */}
      <div className="salon-info">
        <h1>{salon.name}</h1>
        <p>{salon.address}</p>
        <p>Contact: {salon.contact}</p>
      </div>

      {/* Services List */}
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

      {/* Booking Button */}
      <button className="btn-book-now" onClick={handleBookNow}>Book Now</button>

      {/* Customer Reviews Section */}
      <h2>Customer Reviews</h2>
      <div className="reviews-section">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.reviewId} className="review-card">
              <h4>{review.userName}</h4>
              <p><strong>Rating:</strong> {review.rating} / 5</p>
              <p><strong>Feedback:</strong> {review.feedback}</p>
              <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this salon.</p>
        )}
      </div>
    </div>
  );
}
