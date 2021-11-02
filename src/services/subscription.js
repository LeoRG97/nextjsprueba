import axios from './axios';

export const createSubscriptionService = async (data) => {
  try {
    const res = await axios().post('subscripciones', { ...data });
    return res;
  } catch (err) {
    return err;
  }
};

export const checkIfSuscribeThisCourse = async (data) => {
  try {
    const res = await axios().put('subscripciones', { ...data });
    return res;
  } catch (err) {
    return err;
  }
};
