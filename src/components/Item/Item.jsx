import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'


const Item = ({product}) => {
  return (
    <div className='cardContainer'>
      <div className='imgContainer'>
        <img src={product.image} alt="" />
          <div className="descriptionCard">
            <p>{product.description}</p>
            <p className='productCY'>{product.category}</p>
          </div>
      </div>

        <div className='cardInfo'>
            <h5>{product.name}</h5>
            <p className='productP'>{product.price} ETH</p>
            <div className='productStats'>
            <p className='productC'>{product.creator}</p>
            <p>stock: {product.stock}</p>
            </div>
            <Link to={`/item/${product.id}`} className="buttonConfig">View Details</Link>
        </div>

    </div>
  )
}

export default Item