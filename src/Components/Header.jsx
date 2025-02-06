import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");
    const isLoggedIn = !!localStorage.getItem("user");

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        navigate("/");
    };
useEffect(()=>{
    if(!isLoggedIn){
        navigate("/login");
    }else{
        const role = localStorage.getItem("userRole");
        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "owner") navigate("/salon-dashboard");
        else if (role === "customer") navigate("/customer-dashboard");
    }

} , [isLoggedIn])
    return (
        <header>
            <a href="/" className="logo">
                <img src="/img/weblogo.gif" alt="websiteLogo" />
            </a>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about-us">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/salons" className="discover-button">Discover Salons</Link></li>
                    {isLoggedIn && userRole === "admin" && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
                    {isLoggedIn && userRole === "owner" && <li><Link to="/salon-dashboard">Owner Dashboard</Link></li>}
                    {isLoggedIn && userRole === "customer" && <li><Link to="/customer-dashboard">Customer Dashboard</Link></li>}
                    {isLoggedIn ? (
                        <li><button onClick={handleLogout}>Logout</button></li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}