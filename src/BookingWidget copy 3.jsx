import { useEffect, useState } from 'react';
// import { differenceInCalendarDays } from 'date-fns';
import { differenceInCalendarDays, format } from 'date-fns';
// import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';

import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { createBooking } from './services/apiService';
import {
  selectType,
  selectCity,
  selectCheckIn,
  selectCheckOut,
  selectGuestNumber,
  selectGuestName,
  selectGuestPhone,
  selectIsPaymentCompleted,
  // } from './redux/features/auth/bookingSlice';
} from './redux/features/booking/bookingSlice';
import PreBookingDates from './PreBookingDates';
import { Notification } from './components/notification';

import { findUser } from './services/apiService';

export default function BookingWidget(props) {
  const { place, checkIn, checkOut, guestNumber, guestCity, roomType } = props;
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  console.log({ paymentOptions: paymentOptions });
  const [redirect, setRedirect] = useState('');
  const [currency, setCurrency] = useState('$');
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  let numberOfNights = 0;

  if (checkOut && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function BookThisPlace() {
    // setCompleted(false)
    const userData = {
      checkIn: checkIn,
      checkOut: checkOut,
      numberOfGuests: guestNumber,
      name,
      phone,
      place: place?.place, // placeId for room
      room: place?._id, // roomId
      numberOfNights,
      price: place?.price,
      // totalPrice: numberOfNights * place?.price,
      totalPrice:
        differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) *
        place?.price,
      paymentMethod,
      owner: place?.owner,
      // userId: currentUser._id,
    };

    console.log('userBookingdata', userData);
    const data = await createBooking(userData);
    if (data) {
      // console.log('bookingInfo', data);
      const bookingId = data?._id;
      console.log('bookingId:', bookingId);
      // setIsPaymentCompleted(false);

      // setCompleted(true)

      setTimeout(() => {
        setRedirect(`/account/bookings/${bookingId}`);
      }, 2000);
    }
  }

  // useEffect(() => {
  //   let payOptions = place?.paymentOptions;
  //   if (place?.paymentOptions && payOptions.length > 0) {
  //     setPaymentOptions(payOptions);
  //   }
  // });

  useEffect(() => {
    let payOptions = place?.paymentOptions;
    if (payOptions && payOptions.length > 0) {
      setPaymentOptions(payOptions);
    }
  });

  //==========={Original}=========================

  // async function BookThisPlace() {
  //   const response = await axios.post('/bookings', {
  //     checkIn,
  //     checkOut,
  //     numberOfGuests,
  //     name,
  //     phone,
  //     place: place._id,
  //     price: numberOfNights * place.price,
  //   });
  //   const userData = response.data;
  //   console.log('userBookingdata', userData);
  //   const bookingId = response.data._id;
  //   // setRedirect(`/account/bookings/${bookingId}`);
  // }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <p className="mt-6 text-lg font-bold text-gray-900 sm:mt-8 sm:text-2xl lg:text-xl xl:text-4xl">
        {' '}
        You are booking
        <br className="inline" />
        <span className="text-indigo-500 ml-2">{roomType}</span>
        {/* <br className="inline" /> */}
        <span className="ml-2">in</span>
        {/* <br className="inline" /> */}
        <span className="text-indigo-500 ml-2">{guestCity}</span>
      </p>
      <div className="text-gray-700 text-xs">
        {' '}
        Kindly confirm that you are making the right booking
      </div>

      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          {/* <PreBookingDates checkIn={activeCheckIn} checkOut={activeCheckOut} /> */}
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">
            $
            {differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) *
              place?.price}
          </div>
        </div>
      </div>

      {/* <div className='text-gray-700 text-xs'> {`Hi ${currentUser}, you are about booking a ${type} in ${city} now`} </div> */}
      <div className="text-2xl text-center">
        Price: ${place?.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>From: {checkIn}</label>
          </div>
          <div className="py-3 px-4 border-l">
            <label>To: {checkOut}</label>
          </div>
        </div>
        <div className="py-3 px-4 border-t"></div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="paymentMethod" className="text-lg text-gray-500">
                Payment:
              </label>
              <select
                name="paymentMethod"
                className="dropdown bg-gray-50 rounded-lg text-gray-500 border border-blue-700 hover:text-gray-900 focus:ring-1 focus:outline-none focus:ring-blue-500 px-2 py-1"
                value={paymentMethod}
                onChange={(ev) => setPaymentMethod(ev.target.value)}
              >
                <option value="">Choose Method</option>
                {paymentOptions?.map((payment, index) => (
                  <option key={index} value={payment}>
                    {payment}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      {isPaymentCompleted ? (
        <button
          onClick={() => {
            BookThisPlace();
            setIsPaymentCompleted(false);
          }}
          className="primary mt-4"
        >
          {/* Confirm payment this place */}
          Confirm payment
        </button>
      ) : (
        <button
          onClick={() => setIsBookingVisible(true)}
          className="primary mt-4"
        >
          {/* Book this place */}
          Book
        </button>
      )}

      {isBookingVisible ? (
        <>
          <div className="mt-10">
            <Notification
              price={place?.price}
              sender={name}
              payment={paymentMethod}
              currency={currency}
              setIsBookingVisible={setIsBookingVisible}
              visible={isBookingVisible}
              setIsPaymentCompleted={setIsPaymentCompleted}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
