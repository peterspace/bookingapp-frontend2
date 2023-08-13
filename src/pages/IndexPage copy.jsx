import { useState, useEffect } from 'react';

import Destination from '../components/Destination.jsx';
import DestinationFeatured from '../components/DestinationFeatured.jsx';
import TypesFeatured from '../components/TypesFeatured.jsx';


export default function IndexPage() {
  const [city, setCity] = useState('');

  console.log({ city: city });

  return (
    <div className="flex flex-col gap-3 mt-8">
      <>
        <div className="flex justify-center items-center">
          <DestinationFeatured setCity={setCity} />
        </div>
        <div className="flex justify-center items-center">
          <TypesFeatured />
        </div>

        <div className="flex justify-center items-center">
          <Destination />
        </div>
      </>
    </div>
  );
}
