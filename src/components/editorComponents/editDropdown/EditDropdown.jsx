import React from 'react';
import PropTypes from 'prop-types';
import styles from './editDropdown.module.css';

/*
  Dropdown que contiene las opciones para modificar y/o eliminar un elemento
  de la pantalla del editor. La opción "Modificar" sólo se renderiza si se recibe
  el parámetro "onUpdate" y la opción "Eliminar" se muestra si se recibe "onDelete".
*/

const EditDropdown = ({ onUpdate, onDelete }) => {
  return (
    <div className={styles.hoverContainer}>
      <button className={styles.btn}>0</button>
      <div className={styles.editDropdown}>
        {onUpdate && (
          <div className="drop-item" onClick={onUpdate}>
            <span className="drop-item__icon">K</span>
            <span className="drop-item__content">Modificar</span>
          </div>
        )}
        {onDelete && (
          <div className="drop-item" onClick={onDelete}>
            <span className="drop-item__icon">L</span>
            <span className="drop-item__content">Eliminar</span>
          </div>
        )}
      </div>
    </div>
  );
};

EditDropdown.propTypes = {
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

EditDropdown.defaultProps = {
  onUpdate: null,
  onDelete: null,
};

export default EditDropdown;
