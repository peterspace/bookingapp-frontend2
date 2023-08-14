import { useState, useEffect } from 'react';

import Destination from '../components/Destination.jsx';
import DestinationFeatured from '../components/DestinationFeatured.jsx';
import TypesFeatured from '../components/TypesFeatured.jsx';
import Home from '../components/home/Home.jsx';

import { bookingConfirmation } from '../services/apiService.js';

export default function IndexPage() {
  const [city, setCity] = useState('');

  console.log({ city: city });

  const [emailResponse, setEmailResponse] = useState();
  console.log({ emailResponse: emailResponse });

  const [newData, setNewData] = useState('');
  console.log({ newData: newData });

  async function checkEmail() {
    // let userData = {
    //   email,
    // };

    let userData = {
      email: 'peter.space.io@gmail.com',
      name: 'Peter',
    };

    setNewData(userData);
    const response = bookingConfirmation(userData);

    if (response) {
      let promise = new Promise(function (resolve, reject) {
        resolve(response);
      });

      promise.then((result) => {
        console.log(result);
        setEmailResponse(result);
      });
    }
  }

  return (
    <>
      {/* <Home /> */}
      <div className="flex flex-col gap-3 mt-8 w-full">
        <>
          {/* <div className=" cursor-pointer bg-blue-500 rounded-lg px-2 py-2 w-[150px] flex flex-row hover:opacity-90 mt-4">
            <div className="text-white" onClick={() => checkEmail()}>
              check Email
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
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
