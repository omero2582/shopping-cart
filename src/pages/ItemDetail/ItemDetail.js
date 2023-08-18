import { useParams } from "react-router-dom";
import { useState } from "react";
import validator from "validator";
import './ItemDetail.css'
import useItem from "../../context/shopContext/useItem";
import { useCartContext } from "../../context/cartContext/cartContext";

export default function ItemDetail () {
  const {isLoading: cartLoading, handleAdd} = useCartContext();
  const [quantityBuy, setQuantityBuy] = useState(1);
  const sanitizedId = validator.escape(useParams().id);
  const id = Number(sanitizedId);
  
  const { item, isLoading, error } = useItem(id);
  // const { items, isLoading, error } = useShop();
  // const item = items.find(i => i.id === id);

  if (isLoading){
    return (
      <section className="ItemDetail">
        <section className="loading">
          <div className="loading-spinner"></div>
          <h2>Loading...</h2>
        </section>
      </section>
    )
  }
  if (error){
    return (
      <section className="ItemDetail">
        <section className="error">
          <h2>Error loading item...</h2>
        </section>
      </section>
    )
  }
  // const {name, priceTotal ,img, description} = item;
  const {title, price ,image, description} = item;
  console.log(item);
  const handleQuantityInput = (e) => {
    const number = (Number(e.target.value));
    setQuantityBuy(Math.max(1, number));
  }

  const addToCart = () => {
    handleAdd(item, quantityBuy);
  }
  return (
    <section className="ItemDetail">
      <img alt={title} src={image}></img>
      <div className="details">
        <h2 className='name'>{title}</h2>
        <p className='price'>${price.toFixed(2)}</p>
        <div className="buy-area">
          <label htmlFor="quantity">Quantity:</label>
          <input id="quantity" className="quantity" type='number' min={1} step={1} value={quantityBuy} onChange={handleQuantityInput}></input>
        </div>
          {/*maybe extract this input with the state into its own component bc I want to reuse this in the cart page.
            Prob not tho. Have to think about this. I think its the extra restrctions of min=1 and other
            html attributes that I set, that make me want to extract this into a component, since there are a lot of specific 'settings'*/}
          
        <button className="buy" onClick={addToCart} disabled={cartLoading}>
          {cartLoading ?
          <div className="loading">
            <div className="loading-spinner"></div>
            {/* <p>Loading...</p>  */}
          </div>
            : 'Add to Cart'}
        </button>
        <section className="description-area">
          <h3 className="title">Product Description</h3>
          <p className='description'>{description}</p>
        </section>
      </div>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}