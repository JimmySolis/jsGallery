import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../components/cartContext/cartContext'; // Import the custom hook
import './cartPage.css';

// Import your PNG image
import homeButtonImage from '../../assets/logo/skull.PNG'; // Adjust the path

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-page">
      <header className="header">
        {/* Home Button */}
        <Link to="/store" className="home-button">
          <img src={homeButtonImage} alt="Home" />
        </Link>
        <h1>Your Cart</h1>
      </header>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item"> {/* Use item.id for key */}
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button> {/* Remove by item.id */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
