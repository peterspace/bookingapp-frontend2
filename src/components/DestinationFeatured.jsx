import React from 'react';

import { destinations } from '../constants';

import DestinationsFeaturedCard from './DestinationsFeaturedCard';

const DestinationFeatured = (props) => {
  const { setCity } = props;

  return (
    <div>
      <div className="my-8 mx-8 px-12 lg:px-12 py-8">
        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-gray-900 sm:mt-8">
          {' '}
          Popular destinations
        </h2>
        <p className="mt-2 sm:mt-4 text-gray-600 md:mt-8">
          {' '}
          A selection of great work-friendly cities with lots to see and explore
        </p>
        <div className="mt-6 grid gap-10 ss:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationsFeaturedCard
              destination={destination}
              key={destination.city}
              setCity={setCity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationFeatured;
