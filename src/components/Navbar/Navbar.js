import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar({cart}) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo"><h1>My Shop</h1></Link>
      <ul className="right">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/checkout">Cart {cart.length}</Link></li>
      </ul>
    </nav>
  )  
}