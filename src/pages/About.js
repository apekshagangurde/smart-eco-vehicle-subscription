import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Smart Eco</h1>
      <p className="about-description">
        Welcome to Smart Eco! We are committed to providing eco-friendly transportation solutions for the modern world.
        Our mission is to make sustainable vehicles accessible and promote greener lifestyles.
      </p>
      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          We envision a future where environmentally friendly transportation is available to everyone, reducing pollution and
          enhancing urban living.
        </p>
      </div>
      <div className="about-section">
        <h2>Our Team</h2>
        <p>
          Our team consists of passionate engineers, designers, and visionaries dedicated to creating innovative solutions
          that are both efficient and sustainable.
        </p>
      </div>
      <div className="about-section">
        <h2>Contact Us</h2>
        <p>Email: contact@smarteco.com</p>
        <p>Phone: +1 234-567-890</p>
      </div>
    </div>
  );
};

export default About;
