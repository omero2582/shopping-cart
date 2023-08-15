import { Navbar } from "./components/Navbar/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/Cart/Cart";
import { Shop } from "./pages/Shop/Shop";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
import { ShopProvider } from "./context/shopContext/shopContext";
import { CartProvider } from "./context/cartContext/cartContext";

function App() {
  
  return (
    <ShopProvider>
      <CartProvider>
        <BrowserRouter basename="/shopping-cart">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/shop">
              <Route index element={<Shop/>}/>
              <Route path=":id" element={<ItemDetail/>}/>
            </Route>
            <Route path="/checkout" element={<Cart/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ShopProvider>
  );
}

export default App;