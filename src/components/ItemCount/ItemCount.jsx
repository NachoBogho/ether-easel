import React, {} from 'react'
import './ItemCount.css'



const ItemCount = ({number, restar, sumar}) => {

  return (
    <div className='counterButton'>
   <button onClick={restar}>-</button>
    <p>{number}</p>
    <button onClick={sumar}>+</button>
    </div>
  )
}

export default ItemCount