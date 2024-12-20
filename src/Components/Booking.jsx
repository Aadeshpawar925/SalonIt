import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Booking.css"; // Add custom styles here

const Booking = ({ selectedServices, totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const conversionRate = 82; // Example: 1 USD = 82 INR
  const totalInRupees = totalPrice * conversionRate;

  const handlePayment = () => {
    // Check if the user is logged in using localStorage
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
      alert("Please log in to proceed with the booking.");
      navigate("/login");
      return;
    }

    // Check if payment method is selected
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Redirect to the payment component with the total price in INR
    if (paymentMethod === "Online") {
      navigate("/payment", { state: { amount: totalInRupees } }); // Pass the amount in INR as state
    } else {
      // Handle Cash on Delivery (COD) case
      navigate("/payment-success"); // Redirect to COD confirmation page
    }
  };

  // Render the booking details only if there are selected services
  if (!selectedServices || selectedServices.length === 0) {
    return (
      <div className="error-message">
        <h2>No services selected!</h2>
        <Button onClick={() => navigate("/salon-details")} className="btn-back">
          Go Back to Salon
        </Button>
      </div>
    );
  }

  return (
    <Container className="booking-container">
      <h1 className="booking-title">Booking Details</h1>

      <Row className="booking-details">
        <Col md={8}>
          <Card className="booking-card">
            <Card.Body>
              <h3 className="selected-services-title">Selected Services</h3>
              <ul className="services-list">
                {selectedServices.map((service, index) => (
                  <li key={index} className="service-item">
                    <strong>{service.name}</strong> for {service.for} - <span className="service-price">{service.price}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="total-price">
                <h4>Total Amount (USD)</h4>
                <h2 className="price">${totalPrice}</h2>
                <h4>Total Amount (INR)</h4>
                <h2 className="price">₹{totalInRupees}</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="payment-card">
            <Card.Body>
              <h3>Choose Payment Method</h3>
              <div className="payment-option">
                <input
                  type="radio"
                  id="cod"
                  name="payment-method"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <label htmlFor="cod" className="payment-label">
                  Cash on Delivery
                </label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  id="online"
                  name="payment-method"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={() => setPaymentMethod("Online")}
                />
                <label htmlFor="online" className="payment-label">
                  Online Payment
                </label>
              </div>

              <Button
                className="btn-confirm"
                onClick={handlePayment}
                disabled={!paymentMethod}
              >
                Continue to Pay
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
