import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  console.log('CART CONTEXT RENDER');
  const [cart, setCart] = useState([]);
  useEffect(() => {
    console.log('cart', cart);
  }, [cart])
  const cartActions = {
    // Deletes ALL QUANTITIES of that item. Desired behavior.
    handleDelete: (id) => setCart(c => c.filter(item => item.id !== id)),

    handleAdd: (item, quantity) => {
      if (quantity < 1) {
        console.log('quanity too small');
        return;
      }

      console.log(`Adding ${quantity} ${item.title} to cart`);
      setCart(c => {
        //if item is already in the cart, simply add to quanitty
        const isItemInCart = c.find(i => i.id === item.id);
        if(isItemInCart){
          return c.map(i => {
            if (i.id === item.id){
              const newQuantity = i.quantity + quantity;
              return {
                ...i,
                quantity: newQuantity,
                total: Number((i.price * newQuantity).toFixed(2)),
              }
            }
            return i;
          });
        }
        // else item not already in cart, add new obj
        return [
          ...c, 
          {
            ...item, 
            quantity,
            total: Number((item.price * quantity).toFixed(2))
          }
        ]
      })  //setCart
    },
    // Change the quanity of a an item, given an id & quantity
    handleEditQuantity: (id, quantity) => {   
      setCart(c => {
        return c.map(item => {
          if (item.id === id){
            return {
              ...item,
              quantity: quantity,
              total: Number((item.price * quantity).toFixed(2))
            }
          }
          return item;
        })  
      })
    } 
  }

  return (
    <CartContext.Provider value={{ cart, setCart, ...cartActions }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);