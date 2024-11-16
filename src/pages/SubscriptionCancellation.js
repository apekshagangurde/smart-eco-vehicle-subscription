import React, { useState, useEffect } from 'react';
import { firestore } from '../components/firebase/firebase'; // Import Firestore
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import './container.css';

const ActiveSubscription = () => {
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveSubscription = async () => {
      try {
        const auth = getAuth(); // Get the current user
        const user = auth.currentUser; // Get the logged-in user
        
        if (!user) {
          setErrorMessage('User is not logged in.');
          setIsLoading(false);
          return;
        }

        const customerId = user.uid; // Get the customer ID (Firebase UID)
        
        // Query the subscriptions_customers collection for the active subscription
        const subscriptionsQuery = query(
          collection(firestore, 'subscriptions_customers'),
          where('customer_id', '==', customerId),
          where('status', '==', 'Active')
        );

        const querySnapshot = await getDocs(subscriptionsQuery);
        if (querySnapshot.empty) {
          setErrorMessage('No active subscription found for this customer.');
        } else {
          querySnapshot.forEach((doc) => {
            const subscriptionData = doc.data();
            const currentDate = new Date().toISOString(); // Get current time in UTC ISO format
            
            // Convert Firestore timestamps to Date objects
            const startDate = subscriptionData.start_date instanceof Date ? subscriptionData.start_date.toISOString() : new Date(subscriptionData.start_date.seconds * 1000).toISOString();
            const endDate = subscriptionData.end_date instanceof Date ? subscriptionData.end_date.toISOString() : new Date(subscriptionData.end_date.seconds * 1000).toISOString();

            // Compare the dates in UTC (ISO 8601 format)
            if (currentDate >= startDate && currentDate <= endDate) {
              setActiveSubscription({ id: doc.id, ...subscriptionData }); // Subscription is active
            } else {
              setErrorMessage('Active subscription period has expired.');
            }
          });
        }
      } catch (error) {
        setErrorMessage('Error fetching subscription data.');
        console.error('Error fetching active subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveSubscription();
  }, []);

  // Handle cancel subscription
  const handleCancelSubscription = async () => {
    try {
      if (activeSubscription) {
        // Remove the subscription from Firestore using the document ID
        const subscriptionRef = doc(firestore, 'subscriptions_customers', activeSubscription.id);
        await deleteDoc(subscriptionRef);

        // Update the state to reflect the cancellation
        setActiveSubscription(null);
        setErrorMessage('Your subscription has been cancelled successfully.');
      }
    } catch (error) {
      setErrorMessage('Error canceling subscription.');
      console.error('Error canceling subscription:', error);
    }
  };

  // Render loading, error, or active subscription
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className="active-subscription">
      {activeSubscription ? (
        <div>
          <h2>Active Subscription</h2>
          <p><strong>Subscription ID:</strong> {activeSubscription.subscription_id}</p>
          <p><strong>Start Date:</strong> {new Date(activeSubscription.start_date.seconds * 1000).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(activeSubscription.end_date.seconds * 1000).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {activeSubscription.status}</p>

          {/* Cancel Button */}
          <button className="cancel-btn" onClick={handleCancelSubscription}>Cancel Subscription</button>
        </div>
      ) : (
        <p>No active subscription available for this customer.</p>
      )}
    </div>
  );
};

export default ActiveSubscription;
