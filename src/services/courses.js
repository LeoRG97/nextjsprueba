import { ApiRoutes, BUCKET_URL } from '@/global/constants';
import { remove, upload } from './aws';
import axios from './axios';

export const saveCourse = async (data, userId) => {
  try {
    let portada = '';
    if (data.archivoPortada) {
      const { file } = await upload(`${userId}/courses/images`, data.archivoPortada);
      const fileName = file.split('.com/')[1];
      portada = fileName;
    }
    const res = await axios().post('cursos', {
      ...data,
      portada,
      archivoPortada: null,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const updateCourse = async (id, data) => {
  try {
    let portada = '';
    if (data.archivoPortada) {
      await remove(`${BUCKET_URL}${data.portada}`);
      const { file } = await upload(`${data.autor}/courses/images`, data.archivoPortada);
      const fileName = file.split('.com/')[1];
      portada = fileName;
    } else if (data.portada) {
      portada = data.portada;
    }
    const course = {
      ...data,
      portada,
      archivoPortada: null,
    };
    const res = await axios().put(`cursos/${id}`, course);
    return { ...res, data: course };
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

export const getTotalCommentsCourse = async (courseId) => {
  try {
    const dataRes = await axios().get(
      `/comentarios-curso/curso/${courseId}/total`,
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

export const fetchCoursesSSR = async (query, estado) => {
  const {
    category, sort,
  } = query;
  try {
    const res = await axios().get(ApiRoutes.Cursos, {
      params: {
        estado,
        pageNum: 1,
        pageSize: 9,
        ...(category && { categoria: category }),
        ...(sort && { sort: sort === 'desc' ? 'desc' : 'asc' }),
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getCourseBySlug = async (slug) => {
  try {
    const res = await axios().get(`cursos/slug/${slug}`);
    return res;
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

export const fetchCoursesByUserPreferenceSSR = async (token, query) => {
  const { sort } = query;
  try {
    const res = await axios().get(ApiRoutes.CursosUserPreference, {
      params: {
        pageNum: 1,
        pageSize: 9,
        ...(sort && { sort: sort === 'desc' ? 'desc' : 'asc' }),
      },
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteCourse = async (id) => {
  try {
    const res = await axios().delete(`cursos/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const rateCourse = async (courseId, userId) => {
  try {
    const res = await axios().post(`cursos/likes/${courseId}`, { usuarioId: userId });
    return res;
  } catch (err) {
    return err;
  }
};

export const checkIfLikedThisCourse = async (idCourse, token) => {
  try {
    const res = await axios().get(`cursos/likes/${idCourse}`, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
