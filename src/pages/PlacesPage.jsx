import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { getUserPlaces } from '../services/apiService';

// Admin only page
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getUserPlaces().then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  //======{Original}==========
  // useEffect(() => {
  //   axios.get('/places/user-places').then(({ data }) => {
  //     setPlaces(data);
  //   });
  // }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={'/account/places/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link
              key={index}
              to={'/account/places/' + place._id}
              className="flex cursor-pointer gap-4 p-4"
            >
              <div className="flex flex-row bg-gray-200 rounded-2xl overflow-hidden gap-10 ml-10 border border-gray-50 shadow-md">
                <div className="flex w-64 h-64 bg-gray-300 grow shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink flex flex-col justify-center items-center px-10">
                  <h2 className="text-xl text-gray-900">{place.title}</h2>
                  <p className="text-sm mt-2 text-gray-700">
                    {place.description}
                  </p>
                  <p className="text-sm mt-2 text-gray-700">{place.city}</p>
                  {/* <p className="text-sm mt-2 text-gray-700">
                    {place.isAvailable.toString()}
                  </p> */}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
