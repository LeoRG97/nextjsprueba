import customAxios, { axiosServer } from './axios';

export const fetchData = async (...args) => {
  const res = await customAxios().get(args[0]);
  return res.data;
};

export const fetchPaginatedDataWithAuthToken = async (route, query, pageNum) => {
  const { category, type, sort } = query;
  const res = await customAxios().get(`${route}`, {
    params: {
      pageSize: 9,
      pageNum,
      ...(category && { categoria: category }),
      ...(type && { tipo: type }),
      ...(sort && { sort }),
    },
  });
  return res;
};

export const fetchPaginatedData = async (route, query, pageNum) => {
  const { category, type, sort } = query;
  const res = await axiosServer().get(`${route}`, {
    params: {
      pageSize: 9,
      pageNum,
      ...(category && { categoria: category }),
      ...(type && { tipo: type }),
      ...(sort && { sort }),
    },
  });
  return res.data;
};
