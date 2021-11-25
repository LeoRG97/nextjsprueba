import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ListHeader from '@/components/editorComponents/editorListHeader/EditorListHeader';
import AnswersList from './answersList/AnswersList';
import { ToolContext } from '@/helpers/contexts/toolContext';

// título de una pregunta con su lista de respuestas
const QuestionItem = ({ item, index }) => {
  const { handleDeleteQuestion, handleEditQuestionModal } = useContext(ToolContext);
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <ListHeader
            icon={item.tipo === 'unica' ? 'A' : 'u'}
            title={item.pregunta}
            titleDisabled
            // eliminar la pregunta con base en su ID
            onDelete={() => handleDeleteQuestion(item._id)}
            // abrir modal para editar la pregunta
            onUpdate={() => handleEditQuestionModal(item._id)}
            dragHandleProps={provided.dragHandleProps}
          />
          <AnswersList
            answers={item.respuestas}
            questionId={item._id}
          />
        </div>
      )}
    </Draggable>
  );
};

export default QuestionItem;
