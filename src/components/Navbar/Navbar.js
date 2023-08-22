import React, {useState, useEffect, useMemo} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCartContext } from "../../context/cartContext/cartContext";
import Icon from '@mdi/react';
import { mdiCart } from '@mdi/js';


export function Navbar() {
  const {cart} = useCartContext();
  const numItems = useMemo(() => {
    return cart.reduce((sum, cur) => {
      return sum + cur.quantity
    }, 0);
  }, [cart]) 

  // animate cart items change
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (numItems === 0) return;
    
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 600); // animation duration

    return () => clearTimeout(timeout);
  }, [numItems]);
  return (
    <nav className="navbar">
      <Link to="/shop" className="logo"><h1>My Shop</h1></Link>
      <ul className="right">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li>
          <Link to="/checkout" className="cart">
            <Icon path={mdiCart} size={1.2}/>
            <span className={`${animate ? 'animate' : ''}`}>{numItems}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )  
}