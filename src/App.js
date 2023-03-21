import { Navbar } from "./components/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./components/Home";
import { Checkout } from "./components/Checkout";
import { Shop } from "./components/Shop";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const cartActions = {
    handleDelete: (id) => setCart(c => c.filter(item => item.id !== id)),
    handleAdd: (item) => setCart(c => [...c, item]),
    handleEditAmount: (id, amount) => {   
      setCart(c => {
        return c.map(item => {
          if (item.id === id){
            return {...item, amount: amount}
          }
          return item;
        })  
      })
    } 
  }
  
  return (
    <BrowserRouter>
      <Navbar cart={cart}></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/checkout" element={<Checkout cart={cart} {...cartActions}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// TODO need to add cartActions to Shop, so that we can further pass it down to <Item>..
// also we need to think about how we want to handle adding an item to the cart.
// remmember each item has a lot of random keys from when we fetch the data,
// and we need a way to keep track of items in cart
// AKA, we prob need to add an 'quantity' key or something to each item obj and then add that object to the cart
// then run some sort of reducer that handles each object add.
// we can also instead, just create a new obj that takes only the important keys from item
// then add the 'quantity' key to that new obj

// TODO TODO
// After thinking for a bit, i think its best that the shop continues to load items like it is right now
// maybe simplify the item object, so that it only contains the key/values that we use
// Regardless, when you add an item to the cart, its should be a added as a cartItem instead of an item
// cartItem = {...item, quantity: 0}
// also rename Item everywhere to Product
// so Product.js and cartProduct and product
// also, we need 2 different displays depending on if the product is displayed on the shop page,
// or if its displayed on the product specific page.
// We can do a simple {isProductDisplay ? '': description: product.description} on Product.js (currently Item.js)
// of if not, then create a second component like ProductDisplay for when its displayed on its prodct page
// shouldn't have too much trouble anyways, since the css for each product is in Shop.css
// and when we make ProductPage.js, it will load css from ProductPage.css