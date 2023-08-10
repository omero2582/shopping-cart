import { Link } from "react-router-dom";

export function CartItem({item, handleDelete}) {
  const {title, price, total, image, id, description, quantity} = item;
  console.log(handleDelete);
 
  return (
    <section className="cart-item">
      <img alt={title} src={image}></img>
      <div className="info">
        <Link to={`/shop/${id}`}>
          <h3 className='title'>{title}</h3>
        </Link>
        <p>Quantity: {quantity}</p>
        <p className='price'>Price: ${price}</p>
        <button onClick={() => handleDelete(id)}>Remove</button>
      </div>
      <p className="total">Total: ${total}</p>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}