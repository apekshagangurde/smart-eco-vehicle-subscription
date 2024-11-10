import React, { useState } from 'react';
import Vehicle3DPreview from './Vehicle3DPreview';

const VehicleFilter = () => {
    const [aiFilter, setAiFilter] = useState('all');
    const [modelPath, setModelPath] = useState('../models/tesla.glb'); // Set default model to the first vehicle

    const vehicles = [
        { id: 1, name: 'Tesla Model X', aiCompatible: true, modelPath: 'path/to/tesla_model.glb' },
        { id: 2, name: 'BMW 7 Series', aiCompatible: false, modelPath: 'path/to/bmw_model.glb' },
        { id: 3, name: 'Audi A8', aiCompatible: true, modelPath: 'path/to/audi_model.glb' },
        { id: 4, name: 'Mercedes S-Class', aiCompatible: false, modelPath: 'path/to/mercedes_model.glb' }
    ];

    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setAiFilter(filterValue);

        const filteredVehicles = vehicles.filter(vehicle => {
            if (filterValue === 'aiCompatible') {
                return vehicle.aiCompatible === true;
            } else if (filterValue === 'noAI') {
                return vehicle.aiCompatible === false;
            } else {
                return true; // 'all' option shows all vehicles
            }
        });

        // If filtered vehicles exist, update the modelPath; otherwise, fall back to default
        if (filteredVehicles.length > 0) {
            setModelPath(filteredVehicles[0].modelPath);
        } else {
            setModelPath('/public/models/tesla.glb'); // Fallback model when no matches
        }
    };

    return (
        <div>
            <select onChange={handleFilterChange} value={aiFilter}>
                <option value="all">All Vehicles</option>
                <option value="aiCompatible">AI Compatible</option>
                <option value="noAI">No AI</option>
            </select>

            {/* Display 3D preview of the selected vehicle */}
            <Vehicle3DPreview modelPath={modelPath} />
        </div>
    );
};

export default VehicleFilter;
