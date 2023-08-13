import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//================={TODO}==========================================
// import Home from "./pages/Home/Home";
// import Forgot from "./pages/auth/Forgot";
// import Reset from "./pages/auth/Reset";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Sidebar from "./components/sidebar/Sidebar";
// import Profile from "./pages/profile/Profile";
// import EditProfile from "./pages/profile/EditProfile";
// import Contact from "./pages/contact/Contact";
//================={Intermediate}==========================================
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus } from './services/apiService';
import { SetLogin } from './redux/features/auth/authSlice';
//==============={AIR}======================================================
import './App.css';
import IndexPage from './pages/IndexPage.jsx';
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

import AgentBookingPage from './agentActions/AgentBookingPage';
import AgentBookingsPage from './agentActions/AgentBookingsPage';

// import AgentPlacesPage from './pages/AgentPlacesPage';
import AgentRegisterPage from './Agent/AgentRegisterPage';
import AgentLoginPage from './Agent/AgentLoginPage';

import LayoutAdmin from './LayoutAdmin';

import LayoutAgent from './LayoutAgent';
import LandingPageAgent from './pages/LandingPageAgent';
import LandingPageAdmin from './pages/LandingPageAdmin';

import ProfilePageAdmin from './pages/ProfilePageAdmin';
import ProfilePageAgent from './pages/ProfilePageAgent';
import IndexPageAdmin from './pages/IndexPageAdmin';
import IndexPageAgent from './pages/IndexPageAgent';

//==============={AIR}======================================================
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state?.auth?.role);
  // const auth = useSelector((state) => state?.auth);
  console.log({ role: role });
  // console.log({ user: auth });
  const name = useSelector((state) => state?.auth?.name);
  console.log({ name: name });
  const email = useSelector((state) => state?.auth?.email);
  console.log({ email: email });

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
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
          <Route index element={<IndexPage />} />
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
          <Route path="/admin/landingPage" element={<LandingPageAgent />} />

          {/* Show on login */}
          <Route path="/admin/account" element={<ProfilePageAdmin />} />

          {/* Admin and  Agents Only can list and update listings */}

          {/* ==================={Place}======================== */}
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />

          {/* ==================={Rooms}======================== */}
          <Route path="/account/rooms" element={<RoomsPage />} />
          <Route path="/account/rooms/new" element={<RoomsFormPage />} />
          <Route path="/account/rooms/:id" element={<RoomsFormPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>
        {/* ==================={AGENTS ONLY}======================== */}
        <Route path="/agent" element={<LayoutAgent />}>
          <Route index element={<IndexPageAgent />} />
          <Route path="/agent/landingPage" element={<LandingPageAdmin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Show on login */}
          <Route path="/agent/account" element={<ProfilePageAgent />} />

          {/* Admin and  Agents Only can list and update listings */}

          {/* ==================={Place}======================== */}
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />

          {/* ==================={Rooms}======================== */}
          <Route path="/account/rooms" element={<RoomsPage />} />
          <Route path="/account/rooms/new" element={<RoomsFormPage />} />
          <Route path="/account/rooms/:id" element={<RoomsFormPage />} />

          <Route path="/agent/register" element={<AgentRegisterPage />} />
          <Route path="/agent/login" element={<AgentLoginPage />} />
          <Route
            path="/account/agentbookings"
            element={<AgentBookingsPage />}
          />
          <Route
            path="/account/agentbookings/:id"
            element={<AgentBookingPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
