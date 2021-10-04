import axios from './axios';

export const updateNotesService = async (idNote, data) => {
  try {
    const res = await axios().put(`notas/${idNote}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteNotesService = async (idNote) => {
  try {
    const res = await axios().delete(`notas/${idNote}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const addNotesService = async (data) => {
  try {
    const res = await axios().post('notas', { ...data });
    return res;
  } catch (err) {
    return err;
  }
};
