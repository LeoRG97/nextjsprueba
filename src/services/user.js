/* eslint-disable import/extensions */
import { BASE_URL } from '@/global/constants';
import axios from './axios';

export const getExpertsSSR = async (params) => {
  const { pageSize, pageNum } = params;
  try {
    const res = await axios().get('users/expertos', {
      params: {
        pageSize: pageSize || 8,
        pageNum: pageNum || 1,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const updateUserProfile = async (idUser, data) => {
  try {
    const res = await axios().patch(`${BASE_URL}users/profile/${idUser}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};
