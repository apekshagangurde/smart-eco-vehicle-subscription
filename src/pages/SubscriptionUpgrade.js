import React from 'react';

const SubscriptionUpgrade = () => {
  const upgradeOptions = [
    {
      name: 'Upgrade to Long-Term Plan',
      newPricing: '$149/month',
      additionalFeatures: ['Free Maintenance', 'Extended Coverage'],
    },
    {
      name: 'Upgrade to Premium Plan',
      newPricing: '$199/month',
      additionalFeatures: ['Full Coverage', 'Priority Support', 'Free Vehicle Swap'],
    },
  ];

  return (
    <div className="subscription-upgrade">
      <h2>Upgrade Your Subscription</h2>
      <div className="upgrade-options">
        {upgradeOptions.map((option, index) => (
          <div className="upgrade-card" key={index}>
            <h3>{option.name}</h3>
            <p><strong>New Pricing:</strong> {option.newPricing}</p>
            <p><strong>Additional Features:</strong> {option.additionalFeatures.join(', ')}</p>
            <button className="upgrade-button">Upgrade Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionUpgrade;
