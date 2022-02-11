// import vanillaAxios from 'axios';
// import { BASE_URL } from '@/global/constants';
import { ApiRoutes, BUCKET_URL } from '@/global/constants';
import { remove } from './aws';
import axios from './axios';

export const fetchArticleById = async (id) => {
  try {
    const res = await axios().get(`articulos/${id}`);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchArticlesSSR = async (query) => {
  const {
    category, type, sort, pageSize,
  } = query;
  try {
    const res = await axios().get(ApiRoutes.Articles, {
      params: {
        pageNum: 1,
        pageSize: pageSize || 9,
        ...(category && { categoria: category }),
        ...(type && { tipo: type }),
        ...(sort && { sort: sort === 'desc' ? 'desc' : 'asc' }),
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchArticlesByUserPreferenceSSR = async (token, query) => {
  const { category, type, sort } = query;
  try {
    const res = await axios().get(ApiRoutes.ArticlesUserPreference, {
      params: {
        pageNum: 1,
        pageSize: 9,
        ...(category && { categoria: category }),
        ...(type && { tipo: type }),
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

export const fetchArticleContent = async (id) => {
  try {
    const res = await axios().get(`articulos/archivo/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const rateArticle = async (articleId, userId) => {
  try {
    const res = await axios().post(`articulos/likes/${articleId}`, { usuarioId: userId });
    return res;
  } catch (err) {
    return err;
  }
};

const saveFile = async (file, route, prevFileKey) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', route);
  if (prevFileKey) formData.append('name', prevFileKey);
  const coverRes = await axios().post('/aws/upload', formData);
  const fileKey = coverRes.file.split('.com/')[1];
  return fileKey;
};

export const saveArticle = async (article, details, option, userId) => {
  let coverUrl = null;
  let fileRes = null;

  let entryType = 'Blog';
  if (option === 'onlyVideo') {
    entryType = 'Video';
  } else if (option === 'onlyAudio') {
    entryType = 'Podcast';
  } else if (option === 'reporte') {
    entryType = 'Reporte';
  }

  try {
    fileRes = await saveFile(article, `${userId}/articles`);
    if (details.portada) {
      // enviar imagen de portada a S3
      coverUrl = await saveFile(details.portada, `${userId}/resources`);
    }

    const articleData = {
      ruta: fileRes || undefined,
      usuario_id: userId,
      categorias: details.categorias.map((c) => c._id),
      estatus: details.estatus,
      tipo: entryType,
      premium: details.premium,
      destacado: details.destacado,
      portada: {
        descripcion: details.descripcion || undefined,
        titulo: details.titulo || undefined,
        ruta_imagen: coverUrl || undefined,
      },
    };

    // guardar la información del artículo en la API
    const dataRes = await axios().post('/articulos', { ...articleData });

    return dataRes;
  } catch (err) {
    throw Promise.reject(err);
  }
};

export const updateArticle = async (article, details, userId, initialData) => {
  let fileRes = null;
  let coverUrl = null;

  try {
    const { ruta, portada } = initialData;
    const routeId = ruta.split('/articles')[0]; // obtener directorio base de S3
    const currentJsonKey = ruta.split('articles/')[1]; // obtener nombre del artículo
    fileRes = await saveFile(article, `${routeId}/articles`, currentJsonKey);
    if (details.portada) {
      if (portada.ruta_imagen) {
        await remove(`${BUCKET_URL}${portada.ruta_imagen}`);
      }
      coverUrl = await saveFile(details.portada, `${routeId}/resources`);
    } else if (portada && portada.ruta_imagen) {
      // o conservar imagen de portada actual
      coverUrl = portada.ruta_imagen;
    }

    const articleData = {
      ruta: fileRes,
      categorias: details.categorias,
      estatus: details.estatus,
      premium: details.premium,
      destacado: details.destacado,
      usuario_id_modificacion: userId,
      portada: {
        descripcion: details.descripcion || '',
        titulo: details.titulo || '',
        ruta_imagen: coverUrl || '',
      },
    };

    // guardar la información del artículo en la API
    const response = await axios().put(`/articulos/${initialData._id}`, { ...articleData });
    return { ...response, data: articleData };
  } catch (err) {
    throw Promise.reject(err);
  }
};

export const updateArticleResources = async (data, articleId) => {
  try {
    const response = await axios().put(`articulos/${articleId}`, {
      recursos: data,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getArticleBySlug = async (slug, token) => {
  if (token) {
    try {
      const res = await axios().get(`articulos/slug/${slug}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res[0]) {
        return res[0];
      }
      return undefined;
    } catch (error) {
      return error;
    }
  }
  try {
    const res = await axios().get(`articulos/slug/${slug}`);
    if (res[0]) {
      return res[0];
    }
    return undefined;
  } catch (error) {
    return error;
  }
};

export const getRelatedArticles = async (options) => {
  const params = {
    pageNum: options.pageNum,
    pageSize: options.pageSize,
    category: options.category,
  };
  try {
    const res = await axios().get(`articulos?categoria=${params.category}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getArtForHomeSSR = async () => {
  try {
    const res = await axios().get('articulos/destacados/home');
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteArticle = async (id) => {
  try {
    const res = await axios().delete(`articulos/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const postSaveThisArt = async (params, token) => {
  try {
    const res = await axios().post('guardados', params, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteSaveThisArt = async (idArt, token) => {
  try {
    const res = await axios().delete(`guardados/${idArt}`, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getMySaveArts = async (params, token) => {
  try {
    const res = await axios().post('guardados', params, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const searchMySaveArt = async (params, token) => {
  try {
    const res = await axios().put('guardados', params, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const checkIfLikedThisArt = async (idArt, token) => {
  try {
    const res = await axios().get(`articulos/likes/${idArt}`, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const addComment = async (comentData) => {
  try {
    const dataRes = await axios().post('/comentarios', {
      ...comentData,
    });
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const addCommentReply = async (comentarioId, comentData) => {
  try {
    const dataRes = await axios().post(`/comentarios/respuesta/${comentarioId}`, {
      ...comentData,
    });
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const addValoracionComentario = async (comentarioId) => {
  try {
    const dataRes = await axios().post(`/comentarios/valoracion-comentario/${comentarioId}`);
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const addValoracionRespuesta = async (comentarioId, respuestaId) => {
  try {
    const dataRes = await axios().post(
      `/comentarios/valoracion-respuesta/${comentarioId}`, { respuestaId },
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const deleteComentario = async (comentarioId) => {
  try {
    const dataRes = await axios().delete(
      `/comentarios/${comentarioId}`,
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const deleteRespuesta = async (comentarioId, respuestaId) => {
  try {
    const dataRes = await axios().delete(
      `/comentarios/respuesta/${comentarioId}`, { data: { respuestaId } },
    );
    return dataRes;
  } catch (error) {
    // console.error(error);
    return error;
  }
};

export const updateComentario = async (comentarioId, nvoComentario) => {
  try {
    const dataRes = await axios().put(
      `/comentarios/${comentarioId}`, { comentario: nvoComentario },
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const updateRespuesta = async (comentarioId, titulo, respuestaId) => {
  try {
    const dataRes = await axios().put(
      `/comentarios/respuesta/${comentarioId}`, { titulo, respuestaId },
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};
