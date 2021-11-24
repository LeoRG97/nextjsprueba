import React from 'react';
import ListItem from '@/components/editorComponents/editorListItem/EditorListItem';

// ítem de una respuesta en específico
const AnswerItem = ({ item }) => {
  return (
    <>
      <ListItem
        itemText={item.valor}
        onUpdate={() => {}} // actualizar una respuesta
        onDelete={() => {}} // eliminar una respuesta
      />
    </>
  );
};

export default AnswerItem;
