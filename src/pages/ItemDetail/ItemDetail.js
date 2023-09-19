import { useParams } from "react-router-dom";
import { useState } from "react";
import validator from "validator";
import './ItemDetail.scss'
import useItem from "../../context/shopContext/useItem";
import { useCartContext } from "../../context/cartContext/cartContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import StarRatings from "react-star-ratings";
import Icon from '@mdi/react';
import { mdiCheckBold } from '@mdi/js';
import NumberInput from "../../components/NumberInput/NumberInput";

export default function ItemDetail () {
  const {isLoading: cartLoading, handleAdd} = useCartContext();
  const [quantityBuy, setQuantityBuy] = useState(1);
  const [isSucessAdded, setIsSucessAdded] = useState(false);
  const sanitizedId = validator.escape(useParams().id);
  const id = Number(sanitizedId);
  
  const { item, isLoading, error } = useItem(id);
  // const { items, isLoading, error } = useShop();
  // const item = items.find(i => i.id === id);

  if (isLoading){
    return (
      <section className="ItemDetail">
        <LoadingSpinner showText sx={{'marginTop': '20px'}}/>
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
  const {title, price ,image, description, rating} = item;
  const {rate, count} = rating;
  console.log(item);
  const handleQuantityInput = (e) => {
    const number = (Number(e.target.value));
    setQuantityBuy(Math.max(1, number));
  }

  const addToCart = async () => {
    setIsSucessAdded(false);
    await handleAdd(item, quantityBuy);
    setIsSucessAdded(true);
  }

  const incrementQuantity = () => setQuantityBuy(quantityBuy + 1);
  const decrementQuantity = () => {
    if(quantityBuy > 1) {
      setQuantityBuy(quantityBuy-1)
    }
  }
  return (
    <section className="ItemDetail">
      <img alt={title} src={image}></img>
      <div className="details">
        <h2 className='name'>{title}</h2>
        <p className='price'>${price.toFixed(2)}</p>
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
          <span className='count' title={`${count} ratings`}>
            {count} ratings
          </span>
      </section>
        {/* <div>
          <label htmlFor="quantity">Quantity:</label>
          <input id="quantity" className="quantity" type='number' min={1} step={1} value={quantityBuy} onChange={handleQuantityInput}></input>
        </div> */}
        <NumberInput
          quantity={quantityBuy}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onChange={handleQuantityInput}
          sx={{'marginTop': '2.5px'}}
          // sxInput={{'fontSize': '1.1rem'}}
          // sxButton={{'height': '26px'}}
        />
        <div className="buy-and-checkmark">
          <button className="buy" onClick={addToCart} disabled={cartLoading}>
            {cartLoading ?
            <LoadingSpinner width={17}/>
              : 'Add to Cart'}
          </button>
          { isSucessAdded && 
            <Icon path={mdiCheckBold} size={1.05} className="checkmark" color={"green"}/>}
        </div>
        <section className="description-area">
          <h3 className="title">Product Description</h3>
          <p className='description'>{description}</p>
        </section>
      </div>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}