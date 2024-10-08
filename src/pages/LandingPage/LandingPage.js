import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.PNG'; // Ensure this path is correct
import './landingPage.css'; // Ensure this path is correct

function LandingPage() {
  const [fadeIn, setFadeIn] = useState(false);
  const [slideLogoOut, setSlideLogoOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger fade-in effect when the component mounts
    const fadeInTimer = setTimeout(() => {
      setFadeIn(true);
    }, 150); // Delay to ensure fade-in starts after component mounts

    return () => clearTimeout(fadeInTimer);
  }, []);

  const handleNavigation = (path) => {
    if (path === '/store') {
      setSlideLogoOut(true); // Trigger logo slide-out animation
      setTimeout(() => navigate(path), 1500); // Delay navigation to allow the animation to complete
    } else {
      navigate(path);
    }
  };

  return (
    <div className={`landing-page ${fadeIn ? 'fade-in' : ''} ${slideLogoOut ? 'slide-logo-out' : ''}`}>
      <img
        src={logo}
        alt="Logo"
        className={`landing-logo ${fadeIn ? 'fade-in' : ''}`}
      />
      <div className={`navigation-buttons ${fadeIn ? 'fade-in' : ''}`}>
        <button onClick={() => handleNavigation('/gallery')} className='gallery-font'>Gallery</button>
        <button onClick={() => handleNavigation('/store')} className='store-font'>Store</button>
        <button onClick={() => handleNavigation('/contact')}>Contact</button>
      </div>
    </div>
  );
}

export default LandingPage;
