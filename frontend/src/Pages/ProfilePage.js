import { useLocation } from 'react-router';
import { getUser, getDives } from '../api/apiCalls';
import { useState, useEffect } from 'react';
import DivesList from '../Components/DivesList';

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [dives, setDives] = useState();
  const location = useLocation();
  const userId = location.pathname.replace('/user/', '');

  useEffect(() => {
    const getUserInformation = async () => {
      setUser(await getUser(userId));
      setDives(await getDives(userId));
    };
    getUserInformation();
  }, [userId]);

  return user ? (
    <div class="container">
      <div class="row">
        <div class="col">
          <div>
            <img
              src="https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png"
              alt="Italian Trulli"
              width="300"
              height="300"
            />
          </div>
          <div> Name: {user.fullName}</div>
          <div>Email: {user.email}</div>
        </div>
        <div class="col-8">
          {' '}
          {dives ? <DivesList dives={dives} /> : 'loading'}
        </div>
      </div>
    </div>
  ) : (
    'No user found'
  );
};

export default ProfilePage;
