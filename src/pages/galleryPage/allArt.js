import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../../firebase/firebase';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import './allArt.css';

function AllArtPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // To track loading progress
  const [error, setError] = useState(null); // To track error state

  useEffect(() => {
    const fetchAllArtworks = async () => {
      try {
        const allPhotosRef = ref(storage, 'galleryPhotos'); // Root folder containing all collections
        const allCollections = await listAll(allPhotosRef);

        let allImages = {};
        let totalImages = 0; // To keep track of the total number of images
        let loadedImages = 0; // To keep track of the number of images loaded

        // Iterate through subfolders
        for (const collection of allCollections.prefixes) {
          const collectionRef = ref(storage, collection.fullPath);
          const imagesList = await listAll(collectionRef);

          totalImages += imagesList.items.length; // Update total image count

          for (const item of imagesList.items) {
            const url = await getDownloadURL(item);
            const name = item.name.replace(/\.(webp|png)$/, ''); // Remove extension for matching

            if (!allImages[name] || item.name.endsWith('.webp')) {
              allImages[name] = { url, name: item.name };
            }

            // Update progress as each image loads
            loadedImages++;
            setProgress(Math.floor((loadedImages / totalImages) * 100));
          }
        }

        setArtworks(Object.values(allImages)); // Convert object to array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all artworks:", error);
        setError("Failed to load artworks. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllArtworks();
  }, []);

  // Determine progress bar color based on the progress percentage
  const getProgressBarColor = (progress) => {
    if (progress < 34) {
      return 'red'; // low progress
    } else if (progress < 67) {
      return 'blue'; // medium progress
    } else {
      return '#c68e17'; // yellow ochre for high progress
    }
  };

  return (
    <div className="all-art-page">
      <button className="cloud-toggle-button">
        <Link to="/gallery">Back to Collections</Link>
      </button>
      <h1 className="title">All Art</h1>
      {loading ? (
        <div className="loading-container">
          <p>Loading artworks...</p>
          {error && <p className="error-message">{error}</p>}
          <progress
            value={progress}
            max="100"
            className="loading-bar"
            style={{ backgroundColor: getProgressBarColor(progress) }}
          />
        </div>
      ) : (
        <div className="art-grid">
          {artworks.map((art, index) => (
            <img key={index} src={art.url} alt={art.name} className="art-image" loading="lazy" />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllArtPage;
