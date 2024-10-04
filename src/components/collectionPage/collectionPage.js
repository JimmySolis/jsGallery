import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './collectionPage.css'; // Import the CSS file
import { storage } from '../../firebase/firebase'; // Import the Firebase storage instance
import { ref, getDownloadURL } from "firebase/storage"; // Import ref and getDownloadURL

// Helper function to get the file name with the first letter capitalized
const getFileName = (filePath) => {
  const parts = filePath.split('/');
  const fileName = parts.pop().split('.')[0]; // Get the last part and remove the extension
  return fileName.charAt(0).toUpperCase() + fileName.slice(1); // Capitalize the first letter
};

// Define the details for each painting
const paintingDetails = {
  rome: { size: "3x4ft", medium: "Oil on Canvas" },
  citation: { size: "3x4ft", medium: "Oil on Canvas" },
  galaxy: { size: "4x5ft", medium: "Oil on Canvas" },
  paranoia: { size: "4x5ft", medium: "Oil on Canvas" },
  elegant: { size: "4x5ft", medium: "Acrylic on Canvas" },
  meditation: { size: "4x5ft", medium: "Acrylic on Canvas" },
  salvador: { size: "4x5ft", medium: "Acrylic on Canvas" },
  tauro: { size: "4x5ft", medium: "Acrylic on Canvas" },
  gloria: { size: "4x5ft", medium: "Acrylic on Canvas" },
  nightbubble: { size: "4x5ft", medium: "Acrylic on Canvas" },
  romeo: { size: "4x5ft", medium: "Acrylic on Canvas" },
  cochinita: { size: "4x5ft", medium: "Acrylic on Canvas" },
  banana: { size: "4x5ft", medium: "Acrylic on Canvas" },
  cash: { size: "4x5ft", medium: "Acrylic on Canvas" },
  vhs: { size: "4x5ft", medium: "Acrylic on Canvas" }
};

const collections = {
  foundation: [
    { webp: 'galleryPhotos/foundation/rome.webp', png: 'galleryPhotos/foundation/rome.png' },
    { webp: 'galleryPhotos/foundation/citation.webp', png: 'galleryPhotos/foundation/citation.png' },
    { webp: 'galleryPhotos/foundation/galaxy.webp', png: 'galleryPhotos/foundation/galaxy.png' },
    { webp: 'galleryPhotos/foundation/paranoia.webp', png: 'galleryPhotos/foundation/paranoia.png' }
  ],
  blackout: [
    { webp: 'galleryPhotos/blackout/romeo.webp', png: 'galleryPhotos/blackout/romeo.png' },
    { webp: 'galleryPhotos/blackout/elegant.webp', png: 'galleryPhotos/blackout/elegant.png' },
    { webp: 'galleryPhotos/blackout/meditation.webp', png: 'galleryPhotos/blackout/meditation.png' },
    { webp: 'galleryPhotos/blackout/salvador.webp', png: 'galleryPhotos/blackout/salvador.png' },
    { webp: 'galleryPhotos/blackout/tauro.webp', png: 'galleryPhotos/blackout/tauro.png'},
    { webp: 'galleryPhotos/blackout/gloria.webp', png: 'galleryPhotos/blackout/gloria.png' },
    { webp: 'galleryPhotos/blackout/cochinita.webp', png: 'galleryPhotos/blackout/cochinita.png' }
  ],
  AmPm: [
    { webp: 'galleryPhotos/ampm/night-bubble.webp', png: 'galleryPhotos/ampm/night-bubble.png' },
    { webp: 'galleryPhotos/ampm/Banana.webp', png: 'galleryPhotos/ampm/galleryPhotos/ampm/Banana.png' },
    { webp: 'galleryPhotos/ampm/Cash.webp', png: 'galleryPhotos/ampm/Cash.png' },
    { webp: 'galleryPhotos/ampm/VHS.webp', png: 'galleryPhotos/ampm/VHS.png' },
  ],
  'not-released': [],
};

function CollectionPage() {
  const { name } = useParams();
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionImages = collections[name] || [];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await Promise.all(collectionImages.map(async (image) => {
          const imageRef = ref(storage, image.webp); // Create a reference to the file
          const url = await getDownloadURL(imageRef); // Fetch the download URL

          // Preload the image to avoid flickering
          const img = new Image();
          img.src = url;

          return url;
        }));

        setPaintings(urls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images from Firebase:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [name, collectionImages]);

  return (
    <div className="collection-page">
      <header className="page-header">
        <Link to="/gallery" className="home-link">Jimmy Solis</Link>
      </header>
      <Carousel
        swipeable
        emulateTouch
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        renderIndicator={(onClickHandler, isSelected, index) => (
          <li
            style={{ background: isSelected ? '#000' : '#fff' }}
            onClick={onClickHandler}
            key={index}
          />
        )}
      >
        {loading ? (
          <div className="loading-placeholder">Loading images...</div>
        ) : (
          paintings.map((url, index) => {
            const title = getFileName(collectionImages[index].webp);
            const details = paintingDetails[title.toLowerCase()] || { size: 'Unknown', medium: 'Unknown' };

            return (
              <div key={index} className="carousel-item">
                <div className="image-container">
                  <picture>
                    <source srcSet={url.replace('.png', '.webp')} type="image/webp" />
                    <img src={url} alt={title} loading="lazy" />
                  </picture>
                  <div className="image-title">{title}</div>
                  <div className="image-info">
                    <p><strong>Size:</strong> {details.size}</p>
                    <p><strong>Medium:</strong> {details.medium}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </Carousel>
    </div>
  );
}

export default CollectionPage;
