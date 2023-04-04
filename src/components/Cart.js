import React from "react";
import { CartItem } from "./CartItem";
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
    <div>
      <h1>Your Cart</h1>
      <div className="cart">
        {cart.map(item => <CartItem key={item.id} item={item} handleDelete={handleDelete}/>)}
        <h2>Subtotal: {subtotal}</h2>
      </div>
    </div>
  )
}