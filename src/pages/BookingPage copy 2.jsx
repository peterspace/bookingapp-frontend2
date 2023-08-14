import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';
import BookingDates from '../BookingDates';
import { getUserBookings } from '../services/apiService';
import { differenceInCalendarDays, format } from 'date-fns';

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  const [numberOfNights, setNumberOfNights] = useState(null);

  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (id) {
      getUserBookings().then((response) => {
        const foundBooking = response.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

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
