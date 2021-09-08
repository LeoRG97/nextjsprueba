/* eslint-disable import/extensions */
import { BASE_URL } from '@/global/constants';
import axios from './axios';

export const updateUserProfile = async (idUser, data) => {
  try {
    const res = await axios().patch(`${BASE_URL}users/profile/${idUser}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};
