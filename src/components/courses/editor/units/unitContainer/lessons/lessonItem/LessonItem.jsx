import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import EditorListItem from '@/components/editorComponents/editorListItem/EditorListItem';

// contenedor de una lección específica
const LessonItem = React.memo(({ data, index }) => {
  const {
    handleEditLessonModal,
    handleDeltlessonModalLesson,
  } = useContext(CourseContext);

  const handleEdit = () => {
    handleEditLessonModal(data._id);
  };

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <EditorListItem
            itemText={data.nombre}
            icon="F"
            onUpdate={handleEdit}
            onDelete={() => handleDeltlessonModalLesson(data._id)}
            dragHandleProps={provided.dragHandleProps}
          />
        </div>
      )}
    </Draggable>
  );
});

export default LessonItem;
