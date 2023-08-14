import React, { useContext, useState } from 'react';
import './ItemDetail.css';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';

const ItemDetail = ({ item }) => {
  const { carrito, addCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const restar = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const sumar = () => {
    if (quantity < item.stock) {
      setQuantity(quantity + 1);
    }
  };

  const addToCart = () => {
    if (quantity <= item.stock && quantity > 0) {
      addCart(item, quantity);
      item.stock -= quantity; 
      setQuantity(1); 
    } else if (quantity === 0) {
      alert('La cantidad no puede ser cero.');
    } else {
      alert('No hay suficiente stock para esa cantidad.');
    }
  };

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
        <ItemCount number={quantity} restar={restar} sumar={sumar} />
        <div className='submitButton'>
          <Link to='/store' className='buttonConfig'>
            Back to Store
          </Link>
          <Link className='buttonConfig' onClick={addToCart}>
            Add to Cart
          </Link>
          <Link to='/cart' className='buttonConfig'>
            Go to Cart
          </Link>
        </div>
      </div>
      <img className='detailImg' src={item.image} alt='' />
    </div>
  );
};

export default ItemDetail;
