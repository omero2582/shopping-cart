import { Link } from "react-router-dom";

export function CartItem({item, handleDelete}) {
  const {name, priceTotal, total, img, id, description, quantity} = item;
  console.log(handleDelete);
 
  return (
    <section className="cart-item">
      <img alt={name} src={img}></img>
      <div className="info">
        <Link to={`/shop/${id}`}>
          <h3 className='name'>{name}</h3>
        </Link>
        <p>Quantity: {quantity}</p>
        <p className='price'>Price: {priceTotal}g</p>
        <button onClick={() => handleDelete(id)}>Remove</button>
      </div>
      <p className="total">Total: {total}</p>
    </section>
    //{JSON.stringify(item, null, 2)}
  )
}