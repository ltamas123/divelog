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

export const getDives = async (userId) => {
  try {
    const response = await api.get(`/dive/${userId}`);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const getTimeLine = async (userId) => {
  try {
    const response = await api.get(`/dive/timeline/${userId}`);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const postDive = async (values, userId) => {
  try {
    await api.post(`/dive/${userId}`, values);
  } catch (error) {
    console.error();
  }
};

export const getStats = async (userId) => {
  try {
    const response = await api.get(`/dive/${userId}/stats`);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const getUser = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}/`);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const followUser = async (userId, followedUserId) => {
  try {
    await api.put(`/user/follow/${userId}?id=${followedUserId}`);
  } catch (error) {
    console.error();
  }
};
