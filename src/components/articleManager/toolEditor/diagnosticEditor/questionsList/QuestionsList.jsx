import React, { useContext } from 'react';
import Toolbox from '@/components/editorComponents/toolbox/Toolbox';
import QuestionItem from './questionItem/QuestionItem';
import { ToolContext } from '@/helpers/contexts/toolContext';

// lista de preguntas con toolbox para añadir una nueva
const QuestionsList = ({ questions }) => {
  const {
    setShowQuestionModal,
  } = useContext(ToolContext);

  const handleAddQuestion = () => {
    setShowQuestionModal(true);
  };

  return (
    <div>
      {
        questions.map((question, i) => (
          <QuestionItem
            key={question._id}
            item={question}
            index={i}
          />
        ))
      }
      <Toolbox
        toolsType="question"
        buttonText="Insertar pregunta"
        handleAddNew={handleAddQuestion}
      />
    </div>
  );
};

export default QuestionsList;
