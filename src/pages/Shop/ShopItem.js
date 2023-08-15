import React from 'react';
import { Link } from "react-router-dom";

export default function ShopItem ({item, showDescription}) {
  const {title, price, image, id, description} = item;
 
  return (
    <div className="item">
      <Link to={`/shop/${id}`}>
        <img alt={title} src={image} title={description}></img>
      </Link>
      <Link to={`/shop/${id}`}>
        <h3 className='title' title={description}>{title}</h3>
      </Link>
      <p className='price'>${price.toFixed(2)}</p>
      {/* <button onClick={() => handleAdd(item, 1)}>Add to Cart</button> */}
      {showDescription && <p className='description'>{description}</p>}
    </div>
    //{JSON.stringify(item, null, 2)}
  )
}