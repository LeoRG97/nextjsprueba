import { BASE_URL } from '@/global/constants';
import vanillaAxios from 'axios';
import axios from './axios';

export const forgotPasswordService = async (email) => {
  try {
    const res = await axios().post('email/restore-password', {
      mailSend: email, subject: 'Reestablecer contraseña',
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const updatePassword = async (password, token) => {
  try {
    const res = await vanillaAxios.post(`${BASE_URL}auth/update/password`, { password },
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
