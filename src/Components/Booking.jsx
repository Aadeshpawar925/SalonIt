import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Booking.css"; 

const Booking = () => {
  const {salonId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const services = location.state?.selectedServices ;
  const total = location.state?.totalPrice ;
  const appointmentData = location.state?.appointmentData;

  const [paymentMethod, setPaymentMethod] = useState(""); 

  const handlePayment = () => {
    if (services.length === 0) {
      alert("No services selected. Please go back and select services.");
      navigate("/salons");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method before proceeding.");
      return;
    }

    // 🔹 Now correctly passing total amount to PaymentComponent
    navigate(`/salons/${salonId}/booking/payment`, { state: { amount: total, paymentMethod , appointmentData } });
  };
  

  return (
    <Container className="booking-container">
      <h1 className="booking-title">Booking Details</h1>
      <Row className="booking-details">
        <Col md={8}>
          <Card className="booking-card">
            <Card.Body>
              <h3>Selected Services</h3>
              <ul>
                {services.map((service, index) => (
                  <li key={index}>
                    <strong>{service.serviceName}</strong> - ₹{service.cost}
                  </li>
                ))}
              </ul>
              <hr />
              <div>
                <h4>Total Amount</h4>
                <h2>₹{total}</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment Options */}
        <Col md={4}>
          <Card className="payment-card">
            <Card.Body>
              <h3>Choose Payment Method</h3>
              <div>
                <input
                  type="radio"
                  id="cod"
                  name="payment-method"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="online"
                  name="payment-method"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={() => setPaymentMethod("Online")}
                />
                <label htmlFor="online">Online Payment</label>
              </div>

              <Button onClick={handlePayment} disabled={!paymentMethod}>
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
