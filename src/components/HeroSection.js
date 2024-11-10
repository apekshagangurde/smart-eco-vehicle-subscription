// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className="hero-section">
            {/* Background Video or Image */}
            <div className="hero-background">
                <video autoPlay loop muted className="hero-video">
                    <source src="/path-to-your-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Overlay content */}
            <div className="hero-content">
                <h1 className="hero-title">Smart Eco-Friendly Vehicle Subscription</h1>
                <p className="hero-description">
                    Experience flexible access to eco-friendly electric and hybrid vehicles with personalized AI-powered assistance.
                    Drive smarter, reduce your carbon footprint, and enjoy a subscription tailored to your needs.
                </p>
                <button className="hero-button" onClick={() => alert('Free Trial Started!')}>
                    Start Free Trial
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
