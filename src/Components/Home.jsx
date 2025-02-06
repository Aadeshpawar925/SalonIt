import React from "react";
import { Link } from "react-router-dom"; // Import from 'react-router-dom'
import "./Home.css"

export default function Home() {
    return (
        <>
            <section className="sectionFirst">
                <div className="frontPage">
                    <h2 className="heading">Salon It</h2>
                    <p className="para">
                        Welcome to Salon It, your ultimate destination to discover the best salons in town. Explore top-rated salons, read reviews, and book appointments with ease. Your beauty journey starts here!
                    </p>
                    <div className="btn">
                        <Link to="/salons">Find Salons</Link>
                        {/* <Link href="/">Contact Us</Link> */}
                    </div>
                </div>

                {/* Transparent Image */}
                <section className="transform-img">
                    <img src="/img/background180.svg" alt="Background decoration" />
                </section>
            </section>

            <section className="sectionSecond">
                <div className="textInfo">
                    <div className="greet">Discover the Best Salons</div>
                    <h2 className="title">Top-rated Salons Near You</h2>
                    <p className="para">
                        Find and book appointments at the best salons in your area. Browse by services, customer reviews, and much more. Your next beauty experience is just a click away!
                    </p>

                    <a href="/salons" className="btn">Browse Salons</a>
                </div>
            </section>

            <section className="sectionThree">
                <h2>Popular Services</h2>
                <p>Explore the most requested services at salons around you.</p>

                <div className="servicesBox">
                    {["Haircuts", "Facials", "Manicures", "Pedicures"].map((service, index) => (
                        <div className="box" key={index}>
                            <h2>{service}</h2>
                            <p>Browse the best salons offering {service}. Book your appointment now!</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="DiscountSection">
                <div className="img">
                    <img src="/img/25off.png" alt="25% Off Promotion" />
                </div>

                <div className="textinfo">
                    <h2>Get 25% Off Your First Appointment</h2>
                    <p>Special offer for new users! Enjoy 25% off on your first salon booking with us. Don’t miss out!</p>
                </div>

                <a href="#">BOOK NOW</a>
            </section>

            <div className="transformBox">
                <h2>Affordable Salon Services</h2>
                <p>Browse through a wide range of beauty services, all at affordable prices. Salon It makes luxury beauty experiences accessible to everyone.</p>
            </div>

            <section className="sectionFive">
                {["Haircuts", "Facials", "Manicure", "Pedicure"].map((category, index) => (
                    <div className="BeautySolutions" key={index}>
                        <h2>{category}</h2>
                        <span></span>
                        <ul>
                            <li>{category} for Women <span>$50+</span></li>
                            <li>{category} for Men <span>$40+</span></li>
                            <li>Children's {category} <span>$30+</span></li>
                        </ul>
                    </div>
                ))}
            </section>

            <section className="sectionSix">
                <h2>Reviews & Testimonials</h2>
                <div className="icon">
                    <a href="#" className="fa-brands fa-facebook-f"></a>
                    <a href="#" className="fa-brands fa-google"></a>
                    <a href="#" className="fa-brands fa-instagram"></a>
                </div>

                <div className="imgicon">
                    <img src="/img/test150x150.jpg" alt="Customer Review" />
                    <i className="fa-solid fa-quote-right"></i>
                </div>

                <p>"Salon It made it so easy to find the best salon for my needs. I loved the experience and will definitely book again! Highly recommended." <small>– Happy Customer</small></p>
            </section>

            <div className="beforefooter">
                <div className="box">
                    <div className="logo">Salon It</div>
                    <div className="bf-text">Beauty at Your Fingertips</div>
                    <p className="para">Discover, book, and experience beauty like never before. Find the best salons, all in one place.</p>

                    <div className="bf-text">Subscribe for Offers</div>

                    <div className="subscribe">
                        <input type="text" placeholder="Enter your email" />
                        <button className="btn">Subscribe</button>
                    </div>
                </div>

                <div className="box">
                    <div className="bf-text">Quick Links</div>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/aboutUs">About Us</Link></li>
                        <li><Link to="/salons">Salons</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>

                    <div className="bf-text">Follow Us</div>
                    <div className="icons">
                        <a href="#" className="fa-brands fa-facebook-f"></a>
                        <a href="#" className="fa-brands fa-google"></a>
                        <a href="#" className="fa-brands fa-instagram"></a>
                        <a href="#" className="fa-brands fa-youtube"></a>
                    </div>
                </div>

                <div className="box">
                    <div className="bf-text">Say Hi!</div>
                    <ul className="SayHi">
                        <li><a href="mailto:support@salonit.com">support@salonit.com</a></li>
                    </ul>

                    <div className="bf-text">Call Us</div>
                    <ul className="SayHi">
                        <li>Phone: +1 2334325532</li>
                        <li>Toll Free: +1 2334325532</li>
                    </ul>

                    <div className="bf-text">Find Us</div>
                    <div className="address">
                        123 Fifth Avenue, New York, USA
                    </div>
                </div>
            </div>
        </>
    );
}
