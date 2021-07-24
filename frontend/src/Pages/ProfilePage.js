import { useLocation } from 'react-router';
import { getUser, getDives, followUser } from '../api/apiCalls';
import { useState, useEffect } from 'react';
import DivesList from '../Components/DivesList';
import useDecode from '../Hooks/useDecode';

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [dives, setDives] = useState();
  const [isFollowed, setIsFollowed] = useState(false);
  const { getUserId } = useDecode();
  const location = useLocation();
  const userId = location.pathname.replace('/user/', '');
  const loggedInUserId = getUserId();

  const onFollowClick = async () => {
    setUser(await followUser(loggedInUserId, userId));
    console.log(user);
  };

  useEffect(() => {
    const getUserInformation = async () => {
      setUser(await getUser(userId));
      setDives(await getDives(userId));
    };
    getUserInformation();
    console.log(loggedInUserId);
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
          {userId !== loggedInUserId && (
            <button
              type="button"
              class="btn btn-success"
              onClick={onFollowClick}
            >
              {user.followers.includes(loggedInUserId) ? 'Unfollow' : 'Follow'}
            </button>
          )}
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
