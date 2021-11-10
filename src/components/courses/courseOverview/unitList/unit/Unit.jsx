import React from 'react';
import Lesson from './lesson/Lesson';
import styles from './unit.module.css';

const Unit = React.memo(({ unit, lessons, lessonsRead }) => {
  return (
    <div className="mb-5">
      <div className="d-flex align-items-center mb-4">
        <div className={styles.unitIndex}>
          <span className="text-regular text--theme-light">U{unit.numero}</span>
        </div>
        <h2 className="title mb-0">{unit.titulo}</h2>
      </div>
      {
        lessons.map((lesson) => {
          return (
            <Lesson key={lesson.nombre} lesson={lesson} lessonsRead={lessonsRead} />
          );
        })
      }
    </div>
  );
});

export default Unit;
