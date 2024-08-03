import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/logo.PNG'; // Ensure this path is correct
import './LandingPage.css'; // Ensure this path is correct

function LandingPage() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Initial fade-in effect
    const fadeInDuration = 500; // 0.5 seconds
    const stayDuration = 500; // 3 seconds
    const fadeOutDuration = 1000; // 1 second

    // Set the fade-out state after the stay duration
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
      // Navigate to the main page after the fade-out duration
      const navigateTimer = setTimeout(() => {
        navigate('/main');
      }, fadeOutDuration);

      return () => clearTimeout(navigateTimer);
    }, stayDuration);

    return () => clearTimeout(fadeOutTimer);
  }, [navigate]);

  return (
    <div className={`landing-page ${fadeOut ? 'fade-out' : ''}`}>
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default LandingPage;
