import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';
import {
  getUserBookings,
  updateBookingsAutomatically,
} from '../services/apiService';
import { differenceInCalendarDays, format } from 'date-fns';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getUserBookings().then((response) => {
      setBookings(response);
    });
  }, []);

  //======{The initial status after booking is  "pending"}========================
  //======{The admin will update status to from "pending" to "paid" once payement is confirmed}========================
  //==={This system will Automatically update status to " Active, Completed, Canceled" using the underlined lines of codes}===========================

  //==={set intervals for regular updates}=========

  // useEffect(() => {
  //   statusUpdate();
  // }, [bookings]);

  // useEffect(() => {
  //   statusUpdate();
  // }, []);

  useEffect(() => {
    statusUpdate();
  }, [bookings]);

  useEffect(() => {
    statusUpdate();
  }, []);

  async function statusUpdate() {
    bookings?.map(async (booking) => {
      let checkIn = new Date(booking?.checkIn);
      let checkOut = new Date(booking?.checkOut);
      let currentTime = new Date(Date.now());

      let currentStatus = booking?.status;

      let newStatusx;

      if (
        checkIn <= currentTime && // checkIn date is today or behind and checkout date has not reached yet
        checkOut >= currentTime &&
        booking?.status === 'Paid'
      ) {
        newStatusx = 'Active';
      }

      if (
        checkIn > currentTime && // checkIn date is ahead of now
        checkOut > currentTime && // checkOut date is ahead of now
        booking?.status === 'Paid'
      ) {
        newStatusx = 'Inactive';
      }

      if (
        checkIn >= currentTime && // checkIn date is today or ahead of today
        checkOut > currentTime && // checkOut date is ahead of today
        booking?.status === 'Pending'
      ) {
        newStatusx = 'Pending';
      }
      //==={Is Completed}==================

      if (
        checkOut < currentTime &&
        booking?.status !== 'Pending' &&
        booking?.status !== 'Inactive'
      ) {
        newStatusx = 'Completed';
      }
      //==={Is Canceled}==================
      if (
        checkOut < currentTime &&
        booking?.status !== 'Paid' &&
        booking?.status !== 'Cancel'
      ) {
        newStatusx = 'Cancel';
      }

      if (booking?.status !== 'Paid' && booking?.status !== 'Pending') {
        newStatusx = currentStatus;
      }
      const userData = {
        id: booking._id, // new
        place: booking.place,
        // place: booking.place?._id,
        room: booking?.room?._id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        numberOfGuests: booking.numberOfGuests,
        name: booking.name,
        phone: booking.phone,
        price: booking.price,
        paymentMethod: booking.paymentMethod,
        owner: booking.owner,
        status: newStatusx, // new update
      };

      console.log('userData:', userData);
      updateBookingsAutomatically(userData).then((response) => {
        console.log(response);
      });
    });
  }

  const statusUpdateOnClick = async (ev) => {
    ev.preventDefault();
    bookings?.map(async (booking) => {
      let checkIn = new Date(booking?.checkIn);
      let checkOut = new Date(booking?.checkOut);
      let currentTime = new Date(Date.now());

      let currentStatus = booking?.status;

      let newStatusx;

      if (
        checkIn <= currentTime && // checkIn date is today or behind and checkout date has not reached yet
        checkOut >= currentTime &&
        booking?.status === 'Paid'
      ) {
        newStatusx = 'Active';
      }

      if (
        checkIn > currentTime && // checkIn date is ahead of now
        checkOut > currentTime && // checkOut date is ahead of now
        booking?.status === 'Paid'
      ) {
        newStatusx = 'Inactive';
      }

      if (
        checkIn >= currentTime && // checkIn date is today or ahead of today
        checkOut > currentTime && // checkOut date is ahead of today
        booking?.status === 'Pending'
      ) {
        newStatusx = 'Pending';
      }
      //==={Is Completed}==================

      if (
        checkOut < currentTime &&
        booking?.status !== 'Pending' &&
        booking?.status !== 'Inactive'
      ) {
        newStatusx = 'Completed';
      }
      //==={Is Canceled}==================
      if (
        checkOut < currentTime &&
        booking?.status !== 'Paid' &&
        booking?.status !== 'Cancel'
      ) {
        newStatusx = 'Cancel';
      }

      if (booking?.status !== 'Paid' && booking?.status !== 'Pending') {
        newStatusx = currentStatus;
      }
      const userData = {
        id: booking._id, // new
        place: booking.place,
        // place: booking.place?._id,
        room: booking?.room?._id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        numberOfGuests: booking.numberOfGuests,
        name: booking.name,
        phone: booking.phone,
        price: booking.price,
        paymentMethod: booking.paymentMethod,
        owner: booking.owner,
        status: newStatusx, // new update
      };

      console.log('userData:', userData);
      updateBookingsAutomatically(userData).then((response) => {
        console.log(response);
      });
    });
  };

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
                          {/* Total price: ${booking?.price} */}
                          Total price: $
                          {differenceInCalendarDays(
                            new Date(booking?.checkOut),
                            new Date(booking?.checkIn)
                          ) * booking.price}
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
