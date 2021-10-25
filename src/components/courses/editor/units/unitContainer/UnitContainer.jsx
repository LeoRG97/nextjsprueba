import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import Lessons from './lessons/Lessons';
import styles from './unitContainer.module.css';

// contenedor para una unidad específica
const UnitContainer = React.memo(({ data, index }) => {
  const { handleUnitName } = useContext(CourseContext);
  const handleChange = (e) => {
    const { value } = e.target;
    handleUnitName(data.no_unidad, value);
  };

  return (
    <Draggable draggableId={data.editorIndex} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className={styles.unitHeader}>
            <div className={styles.move}>
              <div className={styles.btn} {...provided.dragHandleProps}>4</div>
            </div>
            <div className={`d-flex align-items-center ${styles.titleContainer}`}>
              <div className={styles.unitIndex}>
                <span className="text-regular text--theme-light">U{data.no_unidad}</span>
              </div>
              <input
                type="text"
                className={`input ${styles.titleInput}`}
                placeholder="Ingresa el título de la unidad"
                value={data.nombre}
                onChange={handleChange}
              />
            </div>
            <div className={styles.edit}>
              <button className={styles.btn}>
                0
              </button>
              <div className={styles.editDropdown}>
                <div className="drop-item">
                  <span className="drop-item__icon">L</span>
                  <span className="drop-item__content">Eliminar</span>
                </div>
              </div>
            </div>
          </div>
          <Lessons lessons={data.lessons} unitNumber={data.no_unidad} />
        </div>
      )}
    </Draggable>

  );
});

export default UnitContainer;
