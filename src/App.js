import { Navbar } from "./components/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";
import { Shop } from "./components/Shop";
import { useState } from "react";
import ItemDetail from "./components/ItemDetail";

function App() {
  const [cart, setCart] = useState([]);
  const cartActions = {
    // Deletes ALL QUANTITIES of that item. Desired behavior.
    handleDelete: (id) => setCart(c => c.filter(item => item.id !== id)),
    // Adds item to cart, as long as quantity is >= 1. Also if the item is already in the cart, then it
    // simply modifies the quanity property of the existing item in cart, instead of adding a new obj
    handleAdd: (item, quantity) => {
      if (quantity < 1) {
        console.log('quanity too small');
        return;
      }

      console.log(`Adding ${quantity} ${item.name} to cart ${typeof quantity}`);
      setCart(c => {
        //if item is already in the cart, simply add to quanitty
        const itemAlreadyInCart = c.find(i => i.id === item.id);
        if(itemAlreadyInCart){
          return c.map(i => {
            if (item.id === i.id){
              return {
                ...i,
                quantity: i.quantity + quantity,
              }
            }else return i;
          });
        }
        // else item not already in cart, add new obj
        return [
          ...c, 
          {
            ...item, 
            quantity,
            total: item.price * quantity
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
              total: item.price * quantity
            }
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
        <Route path="/shop">
          <Route index element={<Shop cartActions= {cartActions}/>}/>
          <Route path=":id" element={<ItemDetail {...cartActions}/>}/>
        </Route>
        <Route path="/checkout" element={<Cart cart={cart} {...cartActions}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// shouldn't have too much trouble anyways, since the css for each item is in Shop.css
// and when we make ItemDetail.js, it will load css from ItemDetail.css

//TODO (Half-done)
// After thinking for a bit, it makes most sense to me to ALWAYS fetch for the whole shop in the
// /shop/:id page. And for the best user experience, it should also fetch shop on Shop load, cart page (TODO TODO),
// and on the final purchase button at the end of checkout.
// This is because we need to check the exact stock quanity at these locations

// I can also maybe lift up the state of the shop variable. However, I dont see much point
// in doing this, since we will pretty much always be fetching the shop from scratch, and never passing it as
// props. Maybe im wrong, but this is what it seems like.

//if I had to pass it as a prop, or using <Link> i can do <Link state={item}> and then receivve it with useLocation()
// Updated, using state{item} is not that reliable. The object that you passs needs to be serializable.
// meaning a lot of times you have to .JSON it when you send it, then parse it when u receive it
// so I dont know how I should pass and object if i had to...

// We can maybe also NOT fetch quantity on ItemDetail if we go first to /shop then /shop/:id.
// AKA ONLY fetch on /shop , /cart, and if you initially directly go to /shop/:id 