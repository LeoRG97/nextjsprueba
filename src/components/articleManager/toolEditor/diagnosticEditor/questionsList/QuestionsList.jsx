import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Toolbox from '@/components/editorComponents/toolbox/Toolbox';
import QuestionItem from './questionItem/QuestionItem';
import { ToolContext } from '@/helpers/contexts/toolContext';

// lista de preguntas con toolbox para añadir una nueva
const QuestionsList = ({ questions }) => {
  const {
    setShowQuestionModal,
    handleSortQuestions,
  } = useContext(ToolContext);

  const handleAddQuestion = () => {
    setShowQuestionModal(true);
  };

  return (
    <div>
      <DragDropContext
        onDragEnd={handleSortQuestions}
      >
        <Droppable droppableId="questionsCanvas">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                questions.map((question, i) => (
                  <QuestionItem
                    key={question._id}
                    item={question}
                    index={i}
                  />
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Toolbox
        toolsType="question"
        buttonText="Insertar pregunta"
        handleAddNew={handleAddQuestion}
      />
    </div>
  );
};

export default QuestionsList;
