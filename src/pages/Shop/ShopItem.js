import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import StarRatings from 'react-star-ratings';

export default function ShopItem ({item, showDescription}) {
  const {title, price, image, id, description, rating} = item;
  const {rate, count} = rating;
  const navigate = useNavigate();
  return (
    <div className="ShopItem">
      <div className='image-container' title={description} onClick={() => navigate(`/shop/${id}`)}>
          <img alt={title} src={image} />
      </div>
      <Link to={`/shop/${id}`}>
        <h3 className='title' title={description}>{title}</h3>
      </Link>
      <p className='price'>${price.toFixed(2)}</p>
      {/* <button onClick={() => handleAdd(item, 1)}>Add to Cart</button> */}
      <section className='rating-area'>
        <span className='rating'>{rate}</span>
        <StarRatings
          rating={rate}
          numberOfStars={5}
          starDimension='20px'
          starRatedColor='#E78A2E'
          starEmptyColor='#acb9d2'
          starSpacing='0px'
        />
        <span className='count' title={`${count} ratings`}>{`(${count})`}</span>
      </section>
      {showDescription && <p className='description'>{description}</p>}
    </div>
    //{JSON.stringify(item, null, 2)}
  )
}