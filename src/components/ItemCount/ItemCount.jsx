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
   <button onClick={restar}>-</button>
    <p>{number}</p>
    <button onClick={sumar}>+</button>
    </div>
  )
}

export default ItemCount