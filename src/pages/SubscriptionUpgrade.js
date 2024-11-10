import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const SubscriptionUpgrade = ({ currentSubscriptionId }) => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [upgradeOptions, setUpgradeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(getApp());

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const subscriptionRef = doc(db, 'subscriptions', currentSubscriptionId);
        const subscriptionDoc = await getDoc(subscriptionRef);
        if (subscriptionDoc.exists()) {
          setCurrentPlan(subscriptionDoc.data());
        } else {
          setError('Current subscription not found.');
        }
      } catch (err) {
        setError('Error fetching current subscription.');
      }
    };

    const fetchUpgradeOptions = async () => {
      try {
        const optionsSnapshot = await getDocs(collection(db, 'vehicles'));
        setUpgradeOptions(optionsSnapshot.docs.map(doc => doc.data()));
      } catch (err) {
        setError('Error fetching upgrade options.');
      }
    };

    fetchCurrentPlan();
    fetchUpgradeOptions();

    setLoading(false);
  }, [currentSubscriptionId, db]);

  const handleUpgrade = async (newPlan) => {
    try {
      // Example: Update the subscription in Firestore
      const subscriptionRef = doc(db, 'subscriptions', currentSubscriptionId);
      await updateDoc(subscriptionRef, {
        plan: newPlan.model,  // Update the plan field
        price: newPlan.pricing // Update the price field
      });

      console.log('Upgraded to:', newPlan);
      setCurrentPlan(newPlan); // Optionally, update state to reflect the new plan
    } catch (err) {
      setError('Error upgrading subscription.');
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="subscription-upgrade">
      <h2>Upgrade Your Subscription</h2>
      <p>Current Plan: {currentPlan ? currentPlan.vehicle_id : 'Loading...'} </p>
      
      {error && <p className="error-message">{error}</p>}

      <h3>Upgrade Options</h3>
      {upgradeOptions.length > 0 ? (
        upgradeOptions.map((option, index) => (
          <div key={index} className="upgrade-option">
            <h4>{option.model}</h4>
            <p>Price: {option.pricing}</p>
            <button onClick={() => handleUpgrade(option)}>Upgrade</button>
          </div>
        ))
      ) : (
        <p>No upgrade options available.</p>
      )}
    </div>
  );
};

export default SubscriptionUpgrade;
