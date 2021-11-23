import React from 'react';
import AnswersList from './answersList/AnswersList';
import styles from './questionItem.module.css';

const QuestionItem = () => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.move}>
          <div className={styles.btn}>4</div>
        </div>
        <div className={`d-flex align-items-center ${styles.titleContainer}`}>
          <div className={styles.headerIcon}>
            <span className="icon">A</span>
          </div>
          <h2 className="title m-0">Pregunta</h2>
        </div>
        <div className={styles.edit}>
          <button className={styles.btn}>
            0
          </button>
          <div className={styles.editDropdown}>
            <div className="drop-item" onClick={() => {}}>
              <span className="drop-item__icon">K</span>
              <span className="drop-item__content">Modificar</span>
            </div>
            <div className="drop-item" onClick={() => {}}>
              <span className="drop-item__icon">L</span>
              <span className="drop-item__content">Eliminar</span>
            </div>
          </div>
        </div>
      </div>

      <AnswersList />

    </div>
  );
};

export default QuestionItem;
