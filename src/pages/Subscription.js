import React, { useState } from 'react';
import './Subscription.css';

// Sample subscription plans with additional vehicles and features
const plans = [
  { id: 1, name: 'Free', features: ['Access to 1 vehicle', 'Limited booking hours'], price: 0 },
  { id: 2, name: 'Basic', features: ['Access to 5 vehicles', 'Priority booking', 'Customer support'], price: 9.99 },
  { id: 3, name: 'Premium', features: ['Access to all vehicles', 'Eco-friendly options', '24/7 support', 'VIP Priority'], price: 19.99 },
  { id: 4, name: 'Enterprise', features: ['Unlimited vehicles', 'Dedicated fleet manager', 'Corporate discounts'], price: 49.99 },
];

// Additional vehicles
const vehicles = [
  { id: 1, name: 'Sedan', type: 'Car', availability: true },
  { id: 2, name: 'SUV', type: 'Car', availability: true },
  { id: 3, name: 'Electric Car', type: 'Car', availability: false },
  { id: 4, name: 'Van', type: 'Car', availability: true },
  { id: 5, name: 'Truck', type: 'Vehicle', availability: true },
  { id: 6, name: 'Mini Bus', type: 'Vehicle', availability: true },
  { id: 7, name: 'Luxury Car', type: 'Car', availability: false },
];

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [subscriptionData, setSubscriptionData] = useState(null);

  // Handle the selection of a plan
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setPaymentStatus('');
    setFeedback('');
  };

  // Handle plan features and vehicle selection
  const handleVehicleSelection = () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }

    // Simulate vehicle selection
    const availableVehicles = vehicles.filter((vehicle) => vehicle.availability);
    alert(`Available Vehicles for ${selectedPlan.name}: ${availableVehicles.map(v => v.name).join(', ')}`);
  };

  // Simulate payment process (replace with actual payment API)
  const handlePayment = () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }

    // Simulate payment success
    setPaymentStatus('Payment Successful! Subscription Activated.');
    storeSubscriptionData();
  };

  // Store subscription data (you can replace this with API calls to save data in the backend)
  const storeSubscriptionData = () => {
    const data = {
      user: userDetails,
      plan: selectedPlan,
      subscriptionDate: new Date().toISOString(),
    };
    setSubscriptionData(data);
    console.log('Subscription Data Stored:', data);
    // Here you can send this data to a backend or cloud database
  };

  // Handle user feedback submission
  const handleFeedbackSubmit = () => {
    if (!feedback) {
      alert('Please provide your feedback');
      return;
    }

    // Store feedback (you can replace this with API calls to save feedback in the backend)
    console.log('Feedback Received:', feedback);
    alert('Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <div className="subscription-container">
      <h2>Choose Your Subscription Plan</h2>
      <div className="subscription-plans">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
            onClick={() => handleSelectPlan(plan)}
          >
            <h3>{plan.name}</h3>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p>Price: ${plan.price}</p>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="plan-details">
          <h3>You have selected: {selectedPlan.name}</h3>
          <p>{selectedPlan.features.join(', ')}</p>
          <p>Price: ${selectedPlan.price}</p>

          <div className="user-details">
            <input
              type="text"
              placeholder="Enter your name"
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
          </div>

          <button onClick={handlePayment}>Proceed to Payment</button>
          <button onClick={handleVehicleSelection}>View Available Vehicles</button>

          {paymentStatus && <p>{paymentStatus}</p>}
        </div>
      )}

      {/* User Feedback */}
      {subscriptionData && (
        <div className="feedback-section">
          <h3>We Value Your Feedback!</h3>
          <textarea
            placeholder="Leave your feedback here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
        </div>
      )}
    </div>
  );
}

export default Subscription;
