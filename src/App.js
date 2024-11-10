import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ExploreVehicles from './pages/ExploreVehicles';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import HeroSection from './components/HeroSection';
import AIAssistant from './components/AIAssistant';
import About from './pages/About';
import SignIn from './pages/SignIn';  // Import SignIn component
import SignUp from './pages/SignUp';  // Import SignUp component

function Home() {
  return <div>Welcome to the Home Page</div>;  
}

function App() {
  return (
    <Router>
      <Navbar />
      <HeroSection />
      <AIAssistant />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/explore" element={<ExploreVehicles />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/signin" element={<SignIn />} /> {/* SignIn route */}
        <Route path="/signup" element={<SignUp />} /> {/* SignUp route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
