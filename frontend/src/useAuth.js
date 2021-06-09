import { useState } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(localStorage.getItem('token'));
  };

  const saveToken = () => {
    setToken(localStorage.getItem('token'));
  };

  const logout = () => {
    token && localStorage.removeItem('token');
  };

  return {
    login,
    logout,
    token,
  };
};

export default useAuth;
