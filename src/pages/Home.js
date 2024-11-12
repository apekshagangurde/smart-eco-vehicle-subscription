import React from 'react';
import { FaRegLightbulb, FaCarSide, FaCog } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Smart Eco-Friendly Vehicle Subscription</h1>
          <p>Your gateway to sustainable and smarter driving experiences with AI-powered assistance.</p>
          <a href="#features" className="cta-button">Explore Our Vehicles</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="feature-card">
          <FaRegLightbulb className="feature-icon" />
          <h2>AI-Powered Co-Driver</h2>
          <p>Enhance your driving with real-time safety monitoring and personalized recommendations.</p>
        </div>
        <div className="feature-card">
          <FaCarSide className="feature-icon" />
          <h2>Eco-Friendly Vehicles</h2>
          <p>Drive electric and hybrid vehicles designed for sustainability and efficiency.</p>
        </div>
        <div className="feature-card">
          <FaCog className="feature-icon" />
          <h2>Flexible Subscription Plans</h2>
          <p>Choose from short-term, long-term, or seasonal options to fit your needs.</p>
        </div>
      </section>

      {/* Subscription Options */}
      <section className="subscription">
        <h2>Get Started with Your Subscription</h2>
        <p>Choose a plan that suits your needs. Whether you're an individual or a business, we have you covered.</p>
        <a href="/subscription" className="cta-button">Subscribe Now</a>
      </section>
    </div>
  );
};

export default Home;
