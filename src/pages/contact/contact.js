import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';

const Contact = () => {
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generatePositions = () => {
      const numElements = 100; // Increase the number of replications
      const newPositions = [];

      for (let i = 0; i < numElements; i++) {
        const x = Math.random() * 100; // Random horizontal position (0-100%)
        const y = Math.random() * 100; // Random vertical position (0-100%)
        newPositions.push({ x, y });
      }

      setPositions(newPositions);
    };

    generatePositions();
  }, []);

  return (
    <div className="container">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="scattered-text"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
          }}
        >
          jimmysolis14@gmail.com
        </div>
      ))}
      <button className="back-button" onClick={() => navigate('/')}>
        Go Back Home
      </button>
    </div>
  );
};

export default Contact;
