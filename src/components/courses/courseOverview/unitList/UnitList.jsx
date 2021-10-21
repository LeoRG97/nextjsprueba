import React from 'react';
import Unit from './unit/Unit';

const UnitList = React.memo(({ units, lessons }) => {
  return (
    <div>
      {
        units.map((unit) => {
          const unitLessons = lessons.filter((lesson) => lesson.no_unidad === unit.no_unidad);
          return (
            <Unit
              key={unit.nombre}
              unit={unit}
              lessons={unitLessons}
            />
          );
        })
      }
    </div>
  );
});

export default UnitList;
