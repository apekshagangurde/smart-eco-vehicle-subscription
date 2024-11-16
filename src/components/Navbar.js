import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCar, FaInfoCircle, FaUserCircle, FaSignInAlt, FaRobot } from 'react-icons/fa';  // Import AI Assistant Icon
import './Navbar.css'; // Optional, for additional custom styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="./src/images/EVORA-AI.png" className="navbar-logo">
          <h1>EvoraAI</h1>
        </Link>

        {/* Links Section */}
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className="nav-link">
              <FaCar /> Explore Vehicles
            </Link>
          </li>
          <li>
            <Link to="/subscription" className="nav-link">
              <FaSignInAlt /> Subscription
            </Link>
          </li>
          <li>
            <Link to="/AIAssistant" className="nav-link">  {/* New AI Assistant link */}
              <FaRobot /> AI Assistant
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              <FaInfoCircle /> About
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link">
              <FaUserCircle /> Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
