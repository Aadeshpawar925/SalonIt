import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./AboutUs.css"

const AboutUs = () => {
  return (
    <Container className="about-us-container">
      <Row className="about-row">
        <Col md={6} className="about-info">
          <h1 className="about-title">About Us</h1>
          <p className="about-text">
            At <strong>Salon It</strong>, we are dedicated to helping you look and feel your best.
            Our skilled professionals specialize in personalized hair and beauty services, ensuring a
            luxurious and relaxing experience for all our clients.
          </p>
          <p className="about-text">
            From expert haircuts to rejuvenating treatments, we create a space where creativity meets care,
            helping you shine inside and out.
          </p>
        </Col>
        <Col md={6} className="about-image-container">
          <img
            src="https://c0.wallpaperflare.com/preview/732/98/492/beauty-salon-hair-dresser-table-furniture.jpg"
            alt="Salon interior"
            className="about-image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
