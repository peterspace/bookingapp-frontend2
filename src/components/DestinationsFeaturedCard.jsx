import React from 'react'



export default function DestinationsFeaturedCard({destination}) {
  return (
    <div
    className="flex flex-col items-center rounded-lg bg-white shadow-lg overflow-hidden"
  >
    <img
      className={`h-$ w-100 flex-shrink-0`}
      src={destination.imageUrl}
      alt={destination.imageAlt}
    />
    <div className=" px-6 py-4">
    <h3 className="text-sm font-semibold text-gray-800 uppercase">
      {destination.city}
    </h3>
    </div>
  </div>
  )
}
