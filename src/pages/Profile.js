import React, { useState, useEffect } from 'react';
import { auth } from '../components/firebase/firebase'; // Import firebase auth functions
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn'; // Import SignIn component


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use navigate to redirect after sign out

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut() // Firebase sign out function
      .then(() => {
        setUser(null);  // Clear the user state
        navigate('/');  // Redirect to home or sign-in page
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName || user.email}</h2>
          <p>Your email: {user.email}</p>
          <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button> {/* Sign Out button */}
        </div>
      ) : (
        <div>
          <h2>Please Sign In or Sign Up</h2>
          <SignIn /> {/* Show SignIn form if not logged in */}
        </div>
      )}
    </div>
  );
};

export default Profile;
