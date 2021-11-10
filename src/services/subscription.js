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

export const getSubscriptionsUser = async (data, token) => {
  try {
    const res = await axios().put('subscripciones/', data, {
      headers: {
        Authorization: token,
      },
    });
    return res.data[0] || res;
  } catch (error) {
    return error;
  }
};

export const postSubscLection = async (subsID, data) => {
  try {
    const res = await axios().post(`subscripciones/complete/${subsID}`, {
      ...data,
    });
    return res;
  } catch (error) {
    return error;
  }
};
