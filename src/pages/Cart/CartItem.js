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
        <button className="remove" onClick={() => handleDelete(id)}>Remove</button>
      </div>
      <p className="total">Total: ${total.toFixed(2)}</p>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}