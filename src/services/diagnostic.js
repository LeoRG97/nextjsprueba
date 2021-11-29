import axios from './axios';

export const postDiagnostic = async (data) => {
  try {
    const res = await axios().post('diagnosticos', {
      ...data,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const fetchDiagnosticById = async (id) => {
  try {
    const res = await axios().get(`diagnosticos/${id}`);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const aviableDiagnostic = async (idTool, idUser) => {
  try {
    const res = await axios().get('diagnosticos/validacion/user', {
      params: {
        idHerramienta: idTool,
        idUser,
      },
    });
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};
