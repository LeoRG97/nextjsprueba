import React from 'react';
import Toolbox from '@/components/editorComponents/toolbox/Toolbox';
import QuestionItem from './questionItem/QuestionItem';

// lista de preguntas con toolbox para añadir una nueva
const QuestionsList = () => {
  return (
    <div>
      <QuestionItem />
      <Toolbox
        toolsType="question"
        buttonText="Insertar pregunta"
        handleAddNew={() => {}}
      />
    </div>
  );
};

export default QuestionsList;
