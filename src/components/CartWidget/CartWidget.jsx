import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import './CartWidget.css'

const CartWidget = () => {

    const {cartNumber} = useContext(CartContext);

  return (
    <div className='cartSerchBar'>
        <div>
            <Link to="/cart"  className='cartNumberDisplay'>
            <li className='carrito'><i className="bi bi-cart"></i> Cart</li>
            <span className='cartNumber'>{cartNumber()}</span>
            </Link>
        </div>
    </div>
  )
}

export default CartWidget