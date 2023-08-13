import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//================={Intermediate}==========================================
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus } from './services/apiService';
import { SetLogin } from './redux/features/auth/authSlice';
//==============={AIR}======================================================
import './App.css';
// import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import RoomsPage from './pages/RoomsPage';
import RoomsFormPage from './pages/RoomsFormPage';
// import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import AdminRegisterPage from './Admin/AdminRegisterPage';
import AdminLoginPage from './Admin/AdminLoginPage';
import LandingPage from './pages/LandingPage';

import LayoutAdmin from './LayoutAdmin';

import ProfilePageAdmin from './pages/ProfilePageAdmin';
import IndexPageAdmin from './pages/IndexPageAdmin';
import AdminBookingsPage from './Admin/AdminBookingsPage';
import AdminBookingPage from './Admin/AdminBookingPage';

import Home from './components/home/Home';

//==============={AIR}======================================================
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      localStorage.setItem('isLoggedIn', JSON.stringify(status));
      dispatch(SetLogin(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* AIR */}
        {/* ==================={USERS ONLY}======================== */}
        <Route path="/" element={<Layout />}>
          {/* Show to all */}

          <Route index element={<Home />} />

          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Show on login */}
          <Route path="/account" element={<ProfilePage />} />
          {/* userOnly Routes */}
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
        {/* ==================={ADMIN ONLY}======================== */}
        <Route path="/admin" element={<LayoutAdmin />}>
          {/* Show to all */}
          <Route index element={<IndexPageAdmin />} />
          {/* <Route path="/admin/landingPage" element={<LandingPageAdmin />} /> */}

          {/* Show on login */}
          <Route path="/admin/account" element={<ProfilePageAdmin />} />

          {/* Admin and  Agents Only can list and update listings */}

          {/* ==================={Place}======================== */}
          <Route path="/admin/account/places" element={<PlacesPage />} />
          <Route
            path="/admin/account/places/new"
            element={<PlacesFormPage />}
          />
          <Route
            path="/admin/account/places/:id"
            element={<PlacesFormPage />}
          />

          {/* ==================={Rooms}======================== */}
          <Route path="/admin/account/rooms" element={<RoomsPage />} />
          <Route path="/admin/account/rooms/new" element={<RoomsFormPage />} />
          <Route path="/admin/account/rooms/:id" element={<RoomsFormPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/account/agentbookings"
            element={<AdminBookingsPage />}
          />
          <Route
            path="/admin/account/agentbookings/:id"
            element={<AdminBookingPage />}
          />
        </Route>
        {/* ==================={AGENTS ONLY}======================== */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
