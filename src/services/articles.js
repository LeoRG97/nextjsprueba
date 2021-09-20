// import vanillaAxios from 'axios';
// import { BASE_URL } from '@/global/constants';
import { ApiRoutes } from '@/global/constants';
import axios from './axios';

export const fetchArticlesSSR = async (query) => {
  const { category, type, sort } = query;
  try {
    const res = await axios().get(ApiRoutes.Articles, {
      params: {
        pageNum: 1,
        pageSize: 9,
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

    return {
      articulo_id: dataRes._id,
      ruta_articulo: dataRes.ruta,
      ruta_portada: dataRes.portada.ruta_imagen || undefined,
    };
  } catch (err) {
    return err;
  }
};

export const updateArticle = async (article, details, userId, currentData) => {
  let fileRes = null;
  let coverUrl = null;
  // let reportUrl = null;
  // let infographicUrl = null;

  try {
    const currentJsonKey = currentData.ruta_articulo.split('articles/')[1];
    fileRes = await saveFile(article, `${userId}/articles`, currentJsonKey);
    if (details.portada) {
      // enviar imagen de portada a S3
      if (currentData.ruta_portada) {
        const currentCoverKey = currentData.ruta_portada.split('resources/')[1];
        coverUrl = await saveFile(details.portada, `${userId}/resources`, currentCoverKey);
      } else {
        coverUrl = await saveFile(details.portada, `${userId}/resources`);
      }
    }

    const articleData = {
      ruta: fileRes,
      categorias: details.categorias,
      estatus: details.estatus,
      premium: details.premium,
      destacado: details.destacado,
      portada: {
        descripcion: details.descripcion || '',
        titulo: details.titulo || '',
        ...(coverUrl && { ruta_imagen: coverUrl }),
      },
    };

    // guardar la información del artículo en la API
    await axios().put(`/articulos/${currentData.articulo_id}`, { ...articleData });

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
    return {
      ...currentData,
      ...(!currentData.ruta_portada && { ruta_portada: coverUrl }),
    };
  } catch (err) {
    return err;
  }
};

export const getArticleBySlug = async (slug) => {
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
