import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import AdminNav from '../AdminNav';
import { logoutUser } from '../services/apiService';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser'; // new

export default function ProfilePageAdmin() {
  const navigate = useNavigate();
  useRedirectLoggedOutUser('/admin/login'); // new

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isUser, setIsUser] = useState(false);

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
    await logoutUser();
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.setItem('user', JSON.stringify(null));
    navigate('/admin');
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
      ) : null}
    </div>
  );
}
