import React from 'react';
import PropTypes from 'prop-types';
import styles from './editorListHeader.module.css';
import EditDropdown from '../editDropdown/EditDropdown';

/*
  Este componente renderiza el encabezado de un grupo de elementos en una lista del editor.
  Se aplica para las Unidades en un curso y para las Preguntas en un diagnóstico
*/

const EditorListHeader = ({
  number,
  title,
  titlePlaceholder,
  icon,
  handleChangeTitle,
  titleDisabled,
  onUpdate,
  onDelete,
  dragHandleProps,
}) => {
  return (
    <div className={styles.listHeader}>
      <div className={styles.move}>
        {/* Botón para arrastrar el componente a otra posición en el editor */}
        <div className={styles.btn} {...dragHandleProps}>4</div>
      </div>
      <div className={`d-flex align-items-center ${styles.titleContainer}`}>
        <div className={styles.indexCircle}>
          {icon
            ? <span className="icon">{icon}</span>
            : <span className="text-regular text--theme-light">U{number}</span>}
        </div>
        <input
          type="text"
          className={`input ${styles.titleInput}`}
          placeholder={titlePlaceholder}
          value={title}
          disabled={titleDisabled} // dejar el input sólo de muestra
          onChange={handleChangeTitle} // editar directamente el contenido del input
        />
      </div>
      <div className={styles.edit}>
        {/* Dropdown que contiene las opciones para editar o eliminar el elemento */}
        <EditDropdown
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

EditorListHeader.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]), // índice que se mostrará a la izquierda del text input
  icon: PropTypes.string, // icono que se mostrará a la izquierda del text input
  title: PropTypes.string.isRequired, // contenido del text input
  titlePlaceholder: PropTypes.string, // placeholder del text input
  handleChangeTitle: PropTypes.func, // evento para cambiar directamente el value del text input
  titleDisabled: PropTypes.bool, // boolean para deshabilitar la edición del text input
  onUpdate: PropTypes.func, // función para editar el elemento del editor
  onDelete: PropTypes.func, // función para eliminar el elemento del editor
};

EditorListHeader.defaultProps = {
  number: 0,
  icon: '',
  titlePlaceholder: '',
  titleDisabled: false,
  handleChangeTitle: null,
  onUpdate: null,
  onDelete: null,
};

export default EditorListHeader;
