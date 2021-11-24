import React, { useContext } from 'react';
import Toolbox from '@/components/editorComponents/toolbox/Toolbox';
import AnswerItem from './answerItem/AnswerItem';
import styles from './answersList.module.css';
import { ToolContext } from '@/helpers/contexts/toolContext';

// lista de respuestas dentro de una pregunta, con el toolbox para añadir nuevas respuestas
const AnswersList = ({ answers, questionId }) => {
  const { handleNewAnswerModal } = useContext(ToolContext);

  const handleNewLesson = () => {
    handleNewAnswerModal(true, questionId);
  };

  return (
    <div className={styles.paddingHorizontal}>
      {answers.map((answer, i) => (
        <AnswerItem
          key={answer._id}
          item={answer}
          index={i}
        />
      ))}
      <Toolbox
        toolsType="answer"
        buttonText="Insertar respuesta"
        handleAddNew={handleNewLesson}
      />
    </div>
  );
};

export default AnswersList;
