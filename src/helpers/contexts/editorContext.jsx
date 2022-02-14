import React, { createContext, useState } from 'react';

export const EditorContext = createContext();

const EditorContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    portada: '',
    videoUrl: '',
    categorias: [],
    destacado: false,
    premium: false,
    user_register: false,
    reporte: null,
    infografia: null,
    rutaPortada: '',
    rutaArticulo: '',
  });
  const [errors, setErrors] = useState({
    isValid: true,
  });

  return (
    <EditorContext.Provider value={{
      formData,
      setFormData,
      errors,
      setErrors,
    }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
