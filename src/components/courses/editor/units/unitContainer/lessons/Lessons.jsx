import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import LessonItem from './lessonItem/LessonItem';
import styles from './lessons.module.css';
import Toolbox from '@/components/editorComponents/toolbox/Toolbox';

// listado de lecciones de la unidad
const Lessons = React.memo(({ lessons, unitId }) => {
  const { handleNewLessonModal, handleSortLessons } = useContext(CourseContext);

  return (
    <div className={styles.paddingHorizontal}>
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
      <Toolbox
        toolsType="lesson"
        handleAddNew={() => handleNewLessonModal(unitId)}
      />
    </div>
  );
});

export default Lessons;
