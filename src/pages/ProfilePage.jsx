import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
// import PlacesPage from './AdminPlacesPage';

import PlacesPage from './PlacesPage';
// import AgentPlacesPage from './AgentPlacesPage';

import AccountNav from '../AccountNav';
import AdminNav from '../AdminNav';
import { SetInitialState } from '../redux/features/auth/authSlice';
import { logoutUser } from '../services/apiService';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser'; // new
// import { selectRole } from '../redux/features/auth/authSlice';
// import axios from 'axios';
// AccountPage

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useRedirectLoggedOutUser('/login'); // new

  const userLocal = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  // const userRole = useSelector(selectRole);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isUser, setIsUser] = useState(false);
  // const name = useSelector((state) => state?.auth?.name);
  // const email = useSelector((state) => state?.auth?.email);
  // const role = useSelector((state) => state?.auth?.role);

  const [user, setUser] = useState(userLocal);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (user?.role === 'Admin') {
      setIsAdmin(true);
    } else if (user?.role === 'Agent') {
      setIsAgent(true);
    } else {
      setIsUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, isAgent, isUser]);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    // setIsLoggedIn(true);
    await logoutUser();
    // dispatch(SetLogin({ isLoggedIn: false }));
    dispatch(SetInitialState());
    navigate('/');
    // setIsLoggedIn(false);
    // setRedirect('/');
    // setUser(null);
  }

  return (
    <div>
      {isAdmin ? (
        <>
          <AdminNav />
          {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
              Logged in as {user?.name} ({user?.email})<br />
              <button onClick={logout} className="primary max-w-sm mt-2">
                Logout
              </button>
            </div>
          )}
          {subpage === 'places' && <PlacesPage />}
        </>
      ) : (
        <>
          <AccountNav />
          {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
              Logged in as {user?.name} ({user?.email})<br />
              <button onClick={logout} className="primary max-w-sm mt-2">
                Logout
              </button>
            </div>
          )}
          {subpage === 'places' && <PlacesPage />}
        </>
      )}
    </div>
  );
}
