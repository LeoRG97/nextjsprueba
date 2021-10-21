import { upload } from './aws';
import axios from './axios';

export const saveArticlesResources = async (data) => {
  try {
    let reportRes = {};
    let infographicRes = {};
    let videoRes = {};

    if (data.reporte._id && !data.reporte.ruta) {
      // delete
      const res = await axios().delete(`recursos/${data.reporte._id}`);
      reportRes = res;
    } else if (data.reporte._id && data.reporte.ruta) {
      // update
      const res = await axios().put(`recursos/${data.reporte._id}`, data.reporte);
      reportRes = { ...res, data: { ...data.reporte } };
    } else if (data.reporte.ruta) {
      // save for the first time
      const res = await axios().post('recursos', data.reporte);
      reportRes = res;
    }

    if (data.infografia._id && !data.infografia.ruta) {
      const res = await axios().delete(`recursos/${data.infografia._id}`);
      infographicRes = res;
    } else if (data.infografia._id) {
      const res = await axios().put(`recursos/${data.infografia._id}`, data.infografia);
      infographicRes = { ...res, data: { ...data.infografia } };
    } else if (data.infografia && data.infografia.ruta) {
      const res = await axios().post('recursos', data.infografia);
      infographicRes = res;
    }

    if (data.video._id && !data.video.ruta) {
      const res = await axios().delete(`recursos/${data.video._id}`);
      videoRes = res;
    } else if (data.video._id) {
      const res = await axios().put(`recursos/${data.video._id}`, data.video);
      videoRes = { ...res, data: { ...data.video } };
    } else if (data.video && data.video.ruta) {
      const res = await axios().post('recursos', data.video);
      videoRes = res;
    }

    return {
      reporte: reportRes,
      infografia: infographicRes,
      video: videoRes,
    };
  } catch (err) {
    return err;
  }
};

export const saveResource = async (file, data, userId) => {
  try {
    const fileData = await upload(`${userId}/resources`, file);
    const ruta = fileData.file.split('.com/')[1];
    const res = await axios().post('recursos', { ...data, ruta });
    return res;
  } catch (err) {
    return err;
  }
};

export const getResourcesByReference = async (refId) => {
  try {
    const res = await axios().get(`recursos/referencia/${refId}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteResource = async (id) => {
  try {
    const res = await axios().delete(`recursos/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};
