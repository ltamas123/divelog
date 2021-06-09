import { useContext } from 'react';
import { UserToken } from './UserToken';

export const Logout = () => {
  const { token, setToken } = useContext(UserToken);

  token && localStorage.removeItem('token');
  setToken(null);
  return <h1>Bye</h1>;
};
