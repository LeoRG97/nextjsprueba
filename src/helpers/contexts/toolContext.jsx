import React, { createContext, useState } from 'react';

export const ToolContext = createContext();

const ToolContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    creditos: '',
    portada: '',
    categoria_id: '',
    categoria: '',
    objetivo: '',
    premium: false,
    url_imagen: '',
  });
  const [errors, setErrors] = useState({
    isValid: true,
  });

  const [definition, setDefinition] = useState({ html: [] });
  const [usage, setUsage] = useState({ html: [] });

  return (
    <ToolContext.Provider value={{
      formData,
      setFormData,
      errors,
      setErrors,
      definition,
      setDefinition,
      usage,
      setUsage,
    }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export default ToolContextProvider;
