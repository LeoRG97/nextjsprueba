import React, { useContext } from 'react';
import ListHeader from '@/components/editorComponents/editorListHeader/EditorListHeader';
import AnswersList from './answersList/AnswersList';
import { ToolContext } from '@/helpers/contexts/toolContext';

// título de una pregunta con su lista de respuestas
const QuestionItem = ({ item }) => {
  const { handleDeleteQuestion } = useContext(ToolContext);
  return (
    <>
      <ListHeader
        icon={item.tipo === 'unica' ? 'A' : 'u'}
        title={item.pregunta}
        titleDisabled
        onDelete={() => handleDeleteQuestion(item._id)}
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
