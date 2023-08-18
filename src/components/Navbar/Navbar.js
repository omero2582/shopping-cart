import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCartContext } from "../../context/cartContext/cartContext";

export function Navbar() {
  const {cart} = useCartContext();
  const numItems = cart.reduce((sum, cur) => {
    return sum + cur.quantity
  }, 0);
  return (
    <nav className="navbar">
      <Link to="/shop" className="logo"><h1>My Shop</h1></Link>
      <ul className="right">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/checkout">Cart {numItems}</Link></li>
      </ul>
    </nav>
  )  
}