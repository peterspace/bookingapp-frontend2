import React from 'react';
import styles from '../style';

export default function DestinationsCard({ destination }) {
  return (
    <div
    className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden"
  >
    <img
      className={`h-$ w-32 flex-shrink-0`}
      src={destination.imageUrl}
      alt={destination.imageAlt}
    />
    <div className=" px-6 py-4">
    <h3 className="mb-2 text-sm font-semibold text-gray-800 uppercase">
      {destination.city}
    </h3>
    <p className="text-red-600">${destination.averagePrice} / night</p>
    <div className="mt-4">
      <a
        href="/"
        className="text-indigo-500 hover:text-indigo-400 font-semibold text-xs"
      >
        {' '}
        Explore {destination.propertyCount} properties
      </a>
    </div>
    </div>
  </div>
  )
}
