export const validateCourseData = ({
  titulo,
  url_presentacion,
  categorias,
  portada,
  archivoPortada,
}) => {
  const errors = { isValid: true };

  if (!titulo) {
    errors.titulo = 'El título es requerido';
    errors.isValid = false;
  }

  if (url_presentacion && !(url_presentacion.startsWith('<iframe') && url_presentacion.endsWith('></iframe>'))) {
    errors.url_presentacion = 'El video debe ser un iframe válido';
    errors.isValid = false;
  }

  if (categorias.length === 0) {
    errors.categorias = 'Selecciona una categoría';
    errors.isValid = false;
  }

  if (!portada && !archivoPortada) {
    errors.portada = 'La imagen de portada es requerida';
    errors.isValid = false;
  }

  return errors;
};
