import { useContext } from 'react';
import { UserToken } from '../Hooks/UserToken';

export const Logout = () => {
  const { token, setToken } = useContext(UserToken);

  token && localStorage.removeItem('token');
  setToken(null);
  return <h1>Bye</h1>;
};
