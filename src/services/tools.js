import axios from './axios';

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
      categoria: details.categoria,
      categoria_id: details.categoria_id,
      nombre: details.nombre,
      creditos: details.creditos,
      url_imagen: coverUrl,
      objetivo: details.objetivo,
      url_contenido: fileRes,
      premium: details.premium,
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
        // si ya hay una imagen, actualiza el registro actual
        const currentCoverKey = url_imagen.split('resources/')[1];
        coverUrl = await saveFile(details.portada, 'thinkTools/resources', currentCoverKey);
      } else {
        // de lo contrario guarda una imagen nueva
        coverUrl = await saveFile(details.portada, 'thinkTools/resources');
      }
    } else if (url_imagen) {
      coverUrl = url_imagen;
    }

    const toolData = {
      categoria: details.categoria,
      categoria_id: details.categoria_id,
      nombre: details.nombre,
      creditos: details.creditos || '',
      url_imagen: coverUrl,
      objetivo: details.objetivo,
      url_contenido: fileRes,
      premium: details.premium,
    };

    // guardar la información de la herramienta en la API
    const dataRes = await axios().put(`/herramientas/${initialData._id}`, { ...toolData });

    return dataRes;
  } catch (err) {
    throw Promise.reject(err);
  }
};

export const fetchToolById = async (id) => {
  const res = await axios().get(`herramientas/${id}`);
  return res.data;
};

export const fetchToolContent = async (id) => {
  const res = await axios().get(`herramientas/archivo/${id}`);
  return res.data;
};
