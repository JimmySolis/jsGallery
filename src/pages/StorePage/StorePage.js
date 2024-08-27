import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db, storage } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import './storePage.css';

// Import your PNG image
import homeButtonImage from '../../assets/logo/logo.PNG'; // Adjust the path

const StorePage = () => {
  const [wallets, setWallets] = useState([]);
  const [shirts, setShirts] = useState([]); // New state for shirts
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [showContent, setShowContent] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // New state for loading message visibility

  useEffect(() => {
    // Show loading message after homepage button is displayed
    setTimeout(() => {
      setShowLoading(true);
    }, 500); // Adjust the delay as needed

    const fetchWalletsAndShirts = async () => {
      try {
        // Fetch wallets
        const walletsCollection = collection(db, "wallet");
        const walletsSnapshot = await getDocs(walletsCollection);
        const walletsList = await Promise.all(walletsSnapshot.docs.map(async doc => {
          const data = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, data.image));
          return { id: doc.id, ...data, imageUrl };
        }));

        setWallets(walletsList);

        // Fetch shirts
        const shirtsCollection = collection(db, "shirt");
        const shirtsSnapshot = await getDocs(shirtsCollection);
        const shirtsList = await Promise.all(shirtsSnapshot.docs.map(async doc => {
          const data = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, data.image));
          return { id: doc.id, ...data, imageUrl };
        }));

        setShirts(shirtsList);

        setShowContent(true); // Trigger content visibility after data fetch
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchWalletsAndShirts();
  }, []);

  return (
    <div className="store-page">
      {/* Homepage Button */}
      <Link to="/" className="home-button">
        <img src={homeButtonImage} alt="Home" />
      </Link>
      
      {/* Loading Message */}
      {showLoading && isLoading && (
        <div className="loading">Loading...</div>
      )}
      
      {/* Render the rest of the content after loading */}
      {!isLoading && (
        <>
          <header className="store-header">
            <img src="https://i.pinimg.com/originals/53/bd/f3/53bdf3c62c768c92df672bb06d97df90.gif" alt="Banner" className="banner-image" />
          </header>
          
          <h1 className={`store-title ${showContent ? 'fade-in' : ''}`}>James Geovanny</h1>
          
          <div className={`products-grid ${showContent ? 'fade-in' : ''}`}>
            {wallets.map(wallet => (
              <Link to={`/product/${wallet.id}`} key={wallet.id} className="product-card">
                <img src={wallet.imageUrl} alt={wallet.name} />
              </Link>
            ))}

            {shirts.map(shirt => (
              <Link to={`/product/${shirt.id}`} key={shirt.id} className="product-card">
                <img src={shirt.imageUrl} alt={shirt.name} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StorePage;
