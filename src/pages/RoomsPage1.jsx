import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RoomImg from '../RoomImg';
import PlaceImg from '../PlaceImg';

import { getUserRooms } from '../services/apiService';
import RoomsFormPage from './RoomsFormPage';

// Admin only page
export default function RoomsPage({ place }) {
  const [rooms, setRooms] = useState([]);
  const [openRoom, setOpenRoom] = useState(false);

  const placeId = place?._id;

  // useEffect(() => {
  //   getUserRooms(placeId).then(({ data }) => {
  //     setRooms(data);
  //   });
  // }, []);

  useEffect(() => {
    getUserRooms(placeId).then((response) => {
      setRooms(response?.data);
    });
  }, []);

  //======{Original}==========
  // useEffect(() => {
  //   axios.get('/rooms/user-rooms').then(({ data }) => {
  //     setRooms(data);
  //   });
  // }, []);

  return (
    <>
      <div>
        <AccountNav />
        <div className="text-center">
          <button
            className="text-white bg-blue-500 px-2 py-1 rounded-lg"
            onClick={() => setOpenRoom(true)}
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
            Add new room
          </button>
          {/* <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={`/account/rooms/new`}
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
            Add new room
          </Link> */}
        </div>
        <div className="mt-4">
          {rooms &&
            rooms.length > 0 &&
            rooms.map((room, index) => (
              <Link
                key={index}
                // to={'/account/rooms/' + room._id}
                // onClick={()=>setRoomId(room?._id)}
                to={'/account/rooms/' + room._id}
                // to={`/account/rooms/${placeId}/${room?.roomNumber}`}
                className="flex cursor-pointer gap-4 p-4"
              >
                <div className="flex flex-row bg-gray-200 rounded-2xl overflow-hidden gap-10 ml-10 border border-gray-50 shadow-md">
                  {/* <div className="flex w-64 h-64 bg-gray-300 grow shrink-0">
                    <RoomImg room={room} />
                  </div> */}
                  <div className="flex w-64 h-64 bg-gray-300 grow shrink-0">
                    <PlaceImg place={room} />
                  </div>
                  <div className="grow-0 shrink flex flex-col justify-center items-center px-10">
                    <h2 className="text-xl text-gray-900">{room.roomNumber}</h2>
                    <p className="text-sm mt-2 text-gray-700">{room.type}</p>
                    <p className="text-sm mt-2 text-gray-700">{room.city}</p>
                    <p className="text-sm mt-2 text-gray-700">
                      Max Guest: {room.maxGuests}
                    </p>
                    <p className="text-sm mt-2 text-gray-700">
                      Available: {room.isAvailable.toString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <>{openRoom ? <RoomsFormPage place={ place }/> : null}</>
    </>
  );
}
