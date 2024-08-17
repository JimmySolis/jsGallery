import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.js'; // Updated path
import GalleryPage from './pages/GalleryPage/GalleryPage.js'; // Ensure this path is correct
import CollectionPage from './components/CollectionPage.js'; // Correct path
import StorePage from './pages/StorePage/StorePage.js'; // Ensure this path is correct
import PrintsPage from './pages/PrintsPage/PrintsPage.js'; // Ensure this path is correct

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/collection/:name" element={<CollectionPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/prints" element={<PrintsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
