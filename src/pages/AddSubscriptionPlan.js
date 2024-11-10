import React, { useState } from 'react';
import { firestore } from '../components/firebase/firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods

const AddSubscriptionPlan = () => {
  // State for the form fields
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [features, setFeatures] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new subscription object
    const newSubscription = {
      planName,
      price,
      duration,
      vehicleModel,
      features: features.split(',') // Assuming features are comma-separated
    };

    try {
      // Add the subscription to Firestore
      await addDoc(collection(firestore, 'subscriptions'), newSubscription);
      alert('Subscription plan added successfully!');
      // Reset form
      setPlanName('');
      setPrice('');
      setDuration('');
      setVehicleModel('');
      setFeatures('');
    } catch (error) {
      console.error('Error adding subscription plan: ', error);
      alert('Error adding subscription plan!');
    }
  };

  return (
    <div className="add-subscription">
      <h2>Add New Subscription Plan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Plan Name:</label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vehicle Model:</label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Features (comma separated):</label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Subscription Plan</button>
      </form>
    </div>
  );
};

export default AddSubscriptionPlan;
