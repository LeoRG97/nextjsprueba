import axios from './axios';

export const addComment = async (comentData) => {
  try {
    const dataRes = await axios().post('/comentarios-curso', {
      ...comentData,
    });
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const addValoracionComentario = async (comentarioId) => {
  try {
    const dataRes = await axios().post(`/comentarios-curso/valoracion-comentario/${comentarioId}`);
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const updateComentario = async (comentarioId, nvoComentario) => {
  try {
    const dataRes = await axios().put(
      `/comentarios-curso/${comentarioId}`, { comentario: nvoComentario },
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const deleteComentario = async (comentarioId) => {
  try {
    const dataRes = await axios().delete(
      `/comentarios-curso/${comentarioId}`,
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};
