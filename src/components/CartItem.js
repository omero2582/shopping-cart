export function CartItem({item, handleDelete}) {
  const {name, priceTotal, total, img, id, description, quantity} = item;
  console.log(handleDelete);
 
  return (
    <div className="cart-item">
      <img alt={name} src={img}></img>
      <h3 className='name'>{name}</h3>
      <span className='price'>Price: {priceTotal}g</span><span>Quantity: {quantity}</span>
      <p>Total: {total}</p>
      <button onClick={() => handleDelete(id)}>Remove</button>
    </div>
    //{JSON.stringify(item, null, 2)}
  )
}