/* eslint-disable import/extensions */
import vanillaAxios from 'axios';
import { BASE_URL } from '@/global/constants';

export const getPreferencesService = async () => {
  try {
    const res = await vanillaAxios.get(`${BASE_URL}preferencias`);
    return res.data;
  } catch (err) {
    return err;
  }
};
