import React from 'react';
import Unit from './unit/Unit';

const UnitList = React.memo(({ units, lessons, lessonsRead }) => {
  return (
    <div>
      {
        units.map((unit) => {
          // eslint-disable-next-line max-len
          const unitLessons = lessons.filter((lesson) => lesson.unidad === unit._id);
          return (
            <Unit
              key={unit.titulo}
              unit={unit}
              lessons={unitLessons}
              lessonsRead={lessonsRead}
            />
          );
        })
      }
    </div>
  );
});

export default UnitList;
