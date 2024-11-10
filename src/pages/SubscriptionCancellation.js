import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../components/firebase/firebase';  // Adjust the path if necessary

const db = getFirestore(app); // Initialize Firestore with the app instance

const SubscriptionCancellation = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const querySnapshot = await getDocs(collection(db, 'subscriptions'));
      const fetchedSubscriptions = [];
      querySnapshot.forEach((doc) => {
        fetchedSubscriptions.push({ id: doc.id, ...doc.data() });
      });
      setSubscriptions(fetchedSubscriptions); // Set state with fetched subscriptions
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h1>Subscription Cancellations</h1>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>
            {subscription.name} - {subscription.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionCancellation;
