import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';
import {
  getOwnerBookings,
  updateOwnerBooking,
} from '../services/apiService';
import { selectOwnerId } from '../redux/features/auth/bookingSlice';

import { useSelector } from 'react-redux';


export default function AgentBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const activeOwnerId = useSelector(selectOwnerId);
  console.log('activeOwnerId:', activeOwnerId);

  useEffect(() => {
    if (activeOwnerId.ownerId === null || '' || undefined) {
      setIsLoading(true);
    }
  }, []);


  useEffect(() => {
    // let ownerId = userId;
    // let ownerId = "64199dc97faacf8c36dbeb16";
    console.log('activeOwnerId:', activeOwnerId);
    let ownerId = activeOwnerId.ownerId;
    //  let ownerId = activeOwnerId.ownerId.toString()
    getOwnerBookings(ownerId).then((response) => {
      setBookings(response);
      console.log('userBookings', response);
    });
  }, []);

 
 

  return (
    <div>
      <AccountNav />
      {/* <button className='px-3 py-3 btn-primary' onClick={()=>updateBookingStatus()}>Get</button> */}
      <>
        {isLoading === true ? (
          <div>Loading...</div>
        ) : (
          <div>
            {bookings &&
              bookings.map((booking, index) => (
                <Link
                  to={`/account/agentbookings/${booking._id}`}
                  // onClick={() => setBooking(booking)}
                  key={index}
                  className="flex gap-4 mt-8"
                >
                  <div className="flex flex-row bg-gray-200 rounded-2xl overflow-hidden gap-10 ml-10 border border-gray-50 shadow-md">
                    <div className="flex w-64 h-64 bg-gray-300 grow shrink-0">
                      <PlaceImg place={booking.place} />
                    </div>
                    <div className="grow-0 shrink flex flex-col justify-center items-center px-10">
                      <h2 className="text-xl">{booking.place.title}</h2>
                      <button className="px-3 py-2 btn-primary rounded-2xl">{booking.status}</button>
                      <div className="text-xl border bg-gray-100 rounded-lg mt-2 px-2 py-2 border-gray-50">
                        <div className="px-2 py-2">
                          <BookingDates
                            booking={booking}
                            className="mb-2 mt-4 text-gray-500"
                          />
                          <div className="flex gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                              />
                            </svg>
                            <span className="text-2xl">
                              Total price: ${booking.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </>
    </div>
  );
}

// const new = (
//   <div>
//   <AccountNav />
//   <div>
//     {/* {bookings?.length > 0 && */}
//     {bookings &&
//       bookings.map((booking, index) => (
//         <div key={index} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
//           <div className="w-48">
//             <PlaceImg place={booking.place} />
//           </div>
//           <div className="py-3 pr-3 grow">
//             <h2 className="text-xl">{booking.place.title}</h2>
//             <div className="text-xl">
//               <BookingDates
//                 booking={booking}
//                 className="mb-2 mt-4 text-gray-500"
//               />
//               <div className="flex gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-8 h-8"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
//                   />
//                 </svg>
//                 <span className="text-2xl">
//                   Total price: ${booking.price}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         // <Link
//         //   to={`/account/bookings/${booking._id}`}
//         //   className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
//         // >

//         // </Link>
//       ))}
//   </div>
// </div>
// )
