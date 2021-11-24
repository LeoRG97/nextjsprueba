import React, { useContext } from 'react';
import ListItem from '@/components/editorComponents/editorListItem/EditorListItem';
import { ToolContext } from '@/helpers/contexts/toolContext';

// ítem de una respuesta en específico
const AnswerItem = ({ item, questionId }) => {
  const { handleDeleteAnswer } = useContext(ToolContext);
  return (
    <>
      <ListItem
        itemText={item.valor}
        onUpdate={() => {}} // actualizar una respuesta
        onDelete={() => handleDeleteAnswer(questionId, item._id)}
      />
    </>
  );
};

export default AnswerItem;
