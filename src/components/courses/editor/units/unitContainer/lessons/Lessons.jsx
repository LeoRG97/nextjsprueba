import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import LessonItem from './lessonItem/LessonItem';
import styles from './lessons.module.css';

// listado de lecciones de la unidad
const Lessons = React.memo(({ lessons, unitId }) => {
  const { handleOpenLessonModal, handleSortLessons } = useContext(CourseContext);

  return (
    <div className={styles.container}>
      <DragDropContext
        onDragEnd={(e) => handleSortLessons(e, unitId)}
      >
        <Droppable droppableId={`canvas${unitId}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lessons.map((lesson, i) => {
                return (
                  <LessonItem key={lesson._id} data={lesson} index={i} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={styles.addBlock}>
        <p className="subtitle m-0">Nueva lección</p>
        <button
          className="icon-button icon-button--primary"
          onClick={() => handleOpenLessonModal(unitId)}
        >
          Ñ
        </button>
      </div>
    </div>
  );
});

export default Lessons;
