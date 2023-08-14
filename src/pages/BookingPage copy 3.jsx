import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';
import BookingDates from '../BookingDates';
import { getUserBookings } from '../services/apiService';
import { differenceInCalendarDays, format } from 'date-fns';

import { updateBookingsAutomatically } from '../services/apiService';

export default function BookingPage() {
  const newPaid = localStorage.getItem('newPaid')
    ? JSON.parse(localStorage.getItem('newPaid'))
    : null;

  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  const [numberOfNights, setNumberOfNights] = useState(null);

  const [newStatus, setNewStatus] = useState('');

  const [isBookingCompleted, setIsBookingCompleted] = useState(false);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    if (id) {
      getUserBookings().then((response) => {
        const foundBooking = response.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
          setIsBookingCompleted(true);
        }
        setBookings(foundBooking);
      });
    }
  }, [id]);

  useEffect(() => {
    if (isBookingCompleted) {
      setTimeout(() => {
        statusUpdate();
      }, 200);
    }
  }, [isBookingCompleted]);

  async function statusUpdate() {
    if (booking) {
      let checkIn = new Date(booking?.checkIn);
      let checkOut = new Date(booking?.checkOut);
      let currentTime = new Date(Date.now());

      let newStatusx;

      if (
        checkIn <= currentTime && // checkIn date is today or behind and checkout date has not reached yet
        checkOut >= currentTime
      ) {
        newStatusx = 'Active';
      }

      if (
        checkIn > currentTime && // checkIn date is ahead of now
        checkOut > currentTime // checkOut date is ahead of now
      ) {
        newStatusx = 'Inactive';
      }

      const userData = {
        id: booking?._id, // new
        place: booking?.place,
        // place: booking.place?._id,
        room: booking?.room?._id,
        checkIn: booking?.checkIn,
        checkOut: booking?.checkOut,
        numberOfGuests: booking?.numberOfGuests,
        name: booking?.name,
        phone: booking?.phone,
        price: booking?.price,
        paymentMethod: booking?.paymentMethod,
        owner: booking?.owner,
        status: newStatusx, // new update
      };

      console.log('userData:', userData);
      updateBookingsAutomatically(userData).then((response) => {
        console.log(response);
      });

      // setTimeout(() => {
      //   setRedirect(`/account/bookings/${booking?._id}`);
      // }, 2000);
    }
  }

  async function statusUpdateAll() {
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

  if (!booking) {
    return '';
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking?.room?.title}</h1>
      <AddressLink className="my-2 block">{booking?.room?.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="px-3 py-2 btn-primary text-2xl rounded-2xl">
          {booking?.status}
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking?.totalPrice}</div>
        </div>
      </div>

      <PlaceGallery place={booking?.room} />
    </div>
  );
}
