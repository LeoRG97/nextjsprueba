export const forumValidation = ({
  archivo, titulo, url, descripcion, imagen,
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
  if (url && !url.match('https://.*')) {
    errors.url = 'No es una dirección URL válida';
    errors.isValid = false;
  }
  if (!archivo && !imagen) {
    errors.archivo = 'La imagen de portada es requerida';
    errors.isValid = false;
  }

  return errors;
};
