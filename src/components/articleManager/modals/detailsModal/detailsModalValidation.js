export const detailsValidation = ({
  titulo, descripcion, portada, categorias, reporte, infografia,
  rutaPortada,
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
  if (!portada && !rutaPortada) {
    errors.portada = 'La imagen de portada es requerida';
    errors.isValid = false;
  }
  if (categorias.length === 0) {
    errors.categorias = 'Selecciona al menos una categoría';
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
