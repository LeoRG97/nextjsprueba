import React from 'react';
import PropTypes from 'prop-types';
import styles from './toolbox.module.css';

/*
  Este componente renderiza un contenedor rectangular con borde punteado,
  el cual contendrá los componentes necesarios para agregar nuevos elementos al
  editor, los cuales se especifican en la propiedad "toolsType"
*/

const Toolbox = ({ handleAddNew, toolsType }) => {
  const getToolsbyType = () => {
    switch (toolsType) {
      case 'unit': {
        // herramientas para añadir nuevas unidades al editor
        return (
          <button
            className={`subtitle ${styles.button}`}
            onClick={handleAddNew}
          >
            Nueva unidad
          </button>
        );
      }
      case 'lesson': {
        // herramientas para añadir nuevas lecciones a una unidad del editor
        return (
          <div className={styles.spaceBetween}>
            <p className="subtitle m-0">Nueva lección</p>
            <button
              className="icon-button icon-button--primary"
              onClick={handleAddNew}
            >
              Ñ
            </button>
          </div>
        );
      }
      case 'question': {
        // herramientas para añadir nuevas preguntas al editor
        return (
          <button
            className={`subtitle ${styles.button}`}
            onClick={handleAddNew}
          >
            Insertar pregunta
          </button>
        );
      }
      case 'answer': {
        // herramientas para añadir nuevas respuestas a una pregunta del editor
        return (
          <div className={styles.spaceBetween}>
            <p className="subtitle m-0">Insertar respuesta</p>
            <button
              className="icon-button icon-button--primary"
              onClick={handleAddNew}
            >
              Ñ
            </button>
          </div>
        );
      }
      default: {
        return '';
      }
    }
  };
  return (
    <div className={styles.toolbox}>
      {getToolsbyType()}
    </div>
  );
};

Toolbox.propTypes = {
  handleAddNew: PropTypes.func,
  toolsType: PropTypes.string.isRequired,
};

Toolbox.defaultProps = {
  handleAddNew: () => {},
};

export default Toolbox;
