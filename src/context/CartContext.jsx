import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const starterCart = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(starterCart);

  const addCart = (item, quantity) => {
    const itemAdd = { ...item, quantity };

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
        // Remove the item from the cart if its quantity reaches 0
        return null;
      }
      return item;
    }).filter((item) => item !== null); // Filter out null items
    setCarrito(updatedCart);
  };

  const removeCartItem = (itemId) => {
    const removedItem = carrito.find((item) => item.id === itemId);
    if (removedItem) {
      const removedQuantity = removedItem.quantity;

      // Create a new array with the updated stock
      const updatedCarrito = carrito.map((item) => {
        if (item.id === itemId) {
          return { ...item, stock: item.stock + removedQuantity };
        }
        return item;
      });

      updateLocalStorage(updatedCarrito);
    }
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        addCart,
        cartNumber,
        totalPrice,
        deleteCart,
        decreaseQuantity,
        removeCartItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};