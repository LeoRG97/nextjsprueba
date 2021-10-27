/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import UnitContainer from './unitContainer/UnitContainer';
import styles from './units.module.css';

// contenedor para la lista de unidades
const Units = React.memo(({ units }) => {
  const { handleAddUnit, handleSortUnits } = useContext(CourseContext);
  return (
    <div>
      <DragDropContext
        onDragEnd={handleSortUnits}
      >
        <Droppable droppableId="unitCanvas">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {units.map((unit, i) => {
                return (
                  <UnitContainer
                    key={unit._id}
                    index={i}
                    data={unit}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={styles.addBlock}>
        <button
          className={`subtitle ${styles.btnNew}`}
          onClick={handleAddUnit}
        >
          Nueva unidad
        </button>
      </div>
    </div>
  );
});

export default Units;
