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
    handleDelete: (id) => setCart(c => c.filter(item => item.id !== id)),
    // handleDelete currently deletes ALL QUANTITIES of that item. we will leave this as desired behavior
    handleAdd: (item, quantity) => setCart(c => {
      if (quantity < 1) {
        console.log('quanity too small');
        return [...c];
      }
      console.log(`Adding ${quantity} ${item.name} to cart ${typeof quantity}`);
      //if adding an item already in the cart, simply add to quanitty
      const itemAlreadyInCart = c.find(i => i.id === item.id);
      if(itemAlreadyInCart){
        return c.map(i => {
          if (item.id === i.id){
            console.log(`${i.quantity} + ${quantity}`);
            return {
              ...i,
              quantity: i.quantity + quantity,
            }
            
          }else return i;
        })
      }
      // else item not already in cart
      return [
        ...c, 
        {
          ...item, 
          quantity,
          total: item.price * quantity
        }
      ]
    }),
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


// shouldn't have too much trouble anyways, since the css for each product is in Shop.css
// and when we make ProductPage.js, it will load css from ProductPage.css

//TODO (Half-done)
// mostly done the transition into the different ways to display products. ShopItem, CartItem, Item.
// but now need to decide in which parts of the app I want to fetch the shop
// After thinking for a bit, it makes most sense to me to ALWAYS fetch for the whole shop in the
// /shop/:id page. And also ALWAYS fetch for it in /cart. This is because the stock quantity should always be
// updated. And for the best user experience, it should update on Shop load, product page, cart page, and
// on the final purchase button at the end of checkout. This is because it will need to check the stock quanity
// at these locations

// For the fetch, I will proabbly need to extract the useEffect I currently have in Shop.js, onto a custom hook
// Then use that custom hook in those 3 locations.

// Also, alognside this, I can also maybe lift up the state of the shop variable. However, I dont see much point
// in doing this, since we will pretty much always be fetching the shop from scratch, and never passing it as
// props. Maybe im wrong, but this is what it seems like.

//if I had to pass it as a prop, or using <Link> i can do <Link state={item}> and then receivve it with useLocation()

// we can maybe also not fetch quantity on product detail page if we go first /shop then /shop/:id
// and only fetch on /shop , /cart, and if you directly go to /shop/:id without visiting shop first