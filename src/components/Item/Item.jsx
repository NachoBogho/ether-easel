import React, { useContext } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; 

const Item = ({ product }) => {
  const { carrito } = useContext(CartContext); // Obtén el carrito desde el contexto

  // Encuentra el producto correspondiente en el carrito
  const carritoProduct = carrito.find((item) => item.id === product.id);

  // Calcula el stock restante en base al stock de la base de datos y la cantidad en el carrito
  const remainingStock = carritoProduct
    ? product.stock - carritoProduct.quantity
    : product.stock;

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
          <p>Stock: {remainingStock >= 0 ? remainingStock : 0}</p> 
        </div>
        <Link to={`/item/${product.id}`} className="buttonConfig">View Details</Link>
      </div>
    </div>
  );
}

export default Item;
