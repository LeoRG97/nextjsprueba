import axios from './axios';

export const fetchData = async (...args) => {
  const res = await axios().get(args[0]);
  return res.data ? res.data : res;
};

export const fetchDataWithId = async (...args) => {
  const res = await axios().get(`${args[0]}/${args[1]}`);
  return res.data;
};

export const fetchPaginatedDataWithAuthToken = async (route, query, pageNum) => {
  const { category, type, sort } = query;
  const res = await axios().get(`${route}`, {
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
  const res = await axios().get(`${route}`, {
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
