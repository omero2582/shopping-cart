//Item Detail page. I renamed the previous Item.js to ShopItem, which are the items displayed on shop page

import {useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import useShop from "../components/useShop";
import validator from "validator";
import './styles/ItemDetail.css'

export default function ItemDetail ({handleAdd}) {
  // const location = useLocation();
  // console.log(location)
  // let item = location.state
  const [quantityBuy, setQuantityBuy] = useState(1);
  const sanitizedId = validator.escape(useParams().id);
  const id = Number(sanitizedId);
  
  const { items, isLoading } = useShop();
  const item = items.find(i => i.id === id);

  if (isLoading ){
    return <h1>Loading</h1>
  }
  if (!item){
    return <h1>Error</h1>
  }
  const {name, priceTotal ,img, description} = item;
  console.log(item);
  const handleQuantityInput = (e) => {
    const number = (Number(e.target.value));
    setQuantityBuy(Math.max(1, number));
  }
  return (
    <section className="ItemDetail">
      <img alt={name} src={img}></img>
      <div className="details">
        <h2 className='name'>{name}</h2>
        <p className='price'>{priceTotal}g</p>
        <div className="buy-area">
          <label>
            <input className="quantity" type='number' min={1} step={1} value={quantityBuy} onChange={handleQuantityInput}></input>
            {/*maybe extract this input with the state into its own component bc I want to reuse this in the cart page.
              Prob not tho. Have to think about this. I think its the extra restrctions of min=1 and other
              html attributes that I set, that make me want to extract this into a component, since there are a lot of specific 'settings'*/}
          </label>
          <button onClick={() => handleAdd(item, quantityBuy)}>Add to Cart</button>
        </div>
        <p className='description'>{description}</p>
      </div>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}