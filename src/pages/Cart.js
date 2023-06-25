import React from "react";
import { CartItem } from "../components/CartItem";
import './styles/Cart.css'
import { Link } from "react-router-dom";
export function Cart({cart, handleDelete}) {
  // cart = cart.map(item => {
  //   return {
  //     ...item,
  //     total: item.price * item.quantity
  //   }
  // })
  const subtotal = cart.reduce((subtotal, item) => {
    return subtotal + item.total;
  }, 0);
  return(
    <main className="Cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ?
      (<p>Your Cart is empty. Check out <Link to={'/shop'}>the shop</Link> and add some items</p>)
      :
      (<>
        <section className="cart-items">   
        <h2 className="price-title">Price</h2>
        <h2 className="visually-hidden">Cart Items</h2>
        {cart.map(item => <CartItem key={item.id} item={item} handleDelete={handleDelete}/>)}
        </section>
        <h2>Subtotal: {subtotal}</h2>
      </>)
    }
      
    </main>
  )
}