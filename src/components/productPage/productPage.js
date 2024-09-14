import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { db, storage } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import './productPage.css';

// Import your PNG image
import homeButtonImage from '../../assets/logo/skull.PNG'; // Adjust the path

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Simulate the delay for the homepage button to appear
    setTimeout(() => {
      setShowLoading(true);
    }, 500); // Adjust the delay as needed

    const fetchProduct = async () => {
      try {
        const walletDoc = doc(db, "wallet", id);
        const shirtDoc = doc(db, "shirt", id);
        const phoneDoc = doc(db, "phone", id); // New reference for phone
        
        // Check if the product is in the wallet collection
        let productSnapshot = await getDoc(walletDoc);
        if (!productSnapshot.exists()) {
          // If not found, check the shirt collection
          productSnapshot = await getDoc(shirtDoc);
        }
        if (!productSnapshot.exists()) {
          // If not found, check the phone collection
          productSnapshot = await getDoc(phoneDoc);
        }
        
        if (productSnapshot.exists()) {
          const data = productSnapshot.data();
          const imageUrl = await getDownloadURL(ref(storage, data.image));
          setProduct({ ...data, imageUrl });
        } else {
          console.error("No such product!");
        }
        setShowContent(true); // Trigger content visibility after data fetch
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product-page">
      {/* Header */}
      <header className="header">
        <Link to="/store" className="home-button"> {/* Link to store page */}
          <img src={homeButtonImage} alt="Home" />
        </Link>
        <h1>{'Product Details'}</h1>
      </header>
      
      {/* Loading Message */}
      {showLoading && isLoading && (
        <div className="loading">Loading...</div>
      )}
      
      {/* Product Details */}
      {!isLoading && product && (
        <div className="product-container">
          <div
            className="product-image"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          />
          <div className="product-details">
            <h1 className='product-name'>{product.name}</h1>
            <h2 className='product-price'>${product.price}</h2>
            <p>{product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
