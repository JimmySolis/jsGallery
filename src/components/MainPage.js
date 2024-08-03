// src/components/MainPage.js
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  return (
    <div className="main-page">
      <h1 className="title">Jimmy Solis</h1>
      <nav>
        <ul>
          <li><Link to="/collection/foundation">Foundation</Link></li>
          <li><Link to="/collection/blackout">BlackOut</Link></li>
          <li><Link to="/collection/not-released">Not Released</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default MainPage;
