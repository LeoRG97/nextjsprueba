export const detailsValidation = (formData, categorias, reporte, infografia) => {
  const errors = {
    isValid: true,
  };

  if (!formData.titulo) {
    errors.titulo = 'El título es requerido';
    errors.isValid = false;
  }
  if (!formData.descripcion) {
    errors.descripcion = 'La descripción es requerida';
    errors.isValid = false;
  }
  if (!formData.portada) {
    errors.portada = 'La imagen de portada es requerida';
    errors.isValid = false;
  }
  if (categorias.length === 0) {
    errors.categorias = 'Selecciona al menos una categoría';
    errors.isValid = false;
  }
  if (formData.videoUrl && !formData.videoUrl.match('https://.*')) {
    errors.videoUrl = 'No es una URL válida';
    errors.isValid = false;
  }
  if (reporte && (reporte.type !== 'image/jpeg' && reporte.type !== 'image/png' && reporte.type !== 'application/pdf')) {
    errors.reporte = 'Sólo se permiten JPEG, PNG y PDF';
    errors.isValid = false;
  }
  if (infografia && (infografia.type !== 'image/jpeg' && infografia.type !== 'image/png' && infografia.type !== 'application/pdf')) {
    errors.infografia = 'Sólo se permiten JPEG, PNG y PDF';
    errors.isValid = false;
  }

  return errors;
};
