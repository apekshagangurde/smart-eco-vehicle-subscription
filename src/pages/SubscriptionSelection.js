import React, { useState, useEffect } from 'react';
import { firestore } from '../components/firebase/firebase'; // Import Firebase firestore
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Make sure this is imported
import { Timestamp } from 'firebase/firestore'; // Import Firestore Timestamp

import './container.css';

const SubscriptionSelection = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isCustomerCreated, setIsCustomerCreated] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [isSubscriptionConfirmed, setIsSubscriptionConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch subscriptions from Firestore
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'subscriptions'));
        const subscriptionList = [];
        querySnapshot.forEach((doc) => {
          subscriptionList.push({ id: doc.id, ...doc.data() });
        });
        setSubscriptions(subscriptionList);
      } catch (error) {
        setErrorMessage('Failed to load subscription plans.');
        console.error(error);
      }
    };
    fetchSubscriptions();
  }, []);

  // Handle form change for customer details
  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Subscribe Now button click
  const handleSubscribeNow = (subscription) => {
    setSelectedSubscription(subscription);
  };

  // Create Customer in Firebase
  const createCustomer = async () => {
    if (validateCustomerDetails()) {
      setIsLoading(true); // Set loading to true while making the request
      try {
        const auth = getAuth();  // Initialize Firebase Auth
        const user = auth.currentUser;  // Get the current logged-in user

        if (user) {
          // Use the Firebase Authentication UID as the customer_id
          await addDoc(collection(firestore, 'customers'), {
            customer_id: user.uid,  // Store the Firebase Authentication UID as customer_id
            first_name: customerDetails.first_name,
            last_name: customerDetails.last_name,
            email: customerDetails.email,
            phone_number: customerDetails.phone_number,
            address: customerDetails.address,
          });

          setCustomerId(user.uid);  // Store the customer ID (Firebase UID) locally
          setIsCustomerCreated(true); // Mark that customer has been created
          setErrorMessage(''); // Clear any previous errors
        } else {
          setErrorMessage('No authenticated user found. Please log in.');
        }
      } catch (error) {
        setErrorMessage('Error creating customer. Please try again.');
        console.error('Error creating customer: ', error);
      } finally {
        setIsLoading(false); // Reset loading state after the process
      }
    } else {
      setErrorMessage('Please fill all customer details.');
    }
  };

  // Validate customer details before submission
  const validateCustomerDetails = () => {
    const { first_name, last_name, email, phone_number, address } = customerDetails;
    return first_name && last_name && email && phone_number && address;
  };

  // Create subscription_customer entry
  const createSubscriptionForCustomer = async () => {
    if (selectedSubscription && customerId && !isSubscriptionConfirmed) {
      try {
        const startDate = Timestamp.now(); // Get Firestore Timestamp for current date
        const endDate = Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 1))); // 1 month subscription

        // Create the subscription_customer document
        const docRef = await addDoc(collection(firestore, 'subscriptions_customers'), {
          customer_id: customerId,
          subscription_id: selectedSubscription.id,
          start_date: startDate, // Firestore Timestamp
          end_date: endDate, // Firestore Timestamp
          status: 'Active',
        });
        console.log('Subscription for customer created with ID: ', docRef.id);
        setIsSubscriptionConfirmed(true); // Mark subscription as confirmed
      } catch (error) {
        setErrorMessage('Error creating subscription. Please try again.');
        console.error('Error creating subscription for customer: ', error);
      }
    }
  };

  return (
    <div className="subscription-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="card-grid">
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} className="subscription-card">
              <h3>{sub.planName}</h3>
              <p className="price">₹{sub.price}</p>
              <p className="duration">{sub.duration}</p>
              <p><strong>Vehicle Model:</strong> {sub.vehicleModel}</p>
              <p><strong>Features:</strong> {Array.isArray(sub.features) ? sub.features.join(', ') : 'No features available'}</p>
              <button className="subscribe-btn" onClick={() => handleSubscribeNow(sub)}>
                Subscribe Now
              </button>
            </div>
          ))
        ) : (
          <p>Loading subscription plans...</p>
        )}
      </div>

      {/* Display customer form after subscription is selected */}
      {selectedSubscription && !isCustomerCreated && !isSubscriptionConfirmed && (
        <div className="customer-form">
          <h2>Enter Your Details</h2>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={customerDetails.first_name}
            onChange={handleCustomerInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={customerDetails.last_name}
            onChange={handleCustomerInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customerDetails.email}
            onChange={handleCustomerInputChange}
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={customerDetails.phone_number}
            onChange={handleCustomerInputChange}
          />
          <textarea
            name="address"
            placeholder="Address"
            value={customerDetails.address}
            onChange={handleCustomerInputChange}
          />
          <button className="submit-btn" onClick={createCustomer} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      )}

      {/* Once customer is created, show the "Confirm Subscription" button */}
      {isCustomerCreated && !isSubscriptionConfirmed && (
        <div className="confirm-subscription">
          <h3>Customer Created Successfully</h3>
          <p>Now, let's confirm your subscription:</p>
          <button
            className="confirm-btn"
            onClick={createSubscriptionForCustomer}
            disabled={isSubscriptionConfirmed || isLoading} // Disable button after confirmation
          >
            {isLoading ? 'Confirming...' : 'Confirm Subscription'}
          </button>
        </div>
      )}

      {/* Show success message after subscription is confirmed */}
      {isSubscriptionConfirmed && (
        <div className="success-message">
          <h2>Subscription Created Successfully!</h2>
          <p>Your subscription has been activated. Thank you for subscribing!</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSelection;
