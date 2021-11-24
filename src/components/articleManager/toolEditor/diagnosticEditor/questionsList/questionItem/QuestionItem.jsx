import React from 'react';
import ListHeader from '@/components/editorComponents/editorListHeader/EditorListHeader';
import AnswersList from './answersList/AnswersList';

// título de una pregunta con su lista de respuestas
const QuestionItem = ({ item }) => {
  return (
    <>
      <ListHeader
        icon={item.tipo === 'unica' ? 'A' : 'u'}
        title={item.pregunta}
        titleDisabled
        onDelete={() => {}} // eliminar la pregunta con todas sus respuestas
        onUpdate={() => {}} // actualizar los datos de una pregunta en específico
      />
      <AnswersList
        answers={item.respuestas}
        questionId={item._id}
      />
    </>
  );
};

export default QuestionItem;
