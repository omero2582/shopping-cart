export default function QuantityInput() {

  return (
    <label>
      <input className="quantity" type='number' min={1} step={1} value={quantityBuy} onChange={handleQuantityInput}></input>
      {/*maybe extract this input with the state into its own component bc I want to reuse this in the cart page.
        Prob not tho. Have to think about this. I think its the extra restrctions of min=1 and other
        html attributes that I set, that make me want to extract this into a component, since there are a lot of specific 'settings'*/}
    </label>
  )
}