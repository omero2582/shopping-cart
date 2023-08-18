import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext/cartContext";

export function CartItem({item}) {
  const { title, price, total, image, id, description, quantity } = item;
  const { handleDelete } = useCartContext();

  return (
    <section className="cart-item">
      <img alt={title} src={image}></img>
      <div className="info">
          <h3 className='title'>
            <Link to={`/shop/${id}`}>
              {title}
            </Link>
          </h3>
        <p>Quantity: {quantity}</p>
        <p className='price'>Price: ${price.toFixed(2)}</p>
        <button className="remove" onClick={() => handleDelete(id)}>
          <svg width="18" height="18" fill="blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          Remove
        </button>
      </div>
      <p className="total">Total: ${total.toFixed(2)}</p>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}