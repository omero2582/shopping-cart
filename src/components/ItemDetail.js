//Item Detail page. I renamed the previous Item.js to ShopItem, which are the items displayed on shop page

import {useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import useShop from "./useShop";

export default function ItemDetail ({handleAdd}) {
  // const location = useLocation();
  // console.log(location)
  // let item = location.state
  const [quantityBuy, setQuantityBuy] = useState(1);
  const id = Number(useParams().id);
  
  const items = useShop();
  const item = items.find(i => i.id === id);

  if (items.length === 0 ){
    return <h1>Loading</h1>
  }
  if (!item){
    return <h1>Error</h1>
  }
  const {name, priceTotal ,img, description} = item;
  const handleQuantityInput = (e) => {
    const number = (Number(e.target.value));
    setQuantityBuy(Math.max(1, number));
  }
  return (
    <div className="item">
      <img alt={name} src={img}></img>
      <h2 className='name'>{name}</h2>
      <p className='price'>{priceTotal}g</p>
      <label>
        <input type='number' min={1} step={1} value={quantityBuy} onChange={handleQuantityInput}></input>
      </label>
      <button onClick={() => handleAdd(item, quantityBuy)}>Add to Cart</button>
      {<p className='description'>{description}</p>}
    </div>
    //{JSON.stringify(item, null, 2)}
  )
}