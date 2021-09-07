import axios from './axios';

export const fetcher = async (route, query) => {
  const { category, type } = query;
  const res = await axios().get(route, {
    params: {
      ...(category && { categoria: category }),
      ...(type && { tipo: type }),
    },
  });
  return res.data;
};
