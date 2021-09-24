// import vanillaAxios from 'axios';
// import { BASE_URL } from '@/global/constants';
import { ApiRoutes } from '@/global/constants';
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
  // let reportUrl = null;
  // let infographicUrl = null;

  let entryType = 'Blog';
  if (option === 'onlyVideo') {
    entryType = 'Video';
  } else if (option === 'onlyAudio') {
    entryType = 'Podcast';
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

    // if (details.reporte) {
    //   // subir reporte a S3
    //   reportUrl = await saveFile(details.reporte, `${userId}/resources`);

    //   const reportData = {
    //     nombre: details.reporte.name,
    //     articulo_id: dataRes._id,
    //     tipo: details.reporte.type,
    //     ruta: reportUrl,
    //     key: reportUrl,
    //   };

    //   const reportRes = await axios().post('/recursos', { ...reportData });
    //   console.log('REPORTE', reportRes);
    // }

    // if (details.infografia) {
    //   // subir infografía a S3
    //   infographicUrl = await saveFile(details.infografia, `${userId}/resources`);

    //   const infographicData = {
    //     nombre: details.infografia.name,
    //     articulo_id: dataRes._id,
    //     tipo: details.infografia.type,
    //     ruta: infographicUrl,
    //     key: infographicUrl,
    //   };
    //   const infographicRes = await axios().post('/recursos', { ...infographicData });
    //   console.log('INFOGRAFIA', infographicRes);
    // }

    return dataRes;
  } catch (err) {
    throw Promise.reject(err);
  }
};

export const updateArticle = async (article, details, userId, initialData) => {
  let fileRes = null;
  let coverUrl = null;
  // let reportUrl = null;
  // let infographicUrl = null;

  try {
    const { ruta, portada } = initialData;
    const routeId = ruta.split('/articles')[0]; // obtener directorio base de SE
    const currentJsonKey = ruta.split('articles/')[1]; // obtener nombre del artículo
    fileRes = await saveFile(article, `${routeId}/articles`, currentJsonKey);
    if (details.portada) {
      // reemplazar imagen de portada
      if (portada && portada.ruta_imagen) {
        const currentCoverKey = portada.ruta_imagen.split('resources/')[1]; // obtener nombre de la imagen
        coverUrl = await saveFile(details.portada, `${routeId}/resources`, currentCoverKey);
      } else {
        coverUrl = await saveFile(details.portada, `${routeId}/resources`);
      }
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

    // if (details.reporte) {
    //   // subir reporte a S3
    //   reportUrl = await saveFile(details.reporte, `${userId}/resources`);

    //   const reportData = {
    //     nombre: details.reporte.name,
    //     articulo_id: dataRes._id,
    //     tipo: details.reporte.type,
    //     ruta: reportUrl,
    //     key: reportUrl,
    //   };

    //   const reportRes = await axios().post('/recursos', { ...reportData });
    //   console.log('REPORTE', reportRes);
    // }

    // if (details.infografia) {
    //   // subir infografía a S3
    //   infographicUrl = await saveFile(details.infografia, `${userId}/resources`);

    //   const infographicData = {
    //     nombre: details.infografia.name,
    //     articulo_id: dataRes._id,
    //     tipo: details.infografia.type,
    //     ruta: infographicUrl,
    //     key: infographicUrl,
    //   };
    //   const infographicRes = await axios().post('/recursos', { ...infographicData });
    //   console.log('INFOGRAFIA', infographicRes);
    // }
    return response;
  } catch (err) {
    throw Promise.reject(err);
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
