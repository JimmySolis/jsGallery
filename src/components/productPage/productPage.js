import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { db, storage } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useCart } from '../cartContext/cartContext.js';
import './productPage.css';

import homeButtonImage from '../../assets/logo/skull.PNG';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(true);
    }, 500);

    const fetchProduct = async () => {
      try {
        // Attempt to retrieve the product from various collections
        const collections = ["wallet", "shirt", "phone"];
        let productSnapshot = null;

        for (const collection of collections) {
          const docRef = doc(db, collection, id);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            productSnapshot = snapshot;
            break;
          }
        }

        if (productSnapshot) {
          const data = productSnapshot.data();
          const imageUrl = await getDownloadURL(ref(storage, data.image));

          setProduct({
            ...data,
            imageUrl,
            isReserved: data.status === 'in someone cart...',
            isSold: data.status === 'sold',
          });
          setShowContent(true);
        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      if (product.isSold) {
        alert("This product is already sold and unavailable.");
      } else if (product.isReserved) {
        alert("In someone else's cart. Hurry before they buy it!");
      } else {
        addToCart(product);
        alert(`${product.name} added to cart!`);
      }
    }
  };

  return (
    <div className="product-page">
      <header className="header">
        <Link to="/store" className="home-button">
          <img src={homeButtonImage} alt="Home" />
        </Link>
        <h1>Product Details</h1>
      </header>

      {showLoading && isLoading && <div className="loading">Loading...</div>}

      {!isLoading && product && (
        <div className="product-container">
          <div className="product-image" style={{ backgroundImage: `url(${product.imageUrl})` }} />
          <div className="product-details">
            <h1 className="product-name">{product.name}</h1>
            <h2 className="product-price">${product.price}</h2>
            <p>{product.description}</p>

            {product.isSold ? (
              <p className="sold-out">Sold Out</p>
            ) : (
              <button onClick={handleAddToCart} disabled={product.isReserved}>
                {product.isReserved ? "In someone else's cart. Hurry before they buy it!" : "Add to Cart"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
