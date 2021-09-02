import { BASE_URL } from '@/global/constants';
import axios from './axios';

export const upload = async (path, name, file, token) => {
  const bodyFormData = new FormData();
  bodyFormData.append('path', path);
  bodyFormData.append('name', name);
  bodyFormData.append('file', file);
  try {
    const res = await axios().post(`${BASE_URL}aws/upload`, bodyFormData,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
    return res;
  } catch (err) {
    return err;
  }
};
