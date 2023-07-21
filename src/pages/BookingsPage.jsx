import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';
import { getUserBookings } from '../services/apiService';


export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    getUserBookings().then((response) => {
      setBookings(response);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings &&
          bookings.map((booking, index) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={index}
              className="flex gap-4 mt-8"
            >
              <div className="flex flex-row bg-gray-200 rounded-2xl overflow-hidden gap-10 ml-10 border border-gray-50 shadow-md">
                <div className="flex w-64 h-64 bg-gray-300 grow shrink-0">
                  <PlaceImg place={booking?.room} />
                </div>
                <div className="grow-0 shrink flex flex-col justify-center items-center px-10">
                  <h2 className="text-xl">{booking?.room?.title}</h2>
                  <button className="px-3 py-2 btn-primary rounded-2xl">
                    {booking?.status}
                  </button>
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
                          Total price: ${booking?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
