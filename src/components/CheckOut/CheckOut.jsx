import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../main';
import './CheckOut.css';
import { Link } from 'react-router-dom';

const CheckOut = () => {
  const { carrito, totalPrice, deleteCart } = useContext(CartContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formattedCreditCardNumber, setFormattedCreditCardNumber] = useState('');
  const [orderId, setOrderId] = useState("")

  const onSubmit = (data) => {
    const order = {
      client: data,
      products: carrito,
      total: totalPrice(),
    }
    const getOrder = collection(db, "orders");
    addDoc(getOrder, order)
      .then((doc) => {
        setOrderId(doc.id);
        deleteCart();
      })

  };



  const handleCreditCardNumberChange = (event) => {
    const inputValue = event.target.value;
    const cleanedValue = inputValue.replace(/[-\D]/g, '');
    const formattedValue = cleanedValue.replace(/(.{4})/g, '$1-');
    setFormattedCreditCardNumber(formattedValue.slice(0, 19));
  };
  
  if (orderId){
     return (
      <div className='displayOrder'>
        <h2 className='messageStore'>Thanks for your purchase! <br /> Your order number is <span className='colorSpan'>{orderId}</span> </h2>
        <Link to='/'><button className="goHome" type="submit">Go Home</button></Link>
      </div>
        
     )

  }

  return (
    <div className="containerPay">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <h3 className="title">Dirección de Facturación</h3>
            <div className="inputBox">
              <span>Nombre completo :</span>
              <input {...register('fullName', { required: true })} type="text" placeholder="John Doe" />
              {errors.fullName && <span className="error">Se requiere el nombre completo</span>}
            </div>
            <div className="inputBox">
              <span>Correo electrónico :</span>
              <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="ejemplo@ejemplo.com" />
              {errors.email && <span className="error">Se requiere un correo electrónico válido</span>}
            </div>
            <div className="inputBox">
              <span>Dirección :</span>
              <input {...register('address', { required: true })} type="text" placeholder="1375 Broadway" />
              {errors.address && <span className="error">Se requiere la dirección</span>}
            </div>
            <div className="inputBox">
              <span>Ciudad :</span>
              <input {...register('city', { required: true })} type="text" placeholder="Nueva York" />
              {errors.city && <span className="error">Se requiere la ciudad</span>}
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>Estado :</span>
                <input {...register('state', { required: true })} type="text" placeholder="Estados Unidos" />
                {errors.state && <span className="error">Se requiere el estado</span>}
              </div>
              <div className="inputBox">
                <span>Código postal :</span>
                <input {...register('zipCode', { required: true })} type="text" placeholder="10013" />
                {errors.zipCode && <span className="error">Se requiere el código postal</span>}
              </div>
            </div>
          </div>

          <div className="col">
            <h3 className="title"><span className="orangeColor fontBold">Pago</span></h3>
            <div className="inputBox">
              <span>Tarjetas aceptadas :</span>
              <img src="../../../public/img/CheckOutImg/card_img.png" alt="" />
            </div>
            <div className="inputBox">
              <span>Nombre en la tarjeta :</span>
              <input {...register('nameOnCard', { required: true })} type="text" placeholder="John David Doe" />
              {errors.nameOnCard && <span className="error">Se requiere el nombre en la tarjeta</span>}
            </div>
            <div className="inputBox">
              <span>Número de tarjeta de crédito :</span>
              <input
                {...register('creditCardNumber', { required: true, pattern: /^\d{4}-\d{4}-\d{4}-\d{4}$/ })}
                type="text"
                placeholder="1111-2222-3333-4444"
                value={formattedCreditCardNumber}
                onChange={handleCreditCardNumberChange}
              />
              {errors.creditCardNumber && (
                <span className="error">Ingrese un número de tarjeta válido (ej. 1111-2222-3333-4444)</span>
              )}
            </div>
            <div className="inputBox">
              <span>Mes de expiración :</span>
              <input {...register('expMonth', { required: true })} type="text" placeholder="Enero" />
              {errors.expMonth && <span className="error">Se requiere el mes de expiración</span>}
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>Año de expiración :</span>
                <input {...register('expYear', { required: true, pattern: /^(19|20)\d{2}$/ })} type="text" placeholder="2023" />
                {errors.expYear && <span className="error">Ingrese un año de expiración válido (ej. 2023)</span>}
              </div>
              <div className="inputBox">
                <span>CVV :</span>
                <input {...register('cvv', { required: true })} type="text" placeholder="1234" />
                {errors.cvv && <span className="error">Se requiere el CVV</span>}
              </div>
            </div>
          </div>
        </div>
        <button className="FinishBuy" type="submit">Realizar Pago</button>
      </form>




    </div>
    
  );
}

export default CheckOut;
