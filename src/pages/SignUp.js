import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';  // Importing icons for email and password
import './Auth.css';  // Import Auth.css for styling

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Account created successfully!');
      setMessageType('success');
      navigate('/profile'); // Navigate to profile or home page after success
    } catch (error) {
      setMessage('Error creating account. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className={`auth-message ${messageType}`}>{message}</p>}
      <p>
        Already have an account?{' '}
        <Link to="/signin">Sign In</Link> {/* Link to Sign In page */}
      </p>
    </div>
  );
};

export default SignUp;
