export const validateDiagnosticContent = (questions) => {
  if (questions.length < 4) {
    return { ok: false, message: 'Debes agregar al menos 4 preguntas al diagnóstico' };
  }

  const validated = !questions.some((question) => {
    return question.respuestas.length < 1;
  });

  return validated ? { ok: true } : { ok: false, message: 'Cada pregunta debe tener al menos una respuesta' };
};
