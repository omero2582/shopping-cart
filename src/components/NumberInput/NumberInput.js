import React from 'react'
import './NumberInput.css'

export default function NumberInput({quantity, onIncrement, onDecrement, onChange, sx, sxButton, sxInput}) {
  return (
    <div className="NumberInput" style={{...sx}}>
      <button className="minus" onClick={onDecrement} style={{...sxButton}}>-</button>
      <input type="number" value={quantity} min={1} onChange={onChange} style={{...sxInput}}></input>
      <button className="plus" onClick={onIncrement} style={{...sxButton}}>+</button>
    </div>
  )
}
