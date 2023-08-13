import React from 'react';

import { typesFeatured } from '../constants';

import TypesFeaturedCard from './TypesFeaturedCard';

const TypesFeatured = () => {
  return (
    <div>
      <div className="my-8 mx-8 px-12 lg:px-12 py-8">
        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-gray-900 sm:mt-8">
          {' '}
          Popular reservations
        </h2>
        <p className="mt-2 sm:mt-4 text-gray-600 md:mt-8">
          {' '}
          Explore our reservations
        </p>
        <div className="mt-6 grid gap-10 ss:grid-cols-3">
          {typesFeatured.map((destination) => (
            <TypesFeaturedCard
              destination={destination}
              key={destination.place}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypesFeatured;
