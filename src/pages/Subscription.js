import React, { useState } from 'react';
import SubscriptionSelection from './SubscriptionSelection';
import SubscriptionUpgrade from './SubscriptionUpgrade';
import SubscriptionCancellation from './SubscriptionCancellation';
import './Subscription.css'; // Importing the CSS for styling

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('selection');

  const renderContent = () => {
    switch (activeTab) {
      case 'selection':
        return <SubscriptionSelection />;
      case 'upgrade':
        return <SubscriptionUpgrade />;
      case 'cancellation':
        return <SubscriptionCancellation />;
      default:
        return <SubscriptionSelection />;
    }
  };

  return (
    <div className="subscription">
      <h1 className="subscription-title">Subscription Management</h1>
      <div className="subscription-container">
        {/* Vertical Navbar */}
        <div className="subscription-sidebar">
          <button
            onClick={() => setActiveTab('selection')}
            className={`sidebar-button ${activeTab === 'selection' ? 'active' : ''}`}
          >
            Subscription Selection
          </button>
          <button
            onClick={() => setActiveTab('upgrade')}
            className={`sidebar-button ${activeTab === 'upgrade' ? 'active' : ''}`}
          >
            Subscription Upgrades
          </button>
          <button
            onClick={() => setActiveTab('cancellation')}
            className={`sidebar-button ${activeTab === 'cancellation' ? 'active' : ''}`}
          >
            Subscription Cancellations
          </button>
        </div>

        {/* Main Content Area */}
        <div className="subscription-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
