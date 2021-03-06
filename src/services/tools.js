import { ApiRoutes, BUCKET_URL } from '@/global/constants';
import { remove } from './aws';
import axios from './axios';

export const fetchToolsById = async (idTool) => {
  try {
    const res = await axios().get(`${ApiRoutes.Tools}/${idTool}`);
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

export const saveTool = async (article, details) => {
  let coverUrl = null;
  let fileRes = null;

  try {
    fileRes = await saveFile(article, 'thinkTools/posts');
    if (details.portada) {
      // enviar imagen de portada a S3
      coverUrl = await saveFile(details.portada, 'thinkTools/resources');
    }

    const toolData = {
      ...details,
      url_imagen: coverUrl,
      url_contenido: fileRes,
    };

    // guardar la información de la herramienta en la API
    const dataRes = await axios().post('/herramientas', { ...toolData });

    return dataRes;
  } catch (err) {
    throw Promise.reject(err);
  }
};

export const updateTool = async (article, details, initialData) => {
  let coverUrl = null;
  let fileRes = null;

  try {
    const { url_contenido, url_imagen } = initialData;
    const currentJsonKey = url_contenido.split('posts/')[1]; // obtener nombre del artículo
    fileRes = await saveFile(article, 'thinkTools/posts', currentJsonKey);
    if (details.portada) {
      if (url_imagen) {
        // si la herramienta ya tiene imagen, borrar el registro anterior
        await remove(`${BUCKET_URL}${url_imagen}`);
      }
      coverUrl = await saveFile(details.portada, 'thinkTools/resources');
    } else if (url_imagen) {
      coverUrl = url_imagen;
    }

    const toolData = {
      ...details,
      url_imagen: coverUrl,
      url_contenido: fileRes,
    };

    // guardar la información de la herramienta en la API
    const dataRes = await axios().put(`/herramientas/${initialData._id}`, { ...toolData });

    return dataRes;
  } catch (err) {
    throw Promise.reject(err);
  }
};

export const saveDiagnosticTool = async (data, toolId) => {
  try {
    const res = await axios().put(`herramientas/${toolId}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchToolById = async (id) => {
  const res = await axios().get(`herramientas/${id}`);
  return res.data;
};

export const fetchToolBySlug = async (slug) => {
  const res = await axios().get(`${ApiRoutes.Tools}/slug/${slug}`);
  return res;
};

export const fetchToolsContent = async (id) => {
  try {
    const res = await axios().get(`${ApiRoutes.Tools}/archivo/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchToolContent = async (id) => {
  const res = await axios().get(`herramientas/archivo/${id}`);
  return res.data;
};

export const fetchToolsCategories = async () => {
  const res = await axios().get('categorias-herramientas');
  return res.data;
};

export const fetchTools = async () => {
  const res = await axios().get('herramientas');
  return res.data;
};

export const deleteToolService = async (id) => {
  const res = await axios().delete(`herramientas/${id}`);
  return res;
};

export const updateToolFile = async (recursos, toolId) => {
  try {
    const dataRes = await axios().put(
      `/herramientas/${toolId}`, { recursos },
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};
