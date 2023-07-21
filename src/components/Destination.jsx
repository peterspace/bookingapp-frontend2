import React from 'react';

import { ratesFeatured } from '../constants';
import DestinationsCard from './DestinationsCard';


const Destination = () => {


  return (
    <div>

<div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-12 lg:px-12">
<h2 className="text-2xl font-bold text-gray-900"> Average pricing</h2>
        <p className="mt-2 text-gray-600">
          {' '}
          Enjoy your trip at an affordable rate
        </p>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {ratesFeatured.map((destination) => (
            <DestinationsCard
              destination={destination}
              key={destination.city}
            />
          ))}
        </div>
      </div>
      {/* <div className="bg-gray-100 grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 text-center max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
          <div className="xl:max-w-xl">         
          </div>
        </div>
        
      </div>
      <div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
        <h2 className="text-xl text-gray-900"> Popular destinations</h2>
        <p className="mt-2 text-gray-600">
          {' '}
          A selection of great work-friendly cities with lots to see and explore
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationsCard
              destination={destination}
              key={destination.city}
            />
          ))}
        </div>
      </div> */}

     
    </div>
  );
};

export default Destination;

