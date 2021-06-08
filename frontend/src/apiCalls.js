import api from './api';

export const userLogin = async (value, { token, setToken }) => {
  try {
    const response = await api.post('/login', value);
    localStorage.setItem('token', response.data.token);
    setToken(localStorage.getItem('token'));
  } catch (error) {
    console.log(error);
  }
};
/*
const handleResponse = (response, { token, setToken }) => {
  localStorage.setItem('token', response.data.token);
  setToken(localStorage.getItem('token'));
};
*/

export const getUserId = async ({ userId, setUserId }) => {
  try {
    const response = await api.get(`/user/1/`);
    setUserId(response.data);
    console.log(response);
  } catch (error) {
    console.error();
  }
};

export const getDives = async (userId) => {
  try {
    const response = await api.get(`/dive/${userId}`);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const postDive = async (userId, values) => {
  try {
    await api.post(`/dive/${userId}`, values);
  } catch (error) {
    console.error();
  }
};
