import { useState } from 'react';
import { Link } from 'react-router-dom';
// import {useContext} from "react";
// import {UserContext} from "./UserContext.jsx";
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import SearchMenu from './components/header/SearchMenu';
import LandingPage from './pages/LandingPage';

export default function Header() {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const name = useSelector((state) => state?.auth?.name);

  return (
    <>
      <header className="w-full flex py-6 justify-between items-center navbar">
        <Link to={'/'} className="flex items-center gap-1 ml-6">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg> */}
          <span className="font-bold text-xl">Crib.com</span>
        </Link>
        <div className="flex flex-row gap-6">
          <Link to="/login">
            <span className="text-base font-normal"> User</span>
          </Link>
          <Link to="/register/admin">
            <span className="text-base font-normal"> Admin</span>
          </Link>
          <Link to="/register/agent">
            <span className="text-base font-normal"> Agent</span>
          </Link>
        </div>

        <Link
          to={isLoggedIn ? '/account' : '/login'}
          className="flex items-center gap-2 py-2 px-4 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-gray-700 font-bold">{name && name}</div>
        </Link>
      </header>
      <SearchMenu />
    </>
  );
}