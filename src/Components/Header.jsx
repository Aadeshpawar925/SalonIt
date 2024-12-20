import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {
    return (
        <>
            <header>
                <a href="/" className="logo">
                    <img src="/img/weblogo.gif" alt="websiteLogo" />
                </a>
                <div className="menuToggle"></div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">About</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/discover-salons" className="discover-button">Discover Salons</Link></li>
                        <li><Link to="/login" id="NavNum">Login</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
