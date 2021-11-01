export const validateLessonData = ({ nombre, video, descripcion }) => {
  const errors = { isValid: true };
  if (!nombre) {
    errors.nombre = 'Dato requerido';
    errors.isValid = false;
  }
  if (!video) {
    errors.video = 'Dato requerido';
    errors.isValid = false;
  }

  if (video && !(video.startsWith('<iframe') && video.endsWith('></iframe>'))) {
    errors.video = 'El código no es válido';
    errors.isValid = false;
  }

  if (!descripcion) {
    errors.descripcion = 'Dato requerido';
    errors.isValid = false;
  }

  return errors;
};

export const validateResourceData = ({
  nombre, descripcion, ruta,
}) => {
  const errors = { isValid: true };
  if (!nombre) {
    errors.nombre = 'Dato requerido';
    errors.isValid = false;
  }

  if (!descripcion) {
    errors.descripcion = 'Dato requerido';
    errors.isValid = false;
  }

  if (!ruta) {
    errors.ruta = 'Dato requerido';
    errors.isValid = false;
  }

  return errors;
};
