import { useRouter } from 'next/router';
import React from 'react';
import styles from './lesson.module.css';

const Lesson = React.memo(({ lesson, lessonsRead }) => {
  const router = useRouter();
  const { query: { slug, params } } = router;
  const [lessonIndex, tab] = params || [];

  const handleNav = () => {
    router.push(`/courses/${slug}/lesson/${lesson._id}/${tab || ''}`, undefined, { scroll: false, shallow: true });
  };

  const getButtonState = () => {
    let BtnValue;

    if (lessonsRead && lessonsRead.lecciones) {
      BtnValue = lessonsRead.lecciones.find((lecciones) => lecciones === lesson._id);
    }

    if (lessonIndex === lesson._id) {
      return (
        <button className="icon-button icon-button--primary">
          o
        </button>
      );
    }
    if (BtnValue) {
      return (
        <button className={`icon-button icon-button--primary active_light ${styles.lectionView}`} onClick={handleNav}>
          s
        </button>
      );
    }
    return (
      <button className="icon-button icon-button--secondary" onClick={handleNav}>
        b
      </button>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div className="d-flex align-items-center">
        <div className={styles.lessonIndex}>
          <span className="text-regular text--theme-light">{lesson.numeroLeccion}</span>
        </div>
        <p className="text-regular text--theme-light mb-0">{lesson.nombre}</p>
      </div>
      <div>
        {getButtonState()}
      </div>
    </div>
  );
});

export default Lesson;
