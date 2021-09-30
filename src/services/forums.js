import { ApiRoutes } from '@/global/constants';
import { upload } from './aws';
import axios from './axios';

export const fetchForums = async () => {
  try {
    const res = await axios().get(ApiRoutes.Forums);
    return res.data;
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
