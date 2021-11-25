import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ListItem from '@/components/editorComponents/editorListItem/EditorListItem';
import { ToolContext } from '@/helpers/contexts/toolContext';

// ítem de una respuesta en específico
const AnswerItem = ({ item, questionId, index }) => {
  const { handleDeleteAnswer } = useContext(ToolContext);
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <ListItem
            itemText={item.valor}
            onUpdate={() => {}} // actualizar una respuesta
            onDelete={() => handleDeleteAnswer(questionId, item._id)}
            dragHandleProps={provided.dragHandleProps}
          />
        </div>
      )}
    </Draggable>
  );
};

export default AnswerItem;
