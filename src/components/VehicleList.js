// src/components/VehicleList.js
import React from 'react';
import VehicleCard from './VehicleCard';

const VehicleList = () => {
   // Example vehicle data; replace with data from an API later.
   const vehicles = [
      { id: 1, name: 'Electric SUV', type: 'Electric', price: '$100/day' },
      { id: 2, name: 'Hybrid Sedan', type: 'Hybrid', price: '$80/day' },
   ];

   return (
      <div>
         {vehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
         ))}
      </div>
   );
};

export default VehicleList;
