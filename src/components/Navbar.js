import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCar, FaInfoCircle, FaUserCircle, FaSignInAlt } from 'react-icons/fa';
import './Navbar.css'; // Optional, for additional custom styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          <h1>Smart Eco</h1>
        </Link>

        {/* Links Section */}
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className="nav-link">  {/* Use '/explore' here to match App.js */}
              <FaCar /> Explore Vehicles
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
          <li>
            <Link to="/subscription" className="nav-link">
              <FaSignInAlt /> Subscription
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
