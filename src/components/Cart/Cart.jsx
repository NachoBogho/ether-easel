import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { carrito, totalPrice, deleteCart, decreaseQuantity } = useContext(CartContext);

    const removeItem = (itemId) => {
        decreaseQuantity(itemId);
    };

    return (
        <div className='cartDisplay'>
            {carrito.length > 0 ? <h2>Your Putchase</h2>: <></>}
            {carrito.map((prod) => (
                <div className='cartItemDisplay' key={prod.id}>
                    <img src={prod.image} alt="" />
                    <h2 className='prodChar2'>{prod.name}</h2>
                    <p className='prodChar'>Category: {prod.category}</p>
                    <p className='prodChar'>Price: {prod.price} ETH</p>
                    <p className='prodChar'>Amount: {prod.quantity}</p>
                    <p className='prodChar'>Total: {prod.price * prod.quantity} ETH</p>
                    <p className='prodChar' onClick={() => removeItem(prod.id)}><i className='bi bi-trash3'></i></p>
                </div>
            ))
            }
            { carrito.length > 0 ? <div className='displayFlexC'>
                <h2>Total: {totalPrice()} ETH</h2>
                    <div className='displayButtonCart'>
                        <button className="buttonCart" onClick={deleteCart}>Vaciar carrito</button>
                        <Link to='/store'><button className="buttonCart">Continue Shopping</button></Link>
                        <Link to='/pay'><button className="buttonCart">Go Pay</button></Link>
                    </div>
                </div>
            : <Link className='messageStore' to='/store'>Your cart is empty <br /> Go to the <span className='colorSpan'>STORE</span> to continue </Link>
            }
            
        </div>
    );
}

export default Cart;
