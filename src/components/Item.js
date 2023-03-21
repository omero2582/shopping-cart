import React from 'react';

export default function Item (item) {
  const {name, priceTotal ,img, id, description, handleBuy} = item;
 
  return (
    <div className="item">
      <img alt={name} src={img}></img>
      <h2 className='name'>{name}</h2>
      <p className='price'>{priceTotal}g</p>
      {<p className='description'>{description}</p>}
      <button onClick={() => handleBuy(item)}>Buy</button>
    </div>
  )
}

// TODO TODO
// refer to the TODO comments in App.js