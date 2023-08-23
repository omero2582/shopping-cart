import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext/cartContext";
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { useNavigate } from "react-router-dom";

export function CartItem({item}) {
  const { title, price, total, image, id, description, quantity } = item;
  const { handleDelete, handleEditQuantity } = useCartContext();
  const navigate = useNavigate();

  const incrementQuantity = () => handleEditQuantity(id, quantity + 1);
  const decrementQuantity = () => {
    if(quantity > 1) {
      handleEditQuantity(id, quantity-1)
    }
  }
  const changeQuantity = (e) => {
    const newQuantity = Number(e.target.value);
    handleEditQuantity(id, Math.max(1, newQuantity));
  }

  return (
    <section className="cart-item">
      <img alt={title} src={image} onClick={() => navigate(`/shop/${id}`)}></img>
      <div className="info">
          <h3 className='title'>
            <Link to={`/shop/${id}`}>
              {title}
            </Link>
          </h3>
        <p className='price'>${price.toFixed(2)}</p>
        <p className="quantity-area">
          <button className="minus" onClick={decrementQuantity}>-</button>
          <input type="number" value={quantity} min={1} onChange={changeQuantity}></input>
          <button className="plus" onClick={incrementQuantity}>+</button>
        </p>
        <button className="remove" onClick={() => handleDelete(id)}>
          {/* <svg width="18" height="18" fill="blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> */}
          <Icon path={mdiTrashCanOutline} size={0.75} />
          Remove
        </button>
      </div>
      <p className="total-container">
        <span className="total-text">Total: </span>
        <strong className="total">${total.toFixed(2)}</strong></p>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}