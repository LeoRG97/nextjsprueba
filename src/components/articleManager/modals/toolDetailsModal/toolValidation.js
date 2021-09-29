export const toolValidation = ({
  nombre, portada, categoria_id, objetivo, url_imagen,
}) => {
  const errors = {
    isValid: true,
  };

  if (!nombre) {
    errors.nombre = 'El nombre es requerido';
    errors.isValid = false;
  }
  if (!portada && !url_imagen) {
    errors.portada = 'La imagen es requerida';
    errors.isValid = false;
  }
  if (!categoria_id) {
    errors.categoria = 'Selecciona un propósito';
    errors.isValid = false;
  }
  if (!objetivo) {
    errors.objetivo = 'El objetivo es requerido';
    errors.isValid = false;
  }

  return errors;
};
