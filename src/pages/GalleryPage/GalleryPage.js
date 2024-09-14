// src/components/MainPage.js
import { Link } from 'react-router-dom';
import './galleryPage.css';

function GalleryPage() {
  return (
    <div className="gallery-page">
      <h1 className="title">
        <Link to="/" className="title-link">
          Jimmy Solis
        </Link>
      </h1>
      <h1 className="subTitle">Collections</h1>
      <nav>
        <ul>
          <li><Link to="/collection/foundation">Foundation</Link></li>
          <li><Link to="/collection/blackout">BlackOut</Link></li>
          <li><Link to="/collection/blackoutAmPM">Am/Pm</Link></li>
          <li><Link to="/collection/not-released">Not Released</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default GalleryPage;
