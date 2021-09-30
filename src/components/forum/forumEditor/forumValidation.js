export const forumValidation = ({
  archivo, titulo, url, descripcion,
}) => {
  const errors = {
    isValid: true,
  };

  if (!titulo) {
    errors.titulo = 'El título es requerido';
    errors.isValid = false;
  }
  if (!descripcion) {
    errors.descripcion = 'La descripción es requerida';
    errors.isValid = false;
  }
  if (!url) {
    errors.url = 'La URL del foro es requerida';
    errors.isValid = false;
  }
  if (!archivo) {
    errors.archivo = 'La imagen de portada es requerida';
    errors.isValid = false;
  }

  return errors;
};
