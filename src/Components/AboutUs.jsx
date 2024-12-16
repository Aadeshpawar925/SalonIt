import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";

export default function AboutUs() {
    return (
        <>
            {/* Hero Section */}
            <section className="sectionFirst">
                <h1>About Us</h1>
                <section className="transform-img">
                    <img src="/img/background180.svg" alt="Background decoration" />
                </section>
            </section>

            {/* About the Salon */}
            <section className="AboutMeInDetail">
                <div className="infoAboutMe">
                    <h1>Our Story</h1>
                    <p className="para">
                        Welcome to Salon It, where your beauty is our passion. With years of expertise in salon 
                        management and services, we provide top-notch experiences tailored to your needs. From hair 
                        styling to skincare, our team ensures you leave feeling your best.
                    </p>
                </div>
            </section>

            {/* Footer Section */}
            <div className="beforefooter">
                <div className="box">
                    <div className="logo">Salon It</div>
                    <p className="para">
                        Transforming beauty services with professionalism and care. Discover the best salon experience 
                        with Salon It.
                    </p>
                    <div className="bf-text">Subscribe For Offers</div>
                    <div className="subscribe">
                        <input type="email" placeholder="Enter your email" aria-label="Email" />
                        <button className="btn">Subscribe</button>
                    </div>
                </div>

                <div className="box">
                    <div className="bf-text">Quick Links</div>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/aboutUs">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
