import React from 'react';
import ListItem from '@/components/editorComponents/editorListItem/EditorListItem';

// ítem de una respuesta en específico
const AnswerItem = () => {
  return (
    <>
      <ListItem
        itemText="Respuesta"
        onUpdate={() => {}} // actualizar una respuesta
        onDelete={() => {}} // eliminar una respuesta
      />
    </>
  );
};

export default AnswerItem;
