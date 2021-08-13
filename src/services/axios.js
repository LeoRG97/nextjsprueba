/* eslint-disable import/extensions */
// eslint-disable-next-line import/order
import { BASE_URL } from '@/global/constants';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/client';

const axiosInstance = () => {
  const config = axios.create();
  config.defaults.baseURL = BASE_URL;
  config.interceptors.request.use(async (request) => {
    const session = await getSession();
    request.headers.Authorization = session?.accessToken;
    return request;
  });
  config.interceptors.response.use((res) => res.data,
    async (error) => {
      if (error.response.status === 401) {
        signOut({ callbackUrl: `${window.location.origin}/login` });
        return error.response.data;
      }
      return false;
    });
  return config;
};

export default axiosInstance;
