import React from 'react';
import PropTypes from 'prop-types';
import styles from './editorListItem.module.css';
import EditDropdown from '../editDropdown/EditDropdown';

/*
  Este componente se emplea para renderizar un elemento de rango menor en una sección
  de una lista del editor. Se utiliza en las Lecciones de un curso y en las Respuestas
  de un Diagnóstico
*/

const EditorListItem = ({
  itemText,
  icon,
  onUpdate,
  onDelete,
  dragHandleProps,
}) => {
  return (
    <div
      className={styles.container}
    >
      <div className={styles.move}>
        <div className={styles.btn} {...dragHandleProps}>4</div>
      </div>
      <div className={styles.outline}>
        {icon && <span className="icon icon--theme-secondary me-2">{icon}</span>}
        <p className="text-sm text--theme-secondary m-0">
          {itemText}
        </p>
      </div>
      <div className={styles.edit}>
        <EditDropdown
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

EditorListItem.propTypes = {
  itemText: PropTypes.string.isRequired, // contenido del ítem de la lista
  icon: PropTypes.string, // icono que antecederá al texto (opcional)
  onUpdate: PropTypes.func, // función para editar este ítem del editor
  onDelete: PropTypes.func, // función para eliminar este ítem del editor
};

EditorListItem.defaultProps = {
  icon: '',
  onUpdate: null,
  onDelete: null,
};

export default EditorListItem;
