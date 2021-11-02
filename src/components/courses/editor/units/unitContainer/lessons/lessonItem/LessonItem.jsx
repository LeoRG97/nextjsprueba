import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import styles from './lessonItem.module.css';

// contenedor de una lección específica
const LessonItem = React.memo(({ data, index }) => {
  const { handleEditLessonModal } = useContext(CourseContext);

  const handleEdit = () => {
    handleEditLessonModal(data._id);
  };

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          className={styles.container}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className={styles.move}>
            <div className={styles.btn} {...provided.dragHandleProps}>4</div>
          </div>
          <div className={styles.outline}>
            <span className="icon icon--theme-secondary me-2">F</span>
            <p className="text-sm text--theme-secondary m-0">
              {data.nombre}
            </p>
          </div>
          <div className={styles.edit}>
            <button className={styles.btn}>0</button>
            <div className={styles.editDropdown}>
              <div className="drop-item" onClick={handleEdit}>
                <span className="drop-item__icon">K</span>
                <span className="drop-item__content">Modificar</span>
              </div>
              <div className="drop-item">
                <span className="drop-item__icon">L</span>
                <span className="drop-item__content">Eliminar</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
});

export default LessonItem;
