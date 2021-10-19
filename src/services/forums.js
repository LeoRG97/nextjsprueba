import { ApiRoutes } from '@/global/constants';
import { upload } from './aws';
import axios from './axios';

export const fetchForums = async () => {
  try {
    const res = await axios().get(ApiRoutes.Forums);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const saveForum = async (data) => {
  try {
    const imgResult = await upload('forums/resources', data.archivo);

    const forumData = {
      ...data,
      imagen: imgResult.file.split('.com/')[1],
    };

    const res = await axios().post('foros', forumData);

    return res;
  } catch (error) {
    return error;
  }
};

export const updateForum = async (id, data) => {
  try {
    let imgResult = '';
    if (data.archivo) {
      const fileName = data.imagen ? data.imagen.split('resources/')[1] : '';
      imgResult = await upload('forums/resources', data.archivo, fileName);
    }

    const forumData = {
      ...data,
      imagen: imgResult ? imgResult.file.split('.com/')[1] : data.imagen,
    };

    const res = await axios().put(`foros/${id}`, forumData);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteForum = async (id) => {
  try {
    const res = await axios().delete(`foros/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
