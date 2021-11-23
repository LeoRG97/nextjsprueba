import React from 'react';
import Toolbox from '@/components/editorComponents/toolbox/Toolbox';
import AnswerItem from './answerItem/AnswerItem';
import styles from './answersList.module.css';

// lista de respuestas dentro de una pregunta, con el toolbox para añadir nuevas respuestas
const AnswersList = () => {
  return (
    <div className={styles.paddingHorizontal}>
      <AnswerItem />
      <Toolbox
        toolsType="answer"
        buttonText="Insertar respuesta"
        handleAddNew={() => {}}
      />
    </div>
  );
};

export default AnswersList;
