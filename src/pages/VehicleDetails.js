// src/pages/VehicleDetails.js
import React, { useState } from 'react';
import './VehicleDetails.css'; // Import the CSS for styling

const VehicleDetails = () => {
  // State for interactive AI Assistant
  const [assistantMessage, setAssistantMessage] = useState('How can I assist you with your route or vehicle today?');

  // Function to simulate route guidance
  const handleRouteGuidance = () => {
    setAssistantMessage('Route guidance: Turn left in 500 meters...');
  };

  // Function to simulate vehicle health insights
  const handleHealthCheck = () => {
    setAssistantMessage('Vehicle health: All systems are optimal.');
  };

  // Function to simulate personalized suggestions
  const handleSuggestions = () => {
    setAssistantMessage('Suggested Action: Check tire pressure before your trip.');
  };

  return (
    <div className="vehicle-details-container">
      <div className="vehicle-details-header">
        <h1>AI Co-Driver Vehicle Details</h1>
      </div>

      <div className="vehicle-details-body">
        <section className="vehicle-info">
          <h2>How it Works</h2>
          <p>
            The AI Co-Driver integrates with your vehicle’s onboard system to offer real-time insights into route
            guidance, vehicle health, and personalized suggestions based on your driving behavior.
          </p>
        </section>

        <section className="vehicle-features">
          <h2>Features</h2>
          <ul>
            <li>Real-time route guidance</li>
            <li>Vehicle health diagnostics</li>
            <li>Personalized trip suggestions</li>
            <li>Voice-activated assistant</li>
          </ul>
        </section>

        <section className="vehicle-benefits">
          <h2>Benefits</h2>
          <ul>
            <li>Improved safety through real-time feedback</li>
            <li>Optimized routes for faster travel</li>
            <li>Enhanced fuel efficiency</li>
            <li>Comprehensive vehicle diagnostics</li>
          </ul>
        </section>

        <section className="ai-assistant">
          <h2>AI Assistant</h2>
          <p>{assistantMessage}</p>
          <div className="ai-actions">
            <button onClick={handleRouteGuidance}>Get Route Guidance</button>
            <button onClick={handleHealthCheck}>Check Vehicle Health</button>
            <button onClick={handleSuggestions}>Get Suggestions</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VehicleDetails;
