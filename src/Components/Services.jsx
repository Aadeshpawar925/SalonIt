import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";

export default function Services() {
    const services = [
        {
            name: "Clean Nail Art",
            description: "Professional nail art services with a wide variety of designs.",
            imgSrc: "/img/nailart_1.jpg",
        },
        {
            name: "Hair Styling",
            description: "Expert hair styling to suit any occasion.",
            imgSrc: "/img/haircut_2.jpg",
        },
        {
            name: "Full Body Massage",
            description: "Relax and rejuvenate with our full body massage services.",
            imgSrc: "/img/massage_3.jpg",
        },
        {
            name: "Stocked Cosmetic Store",
            description: "Find all your favorite cosmetic brands in one place.",
            imgSrc: "/img/cosmetics_4.jpg",
        },
        {
            name: "Fully Equipped Spa",
            description: "Enjoy a luxurious spa experience with our top-notch facilities.",
            imgSrc: "/img/spa_5.jpg",
        },
        {
            name: "Authorized Botox",
            description: "Safe and professional Botox treatments.",
            imgSrc: "/img/botox_6.jpg",
        },
        {
            name: "Men's Haircut",
            description: "Professional haircut tailored to your style and preference.",
            imgSrc: "/img/mens_haircut.jpg",
        },
        {
            name: "Beard Grooming",
            description: "Expert grooming services to keep your beard looking sharp.",
            imgSrc: "/img/beard_grooming.jpg",
        },
        {
            name: "Facial Treatments",
            description: "Rejuvenating facials for glowing, healthy skin.",
            imgSrc: "/img/facial_treatments.jpg",
        },
        {
            name: "Waxing Services",
            description: "Smooth, hair-free skin with our professional waxing services.",
            imgSrc: "/img/waxing_services.jpg",
        },
        {
            name: "Pedicure & Manicure",
            description: "Complete care for your hands and feet.",
            imgSrc: "/img/pedicure_manicure.jpg",
        },
        {
            name: "Scalp Treatments",
            description: "Specialized treatments for a healthy scalp.",
            imgSrc: "/img/scalp_treatments.jpg",
        },
    ];

    return (
        <>
            <section className="sectionFirst">
                <h1>Services</h1>
            </section>

            <section className="aboutServices">
                <div className="ser-litText">Our Services</div>
                <p className="ser-text">Explore our range of professional salon services for both men and women.</p>

                <div className="ser-box">
                    {services.map((service, index) => (
                        <div className="box" key={index}>
                            <div className="img">
                                <img src={service.imgSrc} alt={service.name} />
                            </div>
                            <div className="boxinfo">
                                <div className="ser-name">{service.name}</div>
                                <p className="ser-description">{service.description}</p>
                                <Link to="/booking" className="book-button">Book Now</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="beforefooter">
    <div className="box">
        <div className="logo">Salon It</div>
        <p className="bf-text">AnmolKeCode</p>
        <p className="footer-description">Providing top-notch salon services for all your beauty needs.</p>

        <div className="subscribe">
            <input type="text" placeholder="Enter your email" />
            <button className="btn">Subscribe</button>
        </div>
    </div>

    <div className="box">
        <p className="bf-text">Quick Links</p>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/aboutUs">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>

        <p className="bf-text">Follow Us</p>
        <div className="icons">
            <a href="#" className="fa-brands fa-facebook-f"></a>
            <a href="#" className="fa-brands fa-google"></a>
            <a href="#" className="fa-brands fa-instagram"></a>
            <a href="#" className="fa-brands fa-youtube"></a>
        </div>
    </div>

    <div className="box">
        <p className="bf-text">Contact Us</p>
        <ul className="contact-info">
            <li><a href="mailto:info@example.com">info@example.com</a></li>
            <li><a href="mailto:contact@example.com">contact@example.com</a></li>
            <li>Phone: +1 2334325532</li>
            <li>Toll Free: +1 2334325532</li>
        </ul>

        <p className="bf-text">Visit Us</p>
        <div className="address">
            123 Fifth Avenue, Opp Hut, New York, USA
        </div>
    </div>
</footer>

        </>
    );
}
