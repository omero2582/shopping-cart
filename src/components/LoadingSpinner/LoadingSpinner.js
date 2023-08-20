import React from 'react'
import './LoadingSpinner.css'

export default function LoadingSpinner({showText, width = 40, sx}) {
  return (
    <section className='loading' style={{...sx}}>
      <div className='loading-spinner' style={{width, height:width}}></div>
      { showText && <h2 className='loading-text'>Loading...</h2>}
    </section>
  )
}
