import { Link, useLocation } from 'react-router-dom';
import './collectionTitlePage.css';

function GalleryPage() {
  const location = useLocation();
  const isAllArtPage = location.pathname === '/all-art';

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
          <li><Link to="/collection/humanBolders">Human Bolders</Link></li>
          <li><Link to="/collection/foundation">Foundation</Link></li>
          <li><Link to="/collection/blackout">BlackOut</Link></li>
          <li><Link to="/collection/AmPm">Am/Pm</Link></li>
          <li><Link to="/collection/solos">Solos</Link></li>
        </ul>
      </nav>
      <button className="cloud-toggle-button">
        <Link to={isAllArtPage ? "/gallery" : "/all-art"}>
          {isAllArtPage ? "Back to Collections" : "View All Art"}
        </Link>
      </button>
    </div>
  );
}

export default GalleryPage;
