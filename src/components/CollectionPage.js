import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CollectionPage.css'; // Import the CSS file

// Importing images
import romeWebp from '../assets/images/foundation/rome.webp';
import romePng from '../assets/images/foundation/rome.png';
import citationWebp from '../assets/images/foundation/citation.webp';
import citationPng from '../assets/images/foundation/citation.png';
import galaxyWebp from '../assets/images/foundation/galaxy.webp';
import galaxytPng from '../assets/images/foundation/galaxy.png';
import paranoiaWebp from '../assets/images/foundation/paranoia.webp';
import paranoiaPng from '../assets/images/foundation/paranoia.png';

import elegantWebp from '../assets/images/blackout/elegant.webp';
import elegantPng from '../assets/images/blackout/elegant.png';
import meditationWebp from '../assets/images/blackout/meditation.webp';
import meditationPng from '../assets/images/blackout/meditation.png';
import salvadorWebp from '../assets/images/blackout/salvador.webp';
import salvadorPng from '../assets/images/blackout/salvador.png';
import tauroWebp from '../assets/images/blackout/tauro.webp';
import tauroPng from '../assets/images/blackout/tauro.png';
import gloriaWebp from '../assets/images/blackout/gloria.webp';
import gloriaPng from '../assets/images/blackout/gloria.png';
import nightBubbléWebp from '../assets/images/blackout/nightBubblé.webp';
import nightBubbléPng from '../assets/images/blackout/nightBubblé.png';
import romeoWebp from '../assets/images/blackout/romeo.webp';
import romeoPng from '../assets/images/blackout/romeo.png';
import cochinitaWebp from '../assets/images/blackout/cochinitaPiBiL.webp';
import cochinitaPng from '../assets/images/blackout/cochinitaPiBiL.png';

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
  nightbubblé: { size: "4x5ft", medium: "Acrylic on Canvas" },
  romeo: { size: "4x5ft", medium: "Acrylic on Canvas" },
  cochinitapibil: { size: "4x5ft", medium: "Acrylic on Canvas" }
};

const collections = {
  foundation: [
    { webp: romeWebp, png: romePng },
    { webp: citationWebp, png: citationPng },
    { webp: galaxyWebp, png: galaxytPng },
    { webp: paranoiaWebp, png: paranoiaPng }
  ],
  blackout: [
    { webp: romeoWebp, png: romeoPng },
    { webp: elegantWebp, png: elegantPng },
    { webp: nightBubbléWebp, png: nightBubbléPng },
    { webp: meditationWebp, png: meditationPng },
    { webp: salvadorWebp, png: salvadorPng },
    { webp: tauroWebp, png: tauroPng },
    { webp: gloriaWebp, png: gloriaPng },
    { webp: cochinitaWebp, png: cochinitaPng }
  ],
  'not-released': [],
};

function CollectionPage() {
  const { name } = useParams();
  const paintings = collections[name] || [];

  return (
    <div className="collection-page">
      <header className="page-header">
        <Link to="/" className="home-link">Jimmy Solis</Link>
      </header>
      <Carousel swipeable emulateTouch showThumbs={false} showStatus={false} showArrows={false}>
        {paintings.map((painting, index) => {
          // Dynamically get the title from the image file name
          const title = getFileName(painting.webp);
          const details = paintingDetails[title.toLowerCase()] || { size: 'Unknown', medium: 'Unknown' };

          return (
            <div key={index} className="carousel-item">
              <div className="image-container">
                <picture>
                  <source srcSet={painting.webp} type="image/webp" />
                  <img src={painting.png} alt={title} loading="lazy" />
                </picture>
                <div className="image-title">{title}</div>
                <div className="image-info">
                  <p><strong>Size:</strong> {details.size}</p>
                  <p><strong>Medium:</strong> {details.medium}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CollectionPage;
