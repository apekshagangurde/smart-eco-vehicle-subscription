// src/components/Footer.js
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import Font Awesome icons
import './Footer.css'; // Import the CSS file for styling

const Footer = () => (
   <footer className="footer">
      <div className="footer-content">
         <p>&copy; 2024 Smart Eco-Friendly Vehicle Subscription</p>
         <div className="social-icons">
            <a href="https://www.linkedin.com/in/apeksha-gangurde-924b4a230/" target="_blank" rel="noopener noreferrer">
               <FaLinkedin className="social-icon" />
            </a>
            <a href="https://github.com/apekshagangurde" target="_blank" rel="noopener noreferrer">
               <FaGithub className="social-icon" />
            </a>
         </div>
      </div>
   </footer>
);

export default Footer;
