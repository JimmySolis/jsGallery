// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage';
import CollectionPage from './components/CollectionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/collection/:name" element={<CollectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
