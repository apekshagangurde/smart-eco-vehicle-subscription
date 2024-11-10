import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';  // Importing icons for email and password
import './Auth.css';  // Import Auth.css for styling

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Successfully signed in!');
      setMessageType('success');
      navigate('/profile');  // Navigate to profile page after success
    } catch (error) {
      setMessage('Error signing in. Please check your credentials.');
      setMessageType('error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaEnvelope className="input-icon" /> {/* Email icon */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" /> {/* Password icon */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {message && <p className={`auth-message ${messageType}`}>{message}</p>}
      <p>
        Don't have an account?{' '}
        <Link to="/signup">Sign Up</Link> {/* Link to Sign Up page */}
      </p>
    </div>
  );
};

export default SignIn;
