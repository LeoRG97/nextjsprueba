import React from 'react';

const LessonCourse = React.memo(({ lesson }) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <div className="d-flex align-items-center">
        <span className="icon icon--theme-primary">F</span>
        <span className="px-2 text-regular text--theme-light">{lesson.nombre}</span>
      </div>
    </div>
  );
});

export default LessonCourse;
