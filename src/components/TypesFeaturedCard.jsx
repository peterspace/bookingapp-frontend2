import React from 'react';

export default function TypesFeaturedCard({ destination }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg bg-white shadow-lg overflow-hidden">
        <img
          className={`h-$ w-100 flex-shrink-0`}
          src={destination.imageUrl}
          alt={destination.imageAlt}
        />
      </div>
      <div className=" px-6 py-4">
        <h3 className="text-lg font-semibold text-indigo-500">
          {destination.city}
        </h3>
      </div>
    </div>
  );
}
