import { ApiRoutes } from '@/global/constants';
import axios from './axios';

export const fetchForums = async () => {
  try {
    const res = await axios().get(ApiRoutes.Forums);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
