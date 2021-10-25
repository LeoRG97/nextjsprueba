import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LessonVideo from './lessonVideo/LessonVideo';
import Menu from './menu/Menu';
import UnitList from './unitList/UnitList';
import { coursesArray } from './data';
import styles from './course.module.css';
import { ListComment } from '@/components/comments/comments-course/ListComment';

const CourseOverview = () => {
  const router = useRouter();
  const { query: { slug, params } } = router;
  const [course, setCourse] = useState({});

  useEffect(() => {
    setCourse(coursesArray[0]);
  }, []);

  const [lessonIndex, tab] = params || [];

  const currentLesson = course.lecciones
    && course.lecciones.find((lesson) => lesson._id === lessonIndex);

  const isFirst = currentLesson && currentLesson.no_leccion === 1;
  const isLast = currentLesson && currentLesson.no_leccion === course.lecciones.length;

  const getLessonByIndex = (index) => {
    const lessonObj = course.lecciones.find((obj) => obj.no_leccion === index);
    return lessonObj;
  };

  const handlePrev = () => {
    const lesson = getLessonByIndex(currentLesson.no_leccion - 1);
    router.push(`/courses/${slug}/lesson/${lesson._id}/${tab || ''}`);
  };

  const handleNext = () => {
    const lesson = getLessonByIndex(currentLesson.no_leccion + 1);
    router.push(`/courses/${slug}/lesson/${lesson._id}/${tab || ''}`);
  };

  return (
    <div className={styles.container}>
      <LessonVideo
        data={currentLesson}
        prev={handlePrev}
        next={handleNext}
        isFirst={isFirst}
        isLast={isLast}
      />
      <Menu />

      {(!tab || tab === 'overview') && course.unidades && (
        <UnitList
          units={course.unidades}
          lessons={course.lecciones}
        />
      )}
      {tab === 'comments' && <ListComment />}
      {tab === 'resources' && <h3 className="title">Recursos adicionales</h3>}
      {tab === 'certificate' && <h3 className="title">Certificado</h3>}
    </div>
  );
};

export default CourseOverview;
