import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AddressLink from '../AddressLink';
import { getPlace } from '../services/apiService';

export default function PlacePage(props) {
  const { place, checkIn, checkOut, guestNumber, guestCity, roomType } = props;
  // console.log('expectedPlace:', place);

  let russiaTime = new Date().toLocaleString('en-Us', {
    timeZone: 'Europe/Moscow',
    timeStyle: 'short',
    hourCycle: 'h24',
  });
  let dubaiTime = new Date().toLocaleString('en-Us', {
    timeZone: 'Asia/Dubai',
    timeStyle: 'short',
    hourCycle: 'h24',
  });

  // new Date(checkOut?.checkOut)
  // let russiaCheckIn = new Date(place.checkIn)
  let russiaCheckIn = new Date(place.checkIn).toLocaleString('en-Us', {
    timeZone: 'Europe/Moscow',
    timeStyle: 'short',
    hourCycle: 'h12',
  });

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      {/* {placeLoading === true && ( */}
      <>
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />

        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          {/* <div>
                <div className="my-4">
                  <h2 className="font-semibold text-2xl">Description</h2>
                  {place.description}
                </div>
                Check-in: {place.checkIn}
                <br />
                Check-out: {place.checkOut}
                <br />
                Max number of guests: {place.maxGuests}
              </div> */}

          <div className="mt-4 w-[600px]">
            <BookingWidget
              place={place}
              checkIn={checkIn}
              checkOut={checkOut}
              guestNumber={guestNumber}
              guestCity={guestCity}
              // type={type}
              roomType={roomType}
            />
          </div>
        </div>

        {/* <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
          <div>
            <h1 className="flex flex-col gap-3 justify-center items-center ">
              Booking Information
            </h1>
            <h2 className="text-xl text-gray-900">
              ActiveUser: {activeUser?.name}
            </h2>
            <h2 className="text-xl text-gray-900">
              CheckIn: {checkIn?.checkIn}
            </h2>
            <h2 className="text-xl text-gray-900">
              CheckOut: {checkOut?.checkOut}
            </h2>
            <h2 className="text-xl text-gray-900">
              GuestNumber: {guestNumber?.guestNumber}
            </h2>
            <h2 className="text-xl text-gray-900">
              GuestName: {guestName?.guestName}
            </h2>
            <h2 className="text-xl text-gray-900">
              roomType: {roomType?.type}
            </h2>
            <h2 className="text-xl text-gray-900">
              guestCity: {guestCity?.city}
            </h2>
          </div>
        </div> */}
      </>
      {/* )} */}
      <>
        {/* <h2 className="text-xl text-gray-900">roomType: {roomType?.type}</h2>
        <h2 className="text-xl text-gray-900">guestCity: {guestCity?.city}</h2> */}
        {/* <h2 className="text-xl text-gray-900">Time in Russia: {russiaTime}</h2>
        <h2 className="text-xl text-gray-500">Time in Dubai: {dubaiTime}</h2> */}
        {/* <h2 className="text-xl text-gray-500">CheckIn Russia: {russiaCheckIn}</h2> */}
        {/* <h2 className="text-xl text-gray-500">CheckIn Dubai: {dubaiTime}</h2> */}
      </>
    </div>
  );
}
