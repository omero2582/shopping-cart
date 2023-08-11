//Item Detail page. I renamed the previous Item.js to ShopItem, which are the items displayed on shop page

import {useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import useShop from "../../components/useShop/useShop";
import validator from "validator";
import './ItemDetail.css'
import useItem from "../../components/useShop/useItem";

export default function ItemDetail ({handleAdd}) {
  // const location = useLocation();
  // console.log(location)
  // let item = location.state
  const [quantityBuy, setQuantityBuy] = useState(1);
  const sanitizedId = validator.escape(useParams().id);
  const id = Number(sanitizedId);
  
  const { item, isLoading, error } = useItem(id);
  // const { items, isLoading, error } = useShop();
  // const item = items.find(i => i.id === id);

  if (isLoading ){
    return <h1>Loading...</h1>
  }
  if (error){
    return <h1>Error</h1>
  }
  // const {name, priceTotal ,img, description} = item;
  const {title, price ,image, description} = item;
  console.log(item);
  const handleQuantityInput = (e) => {
    const number = (Number(e.target.value));
    setQuantityBuy(Math.max(1, number));
  }
  return (
    <section className="ItemDetail">
      <img alt={title} src={image}></img>
      <div className="details">
        <h2 className='name'>{title}</h2>
        <p className='price'>${price}</p>
        <div className="buy-area">
          <label htmlFor="quantity">Quantity:</label>
          <input id="quantity" className="quantity" type='number' min={1} step={1} value={quantityBuy} onChange={handleQuantityInput}></input>
        </div>
          {/*maybe extract this input with the state into its own component bc I want to reuse this in the cart page.
            Prob not tho. Have to think about this. I think its the extra restrctions of min=1 and other
            html attributes that I set, that make me want to extract this into a component, since there are a lot of specific 'settings'*/}
          
        <button className="buy" onClick={() => handleAdd(item, quantityBuy)}>Add to Cart</button>
        <section className="description-area">
          <h3>Product Description</h3>
          <p>{description}</p>
        </section>
      </div>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}