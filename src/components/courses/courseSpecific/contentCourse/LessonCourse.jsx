import { useRouter } from 'next/router';
import React from 'react';
import styles from '../courseSpecific.module.css';

const LessonCourse = React.memo(({ lesson, suscrito }) => {
  const router = useRouter();
  const { query: { slug } } = router;

  const handleNav = () => {
    router.push(`/courses/${slug}/lesson/${lesson._id}/`, undefined, { scroll: false, shallow: true });
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      {
        suscrito ? (
          <div className={`d-flex align-items-center ${styles.cursorLesson}`} onClick={handleNav}>
            <span className="icon icon--theme-primary">F</span>
            <span className="px-2 text-regular text--theme-light">{lesson.nombre}</span>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <span className="icon icon--theme-primary">F</span>
            <span className="px-2 text-regular text--theme-light">{lesson.nombre}</span>
          </div>
        )
      }
    </div>
  );
});

export default LessonCourse;
