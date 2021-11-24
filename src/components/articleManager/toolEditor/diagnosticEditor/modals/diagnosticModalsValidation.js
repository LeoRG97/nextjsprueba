export const validateQuestionModal = ({ pregunta, tipo }) => {
  const errors = { isValid: true };

  if (!pregunta) {
    errors.pregunta = 'La pregunta es requerida';
    errors.isValid = false;
  }

  if (!tipo) {
    errors.tipo = 'Selecciona el tipo de respuesta';
    errors.isValid = false;
  }

  return errors;
};

export const validateAnswerForm = ({ valor, puntaje }) => {
  const errors = { isValid: true };

  if (!valor) {
    errors.valor = 'El título es requerido';
    errors.isValid = false;
  }

  if ((!puntaje && puntaje !== 0) || (puntaje < 0 || puntaje > 100)) {
    errors.puntaje = 'El puntaje debe ser entre 0 y 100';
    errors.isValid = false;
  }

  return errors;
};
