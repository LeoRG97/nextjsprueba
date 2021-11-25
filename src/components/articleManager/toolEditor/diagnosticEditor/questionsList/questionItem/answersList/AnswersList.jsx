import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Toolbox from '@/components/editorComponents/toolbox/Toolbox';
import AnswerItem from './answerItem/AnswerItem';
import styles from './answersList.module.css';
import { ToolContext } from '@/helpers/contexts/toolContext';

// lista de respuestas dentro de una pregunta, con el toolbox para añadir nuevas respuestas
const AnswersList = ({ answers, questionId }) => {
  const { handleNewAnswerModal, handleSortAnswers } = useContext(ToolContext);

  const handleNewLesson = () => {
    handleNewAnswerModal(true, questionId);
  };

  return (
    <div className={styles.paddingHorizontal}>
      <DragDropContext
        onDragEnd={(e) => handleSortAnswers(e, questionId)}
      >
        <Droppable droppableId={`canvas${questionId}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {answers.map((answer, i) => (
                <AnswerItem
                  key={answer._id}
                  item={answer}
                  index={i}
                  questionId={questionId}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Toolbox
        toolsType="answer"
        buttonText="Insertar respuesta"
        handleAddNew={handleNewLesson}
      />
    </div>
  );
};

export default AnswersList;
