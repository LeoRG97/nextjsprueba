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

export const updateUser = async (idUser, data) => {
  try {
    const res = await axios().patch(`${BASE_URL}users/${idUser}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};

export const activateUserEmail = async (data) => {
  try {
    const res = await axios().post(`${BASE_URL}users/activate`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};
