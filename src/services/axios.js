/* eslint-disable import/extensions */
import vanillaAxios from 'axios';
import { getSession, signOut } from 'next-auth/client';
import { BASE_URL } from '@/global/constants';

const axios = () => {
  const config = vanillaAxios.create();
  config.defaults.baseURL = BASE_URL;
  config.interceptors.request.use(async (request) => {
    const session = await getSession({ request });
    request.headers.Authorization = session?.accessToken;
    return request;
  });
  config.interceptors.response.use((res) => res.data,
    async (error) => {
      if (error.response.status === 401) {
        signOut({ callbackUrl: `${window.location.origin}/login` });
      }
      return Promise.reject(error.response.data);
    });
  return config;
};

export default axios;
