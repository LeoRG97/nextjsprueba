/* eslint-disable import/extensions */
import vanillaAxios from 'axios';
import { BASE_URL } from '@/global/constants';

export const registerService = async (object) => {
  try {
    const res = await vanillaAxios.post(`${BASE_URL}auth/register`, { ...object });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
