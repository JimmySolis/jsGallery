import React, { createContext, useContext, useState } from 'react';
import { db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add an item to the cart
  const addToCart = async (item) => {
    // Check if the item is a limited wallet
    if (item.type === 'wallet') {
      const itemRef = doc(db, 'wallets', item.id); // Ensure this matches your Firebase collection name
      try {
        const itemDoc = await getDoc(itemRef);
        if (itemDoc.exists()) {
          const itemStatus = itemDoc.data().status;

          if (itemStatus === 'available') {
            // Temporarily reserve the wallet by updating its status
            await updateDoc(itemRef, { status: 'in someone cart...' });

            // Check if item is already in cart based on customId
            setCartItems((prevItems) => {
              const existingItem = prevItems.find(cartItem => cartItem.customId === item.customId);
              if (existingItem) {
                alert(`${item.name} is already in your cart.`);
                return prevItems; // Return the previous state if item already exists
              }
              // Add the item to the cart if it doesn't exist
              return [...prevItems, { ...item, status: 'in someone cart...' }];
            });
          } else if (itemStatus === 'in someone cart...') {
            alert("This wallet is currently in someone else's cart. Hurry before they buy it!");
          } else {
            alert(`${item.name} is currently unavailable.`);
          }
        }
      } catch (error) {
        console.error("Error reserving item:", error);
      }
    } else {
      // If not a wallet or already exists in the cart, just add it
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(cartItem => cartItem.customId === item.customId);
        if (existingItem) {
          alert(`${item.name} is already in your cart.`);
          return prevItems; // Return the previous state if item already exists
        }
        // Add the item to the cart if it doesn't exist
        return [...prevItems, item];
      });
    }
  };

  // Remove an item from the cart by its ID
  const removeFromCart = async (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);

    if (itemToRemove) {
      if (itemToRemove.type === 'wallet') {
        const itemRef = doc(db, 'wallets', id);
        await updateDoc(itemRef, { status: 'available' });
      }
      setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    }
  };

  // Complete purchase and mark wallets as sold
  const checkout = async () => {
    const walletsToMarkSold = cartItems.filter(item => item.type === 'wallet');

    try {
      for (const wallet of walletsToMarkSold) {
        const walletRef = doc(db, 'wallets', wallet.id);
        await updateDoc(walletRef, { status: 'sold' });
      }

      // Clear the cart after checkout
      setCartItems([]);
      alert('Purchase completed successfully!');
    } catch (error) {
      console.error("Error during checkout:", error);
      alert('There was an error completing your purchase. Please try again.');
    }
  };

  // Clear the entire cart (optional functionality)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing the cart context
export const useCart = () => {
  return useContext(CartContext);
};
