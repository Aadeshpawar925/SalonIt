import React from "react";
import { Link } from "react-router";
import "./Header.css"


export default function Header(props){
    return(
        <header>
            <div className="webName">
                <Link to="/" className="homeLink">
                <img className="websiteLogo" src="/images/weblogo.gif"/>
                </Link>
            </div>
            <div className="navLinks">
                <Link className="hover" id="homeBut " to="/">Home</Link>
                <Link className="hover" id="aboutBut " style={{textDecoration:"underline" }} to="/aboutUs">About Us</Link>
                <Link  id="loginButton" to="/login">Login</Link>
            </div>
        </header>
    )
}