import React from 'react';
import styles from './answerItem.module.css';

const AnswerItem = () => {
  return (
    <div
      className={styles.container}
    >
      <div className={styles.move}>
        <div className={styles.btn}>4</div>
      </div>
      <div className={styles.outline}>
        <p className="text-sm text--theme-secondary m-0">
          Respuesta
        </p>
      </div>
      <div className={styles.edit}>
        <button className={styles.btn}>0</button>
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
  );
};

export default AnswerItem;
