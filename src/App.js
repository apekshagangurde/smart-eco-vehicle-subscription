import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import Navbar component
import Footer from './components/Footer';  // Import Footer component

import ExploreVehicles from './pages/ExploreVehicles';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import HeroSection from './components/HeroSection';
import AIAssistant from './components/AIAssistant';
import About from './pages/About';


function Home() {
  return <div>Welcome to the Home Page</div>;  
}


function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar at the top */}
      <HeroSection /> 
      <AIAssistant />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/explore" element={<ExploreVehicles />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
      <Footer /> {/* Footer at the bottom */}
    </Router>
  );
}

export default App;
