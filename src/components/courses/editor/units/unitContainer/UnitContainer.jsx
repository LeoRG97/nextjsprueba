import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import Lessons from './lessons/Lessons';
import EditorListHeader from '@/components/editorComponents/editorListHeader/EditorListHeader';

// contenedor para una unidad específica
const UnitContainer = React.memo(({ data, index }) => {
  const { handleUnitName, handleDeltlessonModal } = useContext(CourseContext);
  const handleChange = (e) => {
    const { value } = e.target;
    handleUnitName(data._id, value);
  };

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <EditorListHeader
            number={data.numero}
            title={data.titulo}
            titlePlaceholder="Ingresa el título de la unidad"
            handleChangeTitle={handleChange}
            onDelete={() => handleDeltlessonModal(data._id)}
            dragHandleProps={provided.dragHandleProps}
          />
          <Lessons lessons={data.lessons} unitId={data._id} />
        </div>
      )}
    </Draggable>

  );
});

export default UnitContainer;
