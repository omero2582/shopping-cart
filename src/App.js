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
