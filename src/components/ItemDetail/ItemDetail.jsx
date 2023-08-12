import React, { useState } from 'react'
import './ItemDetail.css'
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';

const ItemDetail = ({ item }) => {
  
  return (
    <div className='detailDisplay'>
      <div className='detailContainer'>
        <h2>{item.name}</h2>
        <h4>{item.price} ETH</h4> 
        <div className='displayFlex'>
        <p>Author: {item.creator}</p>
        <p>Category: {item.category}</p>
        <p>Stock: {item.stock}</p>
        </div>
        <p>{item.description}</p>
        <ItemCount/>
        <div className='submitButton'>
        <Link to="/store" className="buttonConfig">Back to Store</Link>
        <Link to="#" className="buttonConfig">Add Cart</Link>
        <Link to="#" className="buttonConfig">Go to Buy</Link>
        </div>
      </div>
      <img  className='detailImg' src={item.image} alt="" />
    </div>
  )
}

export default ItemDetail