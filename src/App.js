import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage.js'; // Updated path
import GalleryPage from './pages/galleryPage/galleryPage.js'; // Ensure this path is correct
import CollectionPage from './components/collectionPage/collectionPage.js'; // Correct path
import StorePage from './pages/storePage/storePage.js'; // Ensure this path is correct
import PrintsPage from './pages/printsPage/printsPage.js'; // Ensure this path is correct
import ProductPage from './components/productPage/productPage.js';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/collection/:name" element={<CollectionPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/prints" element={<PrintsPage />} />
        <Route path="/product/:id" element={<ProductPage />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
