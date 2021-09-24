import axios from './axios';

// para consultar una lista completa o paginada de datos
export const fetchData = async (...args) => {
  const res = await axios().get(args[0]);
  return res;
};

// para recuperar un objeto específico mediante su ID
export const fetchItemById = async (...args) => {
  const res = await axios().get(`${args[0]}/${args[1]}`);
  return res;
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
  const {
    category, type, sort, search,
  } = query;
  const res = await axios().get(`${route}`, {
    params: {
      pageSize: 9,
      pageNum,
      ...(category && { categoria: category }),
      ...(type && { tipo: type }),
      ...(sort && { sort }),
      ...(search && { cadena: search }),
    },
  });
  return res;
};

export const fetchInvitationsData = async (...args) => {
  const res = await axios().get(args[0]);
  return res;
};
