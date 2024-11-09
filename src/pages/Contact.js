import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Vehicles from './pages/Vehicles';
import Contact from './pages/Contact';

// Components
import Footer from './components/Footer';

function App() {
   return (
      <Router>
         <div>
            {/* Routes for different pages */}
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/vehicles" element={<Vehicles />} />
               <Route path="/contact" element={<Contact />} />
            </Routes>
            
            {/* Footer appears on all pages */}
            <Footer />
         </div>
      </Router>
   );
}

export default App;
