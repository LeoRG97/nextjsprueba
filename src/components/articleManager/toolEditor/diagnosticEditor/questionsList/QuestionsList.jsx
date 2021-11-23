import React from 'react';
import QuestionItem from './questionItem/QuestionItem';
import styles from './questionsList.module.css';

const QuestionsList = () => {
  return (
    <div>
      <QuestionItem />
      <div className={styles.addBlock}>

        <button
          className={`subtitle ${styles.btnNew}`}
          onClick={() => {}}
        >
          Insertar pregunta
        </button>
      </div>
    </div>
  );
};

export default QuestionsList;
