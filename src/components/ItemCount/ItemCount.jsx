import React, { useState } from 'react'
import './ItemCount.css'



const ItemCount = () => {
    const [number, setNumber] = useState(0);

  const sumar = () => {
    setNumber(number + 1);
  };

  const restar = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  return (
    <div className='counterButton'>
    <button onClick={sumar}>+</button>
    <p>{number}</p>
    <button onClick={restar}>-</button>
    </div>
  )
}

export default ItemCount