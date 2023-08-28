import React, { useContext, useState, useEffect } from 'react';
import './ItemDetail.css';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import { db } from '../../main';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ItemDetail = ({ item }) => {
  const { addCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const { carrito, calculateAvailableStock } = useContext(CartContext);
  const carritoProduct = carrito.find((cartItem) => cartItem.id === item.id);

  const [initialStock, setInitialStock] = useState(0);

  useEffect(() => {
    const fetchStock = async () => {
      const docRef = doc(db, 'NFT', item.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setInitialStock(docSnap.data().stock);
      }
    };
    fetchStock();
  }, [item.id]);

  const availableStock = carritoProduct
    ? initialStock - carritoProduct.quantity
    : initialStock;

  const restar = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const sumar = () => {
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
    }
  };

  const addToCart = async () => {
    if (quantity <= availableStock && quantity > 0) {
      addCart(item, quantity);
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
          <p>Stock: {availableStock >= 0 ? availableStock : 0}</p>
        </div>
        <p>{item.description}</p>
        <ItemCount number={quantity} restar={restar} sumar={sumar} />
        <div className='submitButton'>
          <Link to='/store' className='buttonConfig'>
            Back to Store
          </Link>
          <button className='buttonConfig' onClick={addToCart}>
            Add to Cart
          </button>
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
