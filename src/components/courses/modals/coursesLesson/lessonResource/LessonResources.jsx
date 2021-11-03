import React from 'react';
import styles from '../detailsModal.module.css';

const LessonResources = ({ resources, onEdit, onDelete }) => {
  return (
    <>
      {resources.map((r) => (
        <div className={styles.resource} key={r._id}>
          <div className="d-flex align-items-center">
            <span className="icon me-2">{r.tipo === 'file' ? 'q' : 'l'}</span>
            <small className="text-sm text--theme-secondary">{r.nombre}</small>
          </div>
          <div className={styles.edit}>
            <span className={styles.btn}>0</span>
            <div className={styles.editDropdown}>
              <div className="drop-item" onClick={() => onEdit(r._id)}>
                <span className="drop-item__icon">K</span>
                <span className="drop-item__content">Modificar</span>
              </div>
              <div className="drop-item" onClick={() => onDelete(r._id)}>
                <span className="drop-item__icon">L</span>
                <span className="drop-item__content">Eliminar</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LessonResources;
