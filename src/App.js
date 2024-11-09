import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Correct path to Home page
import ExploreVehicles from './pages/ExploreVehicles';
import VehicleDetails from './pages/VehicleDetails';
import Subscription from './pages/Subscription';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreVehicles />} />
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
         </Routes>
      </Router>
   );
}

export default App;
