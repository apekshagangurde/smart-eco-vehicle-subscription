import React from 'react';
import HeroSection from '../components/HeroSection'; // Correct path
import Footer from '../components/Footer'; // Correct path
import VehicleList from '../components/VehicleList'; // Correct path
import Navbar from '../components/Navbar'; // Correct path

const Home = () => (
  <div>
    <Navbar />
    <HeroSection />
    <h1>Welcome to the Home Page</h1>
    <VehicleList />
    <Footer />
  </div>
);

export default Home;
