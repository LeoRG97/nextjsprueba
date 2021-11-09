import React, { createContext, useEffect, useState } from 'react';

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
  const [contentValidated, setContentValidated] = useState(false);

  const [definition, setDefinition] = useState({ html: [] });
  const [justification, setJustification] = useState({ html: [] });
  const [usage, setUsage] = useState({ html: [] });

  useEffect(() => {
    const { html: definitionArray } = definition;
    const { html: justificationArray } = justification;
    const { html: usageArray } = usage;
    if (definitionArray.length > 0 || justificationArray.length > 0 || usageArray.length > 0) {
      setContentValidated(true);
    } else {
      setContentValidated(false);
    }
  }, [definition, justification, usage]);

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
      justification,
      setJustification,
      contentValidated,
    }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export default ToolContextProvider;
