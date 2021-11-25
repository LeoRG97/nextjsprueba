import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ListItem from '@/components/editorComponents/editorListItem/EditorListItem';
import { ToolContext } from '@/helpers/contexts/toolContext';

// ítem de una respuesta en específico
const AnswerItem = ({ item, questionId, index }) => {
  const { handleDeleteAnswer, handleEditAnswerModal } = useContext(ToolContext);
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <ListItem
            itemText={item.valor}
            onUpdate={() => handleEditAnswerModal(questionId, item._id)} // actualizar una respuesta
            onDelete={() => handleDeleteAnswer(questionId, item._id)} // eliminar una respuesta
            dragHandleProps={provided.dragHandleProps}
          />
        </div>
      )}
    </Draggable>
  );
};

export default AnswerItem;
