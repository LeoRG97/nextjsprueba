import axios from './axios';

export const getProfile = async (id) => {
  const res = await axios().get(`users/${id}`);
  return res;
};
