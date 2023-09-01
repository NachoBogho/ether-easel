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
  
  if (orderId) {
    return (
      <div className='displayOrder'>
        <h2 className='messageStore'>Thanks for your purchase! <br /> Your order number is <span className='colorSpan'>{orderId}</span> </h2>
        <Link to='/'><button className="goHome" type="submit">Go Home</button></Link>
      </div>
    );
  }
  
  return (
    <div className="containerPay">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <h3 className="title">Billing Address</h3>
            <div className="inputBox">
              <span>Full Name:</span>
              <input {...register('fullName', { required: true })} type="text" placeholder="John Doe" />
              {errors.fullName && <span className="error">Full name is required</span>}
            </div>
            <div className="inputBox">
              <span>Email:</span>
              <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="example@example.com" />
              {errors.email && <span className="error">A valid email is required</span>}
            </div>
            <div className="inputBox">
              <span>Address:</span>
              <input {...register('address', { required: true })} type="text" placeholder="1375 Broadway" />
              {errors.address && <span className="error">Address is required</span>}
            </div>
            <div className="inputBox">
              <span>City:</span>
              <input {...register('city', { required: true })} type="text" placeholder="New York" />
              {errors.city && <span className="error">City is required</span>}
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>State:</span>
                <input {...register('state', { required: true })} type="text" placeholder="United States" />
                {errors.state && <span className="error">State is required</span>}
              </div>
              <div className="inputBox">
                <span>Zip Code:</span>
                <input {...register('zipCode', { required: true })} type="text" placeholder="10013" />
                {errors.zipCode && <span className="error">Zip code is required</span>}
              </div>
            </div>
          </div>
  
          <div className="col">
            <h3 className="title"><span className="orangeColor fontBold">Payment</span></h3>
            <div className="inputBox">
              <span>Accepted Cards:</span>
              <img src="../../../public/img/CheckOutImg/card_img.png" alt="" />
            </div>
            <div className="inputBox">
              <span>Name on Card:</span>
              <input {...register('nameOnCard', { required: true })} type="text" placeholder="John David Doe" />
              {errors.nameOnCard && <span className="error">Name on card is required</span>}
            </div>
            <div className="inputBox">
              <span>Credit Card Number:</span>
              <input
                {...register('creditCardNumber', { required: true, pattern: /^\d{4}-\d{4}-\d{4}-\d{4}$/ })}
                type="text"
                placeholder="1111-2222-3333-4444"
                value={formattedCreditCardNumber}
                onChange={handleCreditCardNumberChange}
              />
              {errors.creditCardNumber && (
                <span className="error">Enter a valid card number (e.g., 1111-2222-3333-4444)</span>
              )}
            </div>
            <div className="inputBox">
              <span>Expiration Month:</span>
              <input {...register('expMonth', { required: true })} type="text" placeholder="January" />
              {errors.expMonth && <span className="error">Expiration month is required</span>}
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>Expiration Year:</span>
                <input {...register('expYear', { required: true, pattern: /^(19|20)\d{2}$/ })} type="text" placeholder="2023" />
                {errors.expYear && <span className="error">Enter a valid expiration year (e.g., 2023)</span>}
              </div>
              <div className="inputBox">
                <span>CVV:</span>
                <input {...register('cvv', { required: true })} type="text" placeholder="1234" />
                {errors.cvv && <span className="error">CVV is required</span>}
              </div>
            </div>
          </div>
        </div>
        <button className="FinishBuy" type="submit">Complete Payment</button>
      </form>
    </div>
  );
  }
  
  export default CheckOut
