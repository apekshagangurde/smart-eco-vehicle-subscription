import React from 'react';

const SubscriptionSelection = () => {
  const subscriptionPlans = [
    {
      name: 'Short-Term Plan',
      vehicleModels: ['Model A', 'Model B'],
      pricing: '$199/month',
      features: ['Electric', 'Basic Coverage'],
    },
    {
      name: 'Long-Term Plan',
      vehicleModels: ['Model C', 'Model D', 'Model E'],
      pricing: '$149/month',
      features: ['Hybrid', 'Extended Coverage', 'Free Maintenance'],
    },
    {
      name: 'Seasonal Plan',
      vehicleModels: ['Model F', 'Model G'],
      pricing: '$99/month',
      features: ['Electric', 'Seasonal Offer', 'Limited Coverage'],
    },
  ];

  return (
    <div className="subscription-selection">
      <h2>Select Your Subscription Plan</h2>
      <div className="plans">
        {subscriptionPlans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <h3>{plan.name}</h3>
            <p><strong>Vehicle Models:</strong> {plan.vehicleModels.join(', ')}</p>
            <p><strong>Pricing:</strong> {plan.pricing}</p>
            <p><strong>Features:</strong> {plan.features.join(', ')}</p>
            <button className="select-button">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSelection;
