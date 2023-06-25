import React from 'react';
import { Link } from "react-router-dom";

export default function ShopItem ({item, showDescription, handleAdd}) {
  const {name, priceTotal ,img, id, description} = item;
 
  return (
    <div className="item">
      <Link to={`/shop/${id}`}>
        <img alt={name} src={img} title={description}></img>
      </Link>
      <Link to={`/shop/${id}`}>
        <h3 className='name' title={description}>{name}</h3>
      </Link>
      <p className='price'>{priceTotal}g</p>
      {/* <button onClick={() => handleAdd(item, 1)}>Add to Cart</button> */}
      {showDescription && <p className='description'>{description}</p>}
    </div>
    //{JSON.stringify(item, null, 2)}
  )
}

// TODO TODO
// refer to the TODO comments in App.js