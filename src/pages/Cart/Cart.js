import React from "react";
import { CartItem } from "./CartItem";
import './Cart.scss'
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext/cartContext";
export function Cart() {
  const {cart} = useCartContext();
  // cart = cart.map(item => {
  //   return {
  //     ...item,
  //     total: item.price * item.quantity
  //   }
  // })
  const subtotalRaw = cart.reduce((subtotal, item) => {
    return subtotal + item.total;
  }, 0);

  const subtotal = subtotalRaw.toFixed(2);
  return(
    <main className="Cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ?
      (<p className="empty-text">Your Cart is empty. Check out <Link to={'/shop'}>the shop</Link> and add some items</p>)
      :
      (<>
      <section className="cart-items">   
        <h2 className="item-total-title">Item Total</h2>
        <h2 className="visually-hidden">Cart Items</h2>
        {cart.map(item => <CartItem key={item.id} item={item}/>)}
      </section>
      <h2 className="subtotal">Subtotal: ${subtotal}</h2>
      </>)
    }
      
    </main>
  )
}