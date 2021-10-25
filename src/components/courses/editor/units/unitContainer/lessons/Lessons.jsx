import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import LessonItem from './lessonItem/LessonItem';
import styles from './lessons.module.css';

// listado de lecciones de la unidad
const Lessons = React.memo(({ lessons, unitNumber }) => {
  return (
    <div className={styles.container}>
      <DragDropContext>
        <Droppable droppableId={`canvas${unitNumber}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lessons.map((lesson, i) => {
                return (
                  <LessonItem key={lesson.editorIndex} data={lesson} index={i} />
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
        >
          Ñ
        </button>
      </div>
    </div>
  );
});

export default Lessons;
