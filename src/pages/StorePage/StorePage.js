import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db, storage } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import './StorePage.css';

const StorePage = () => {
  const [wallets, setWallets] = useState([]);
  
  useEffect(() => {
    const fetchWallets = async () => {
      const walletsCollection = collection(db, "wallet"); // Adjust collection name
      const walletsSnapshot = await getDocs(walletsCollection);
      const walletsList = await Promise.all(walletsSnapshot.docs.map(async doc => {
        const data = doc.data();
        const imageUrl = await getDownloadURL(ref(storage, data.image)); // Assuming 'image' field
        return { id: doc.id, ...data, imageUrl };
      }));
      
      setWallets(walletsList);
    };

    fetchWallets();
  }, []);

  return (
    <div className="store-page">
      <header className="store-header">
        <img src="https://i.pinimg.com/originals/53/bd/f3/53bdf3c62c768c92df672bb06d97df90.gif" alt="Banner" className="banner-image" />
      </header>
      <h1 className="store-title">James Geovanny</h1>

      <div className="products-grid">
        {wallets.map(wallet => (
          <Link to={`/product/${wallet.id}`} key={wallet.id} className="product-card">
            <img src={wallet.imageUrl} alt={wallet.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
