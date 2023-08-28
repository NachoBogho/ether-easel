import { createContext, useEffect, useState } from "react";
import { db } from '../main';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export const CartContext = createContext();

const starterCart = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {

  const [carrito, setCarrito] = useState(starterCart);
  const [availableStocks, setAvailableStocks] = useState({});

  const addCart = (item, quantity) => {
    const itemAdd = { ...item, quantity };
    console.log(itemAdd)

    const newCart = [...carrito];
    
    const carritoFind = newCart.find((prod) => prod.id === itemAdd.id);

    if (carritoFind) {
      carritoFind.quantity += quantity;
    } else {
      newCart.push(itemAdd);
    }
    setCarrito(newCart);
  };

  const cartNumber = () => {
    return carrito.reduce((acc, prod) => acc + prod.quantity, 0);
  };

  const totalPrice = () => {
    return carrito.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
  };

  const deleteCart = () => {
    setCarrito([]);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const decreaseQuantity = (itemId) => {
    const updatedCart = carrito.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return null;
      }
      return item;
    }).filter((item) => item !== null); 
    setCarrito(updatedCart);
  };

  const removeOneFromCartAndUpdateStock = async (itemId) => {
    const itemToRemove = carrito.find(cartItem => cartItem.id === itemId);
  
    if (itemToRemove && itemToRemove.quantity > 1) {
      const newCart = carrito.map(cartItem => {
        if (cartItem.id === itemId) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });
      setCarrito(newCart);
  
      const docRef = doc(db, 'NFT', itemId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const currentStock = docSnap.data().stock;
        const newStock = currentStock - 1 + 1; 
        await updateDoc(docRef, { stock: newStock });
      }
      
    } else if (itemToRemove) {
      const docRef = doc(db, 'NFT', itemId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const currentStock = docSnap.data().stock;
        const updatedStock = currentStock + itemToRemove.quantity; 
        await updateDoc(docRef, { stock: updatedStock });
      }
  
     
      const newCart = carrito.filter(cartItem => cartItem.id !== itemId);
      setCarrito(newCart);
    }
  };
  

  const calculateAvailableStock = (itemId, initialStock) => {
  const itemInCart = carrito.find(cartItem => cartItem.id === itemId);
  const reservedStock = itemInCart ? itemInCart.quantity : 0;
  return initialStock - reservedStock;
};

  useEffect(() => {
    const fetchAvailableStocks = async () => {
      const availableStocksData = {};
      for (const cartItem of carrito) {
        const docRef = doc(db, 'NFT', cartItem.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          availableStocksData[cartItem.id] = docSnap.data().stock - cartItem.quantity;
        }
      }
      setAvailableStocks(availableStocksData);
    };
    fetchAvailableStocks();
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        addCart,
        cartNumber,
        totalPrice,
        deleteCart,
        decreaseQuantity,
        removeOneFromCartAndUpdateStock,
        calculateAvailableStock,
        availableStocks
      }}
    >
      {children}
    </CartContext.Provider>
  );
};