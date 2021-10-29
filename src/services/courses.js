import axios from './axios';

export const saveCourse = async (data) => {
  try {
    const res = await axios().post('cursos', data);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateCourse = async (id, data) => {
  try {
    const res = await axios().put(`cursos/${id}`, data);
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchCourseById = async (id) => {
  try {
    const res = await axios().get(`cursos/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

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

export const addCommentReply = async (comentarioId, comentData) => {
  try {
    const dataRes = await axios().post(`/comentarios-curso/respuesta/${comentarioId}`, {
      ...comentData,
    });
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const addValoracionRespuesta = async (comentarioId, respuestaId) => {
  try {
    const dataRes = await axios().post(
      `/comentarios-curso/valoracion-respuesta/${comentarioId}`, {
        respuestaId,
      },
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const deleteRespuesta = async (comentarioId, respuestaId) => {
  try {
    const dataRes = await axios().delete(
      `/comentarios-curso/respuesta/${comentarioId}`, { data: { respuestaId } },
    );
    return dataRes;
  } catch (error) {
    // console.error(error);
    return error;
  }
};

export const updateRespuesta = async (comentarioId, titulo, respuestaId) => {
  try {
    const dataRes = await axios().put(
      `/comentarios-curso/respuesta/${comentarioId}`, { titulo, respuestaId },
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};
