import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext/cartContext";

export function CartItem({item}) {
  const { title, price, total, image, id, description, quantity } = item;
  const { handleDelete } = useCartContext();

  return (
    <section className="cart-item">
      <img alt={title} src={image}></img>
      <div className="info">
        <Link to={`/shop/${id}`}>
          <h3 className='title'>{title}</h3>
        </Link>
        <p>Quantity: {quantity}</p>
        <p className='price'>Price: ${price.toFixed(2)}</p>
        <button onClick={() => handleDelete(id)}>Remove</button>
      </div>
      <p className="total">Total: ${total.toFixed(2)}</p>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}