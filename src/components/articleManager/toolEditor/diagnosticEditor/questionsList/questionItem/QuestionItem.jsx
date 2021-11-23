import React from 'react';
import ListHeader from '@/components/editorComponents/editorListHeader/EditorListHeader';
import AnswersList from './answersList/AnswersList';

// título de una pregunta con su lista de respuestas
const QuestionItem = () => {
  return (
    <>
      <ListHeader
        icon="A"
        title="Pregunta"
        titleDisabled
        onDelete={() => {}} // eliminar la pregunta con todas sus respuestas
        onUpdate={() => {}} // actualizar los datos de una pregunta en específico
      />
      <AnswersList />
    </>
  );
};

export default QuestionItem;
