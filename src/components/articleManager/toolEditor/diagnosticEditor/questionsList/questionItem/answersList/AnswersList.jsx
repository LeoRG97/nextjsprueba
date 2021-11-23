import React from 'react';
import AnswerItem from './answerItem/AnswerItem';
import styles from './answersList.module.css';

const AnswersList = () => {
  return (
    <div className={styles.container}>
      <AnswerItem />
      <AnswerItem />
      <AnswerItem />
      <div className={styles.addBlock}>
        <p className="subtitle m-0">Insertar respuesta</p>
        <button
          className="icon-button icon-button--primary"
          onClick={() => {}}
        >
          Ñ
        </button>
      </div>
    </div>
  );
};

export default AnswersList;
