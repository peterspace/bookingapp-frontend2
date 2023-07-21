import React from 'react';

import { typesFeatured } from '../constants';


import TypesFeaturedCard from './TypesFeaturedCard';


const TypesFeatured = () => {


  return (
    <div>

<div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-12 lg:px-12 py-8">
        <h2 className="text-2xl font-bold text-gray-900"> Popular reservations</h2>
        <p className="mt-2 text-gray-600">
          {' '}
          Explore our reservations
        </p>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {typesFeatured.map((destination) => (
            <TypesFeaturedCard
              destination={destination}
              key={destination.city}
            />
          ))}
        </div>
      </div>  
    </div>
  );
};

export default TypesFeatured;

