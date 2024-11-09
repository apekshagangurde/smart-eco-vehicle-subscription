// src/components/HeroSection.js
import React from 'react';
import { FaCar } from 'react-icons/fa'; // Import Font Awesome car icon
import './HeroSection.css'; // Import the CSS file for styling

const HeroSection = () => (
   <div className="hero">
      <div className="hero-content">
         <FaCar className="hero-logo" /> {/* Font Awesome Logo */}
         <h1>Welcome to Smart Eco-Friendly Vehicle Subscription</h1>
         <p>Flexible, eco-friendly vehicle plans with AI assistance for smarter driving.</p>
         <button className="explore-btn">Explore Vehicles</button>
      </div>
   </div>
);

export default HeroSection;
