import jwt_decode from 'jwt-decode';

const useDecode = () => {
  const getUserId = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.sub;
    return userId;
  };

  return {
    getUserId,
  };
};

export default useDecode;
