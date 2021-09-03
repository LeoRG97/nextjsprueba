import { BASE_URL } from '@/global/constants';
import axios from './axios';

export const upload = async (path, file, name) => {
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

export const remove = async (urlFile) => {
  try {
    const res = await axios().delete(`${BASE_URL}aws/remove`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          file: urlFile,
        },
      });
    return res;
  } catch (err) {
    return err;
  }
};
