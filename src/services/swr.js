import customAxios from './axios';

export const fetchData = async (...args) => {
  const res = await customAxios().get(args[0]);
  return res.data;
};
