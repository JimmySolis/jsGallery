import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.PNG'; // Ensure this path is correct
import './LandingPage.css'; // Ensure this path is correct

function LandingPage() {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger fade-in effect when the component mounts
    const fadeInTimer = setTimeout(() => {
      setFadeIn(true);
    }, 150); // Delay to ensure fade-in starts after component mounts

    return () => clearTimeout(fadeInTimer);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`landing-page ${fadeIn ? 'fade-in' : ''}`}>
      <img
        src={logo}
        alt="Logo"
        className={`logo ${fadeIn ? 'fade-in' : ''}`}
      />
      <div className={`navigation-buttons ${fadeIn ? 'fade-in' : ''}`}>
        <button onClick={() => handleNavigation('/gallery')}>Gallery</button>
        <button onClick={() => handleNavigation('/store')}>Store</button>
        <button onClick={() => handleNavigation('/prints')}>Prints</button>
      </div>
    </div>
  );
}

export default LandingPage;
