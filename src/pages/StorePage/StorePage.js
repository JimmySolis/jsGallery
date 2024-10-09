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
  const [shirts, setShirts] = useState([]);
  const [phones, setPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // State for cycling banner
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerImages = [
    'https://firebasestorage.googleapis.com/v0/b/js-and-jg-database.appspot.com/o/store%2FBanner%2FAssetsBlue.png?alt=media&token=9ddbf6a8-0893-4f9c-a282-853964edaa67',
    'https://firebasestorage.googleapis.com/v0/b/js-and-jg-database.appspot.com/o/store%2FBanner%2FAssetsGreen.png?alt=media&token=c554e90e-5a83-41e5-b319-c4d46be2b91f',
    'https://firebasestorage.googleapis.com/v0/b/js-and-jg-database.appspot.com/o/store%2FBanner%2FAssetsRed.png?alt=media&token=1e8ed555-0af2-4284-b053-816f4c41d8d5',
    'https://firebasestorage.googleapis.com/v0/b/js-and-jg-database.appspot.com/o/store%2FBanner%2FAssetsYellow.png?alt=media&token=eb2d2a5d-a923-4417-b0b7-7745bbf5b375'
  ];

  // State for cycling title images
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titleImages = [
    'https://firebasestorage.googleapis.com/v0/b/js-and-jg-database.appspot.com/o/store%2FBanner%2FtitleBlue.webp?alt=media&token=3b01ed80-0780-4c94-acb5-206628f5ecdb',
    'https://firebasestorage.googleapis.com/v0/b/js-and-jg-database.appspot.com/o/store%2FBanner%2FtitleGreen.webp?alt=media&token=849ca86c-2d1f-4612-bc91-5fc2452bedd9',
    'https://firebasestorage.googleapis.com/v0/b/js-and-jg-database.appspot.com/o/store%2FBanner%2FtitleRed.webp?alt=media&token=3d81c3b8-1592-4f8b-a552-ca0d4e11f983',
    'https://firebasestorage.googleapis.com/v0/b/js-and-jg-database.appspot.com/o/store%2FBanner%2FtitleYellow.webp?alt=media&token=2e23084d-2c9b-4441-bae8-67769526721b'
  ];

  useEffect(() => {
    // Cycle through banner images every 3 seconds
    const intervalBanner = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 1000); // Change image every 6 seconds

    return () => clearInterval(intervalBanner); // Clear interval on component unmount
  }, [bannerImages.length]);

  useEffect(() => {
    // Cycle through title images every 3 seconds
    const intervalTitle = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titleImages.length);
    }, 1000); // Change image every 6 seconds

    return () => clearInterval(intervalTitle); // Clear interval on component unmount
  }, [titleImages.length]);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(true);
    }, 500);

    const fetchProducts = async () => {
      try {
        const walletsCollection = collection(db, "wallet");
        const walletsSnapshot = await getDocs(walletsCollection);
        const walletsList = await Promise.all(walletsSnapshot.docs.map(async doc => {
          const data = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, data.image));
          return { id: doc.id, ...data, imageUrl };
        }));
        setWallets(walletsList);

        const shirtsCollection = collection(db, "shirt");
        const shirtsSnapshot = await getDocs(shirtsCollection);
        const shirtsList = await Promise.all(shirtsSnapshot.docs.map(async doc => {
          const data = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, data.image));
          return { id: doc.id, ...data, imageUrl };
        }));
        setShirts(shirtsList);

        const phonesCollection = collection(db, "phone");
        const phonesSnapshot = await getDocs(phonesCollection);
        const phonesList = await Promise.all(phonesSnapshot.docs.map(async doc => {
          const data = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, data.image));
          return { id: doc.id, ...data, imageUrl };
        }));
        setPhones(phonesList);

        setShowContent(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
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
            <img
              src={bannerImages[currentBannerIndex]}
              alt="Banner"
              className="banner-image"
            />
          </header>

          {/* Title with cycling images */}
          <h1 className={`store-title ${showContent ? 'fade-in' : ''}`}>
            <img src={titleImages[currentTitleIndex]} alt="Store Title" />
          </h1>

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

            {phones.map(phone => (
              <Link to={`/product/${phone.id}`} key={phone.id} className="product-card">
                <img src={phone.imageUrl} alt={phone.name} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StorePage;
