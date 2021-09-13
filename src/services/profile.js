import vanillaAxios from 'axios';
import { BASE_URL } from '@/global/constants';
import axios from './axios';

export const getProfile = async (id) => {
  const res = await axios().get(`users/${id}`);
  return res;
};

export const updateEmail = async (data) => {
  const checkPass = { id: data.idUser, correo: data.email };
  const res = await axios().put('users/profile/', checkPass);
  return res;
};

export const updatePassword = async (id, data, token) => {
  const checkPass = { newPassword: data.newPassword, oldPassword: data.oldPassword };
  try {
    const res = await vanillaAxios.put(`${BASE_URL}users/profile/${id}`, checkPass,
      {
        headers: {
          Authorization: token,
        },
      });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateUserData = async (id, dataU) => {
  const userRes = await axios().patch(`users/${id}`, dataU);
  return userRes;
};

export const uploadImgProfile = async (path, file, name) => {
  const bodyFormData = new FormData();
  bodyFormData.append('path', path);
  bodyFormData.append('file', file);
  if (name) {
    bodyFormData.append('name', name);
  }
  try {
    const res = await axios().post(`${BASE_URL}aws/upload`, bodyFormData,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
    return res;
  } catch (err) {
    return err;
  }
};

export const getProfileBySlug = async (slug) => {
  const res = await axios().get(`users/slug/${slug}`);
  return res;
};
