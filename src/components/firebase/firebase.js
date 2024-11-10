// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // For authentication
import { getFirestore } from 'firebase/firestore'; // For Firestore
import { getAnalytics } from 'firebase/analytics'; // Optional: For analytics


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBUNaMtqjtNK8hzgycKVqO3C30MjOhxeMU',
  authDomain: 'vehicle-subscription.firebaseapp.com',
  projectId: 'vehicle-subscription',
  storageBucket: 'vehicle-subscription.firebasestorage.app',
  messagingSenderId: '803355384525',
  appId: '1:803355384525:web:7d2becf35f8fe1e846a784',
  measurementId: 'G-2RR3PF9LSZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app); // Optional: Use if you want analytics

// Export the Firebase services
export const auth = getAuth(app); // Authentication service
export const firestore = getFirestore(app); // Firestore service

export default app; // Optionally export the Firebase app if needed
