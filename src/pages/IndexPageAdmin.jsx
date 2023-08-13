import React from 'react';
import Destination from '../components/Destination.jsx';
import TypesFeatured from '../components/TypesFeatured.jsx';
import { destinations } from '../constants/index.jsx';
import AdminWelcomeCard from '../components/AdminWelcomeCard.jsx';

export default function IndexPageAdmin() {
  return (
    <div className="flex flex-col gap-3 mt-8">
      <>
        <div className="flex justify-center items-center">
          <div className="my-8 mx-8 px-12 lg:px-12 py-8 w-[35%]">
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-gray-900 sm:mt-8">
              {' '}
              Welcome to Crib
            </h2>
            <p className="mt-2 sm:mt-4 text-gray-600 md:mt-8">
              {' '}
              A selection of great work-friendly cities with lots to see and
              explore
            </p>
            <div className="mt-6">
              <AdminWelcomeCard destination={destinations[0]} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <TypesFeatured />
        </div>

        <div className="flex justify-center items-center bg-black">
          <Destination />
        </div>
      </>
    </div>
  );
}
