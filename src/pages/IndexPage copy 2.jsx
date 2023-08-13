import { useState, useEffect } from 'react';

import Destination from '../components/Destination.jsx';
import DestinationFeatured from '../components/DestinationFeatured.jsx';
import TypesFeatured from '../components/TypesFeatured.jsx';
import Home from '../components/home/Home.jsx';

export default function IndexPage() {
  const [city, setCity] = useState('');

  console.log({ city: city });

  return (
    <>
      {/* <Home /> */}
      {/* <div className="flex flex-col gap-3 mt-8 w-full"> */}
      <div className="flex flex-col gap-3 mt-8 w-full">
        <>
          {/* <div className="flex justify-center items-center">
            <Home />
          </div> */}
          {/* <Home /> */}
          {/* <div className="flex">
            <DestinationFeatured setCity={setCity} />
          </div> */}
          <div className="flex justify-center items-center">
            <DestinationFeatured setCity={setCity} />
          </div>
          <div className="flex justify-center items-center">
            <TypesFeatured />
          </div>

          <div className="flex justify-center items-center bg-black">
            <Destination />
          </div>
        </>
      </div>
    </>
  );
}
