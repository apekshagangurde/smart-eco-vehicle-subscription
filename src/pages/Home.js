import React from 'react';

import HeroSection from './components/HeroSection'; // Correct path
import Footer from './components/Footer'; // Correct path
import VehicleList from './components/VehicleList'; // Correct path
import Navbar from './components/Navbar'; // Correct path

const Home = () => {
 

  return (
    <div>
      <Navbar />
      <HeroSection />
      <VehicleList />
      <Footer />
    </div>
  );
};

export default Home;
