import React from 'react';
import HeroSection from '../components/HeroSection';  // Correct path to HeroSection
import Footer from '../components/Footer';  // Correct path to Footer
import VehicleList from '../components/VehicleList';  // Correct path to VehicleList
import Navbar from '../components/Navbar';  // Correct path to Navbar (inside 'components')

const Home = () => (
   <div>
      <Navbar /> {/* Navbar at the top of the page */}
      <HeroSection /> {/* Hero section */}
      <h1>Welcome to the Home Page</h1>
      <VehicleList /> {/* Vehicle list display */}
      <Footer /> {/* Footer at the bottom of the page */}
   </div>
);

export default Home;
