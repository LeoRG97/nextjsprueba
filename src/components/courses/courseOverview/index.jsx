import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LessonVideo from './lessonVideo/LessonVideo';
import Menu from './menu/Menu';
import UnitList from './unitList/UnitList';
import { coursesArray } from './data';
import styles from './course.module.css';
import { ListComment } from '@/components/comments/comments-course/ListComment';
import { getTotalCommentsCourse } from '@/services/courses';

const CourseOverview = () => {
  const router = useRouter();
  const { query: { slug, params } } = router;
  const [course, setCourse] = useState({});
  const [totalComments, setTotalComments] = useState(0);
  const courseId = '61780623f0307358ca494abf';

  const listenerComentAdded = async (data) => {
    const aux = [];
    try {
      if (data.length === 1 || data === 0) {
        const rs = await getTotalCommentsCourse(courseId);
        return setTotalComments(rs.total);
      }
      data.map((el) => el.length > 0
        && el.map((item) => aux.push(item)));
      return setTotalComments(aux.length);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    setCourse(coursesArray[0]);
    listenerComentAdded(0);
  }, []);

  const [lessonIndex, tab] = params || [];

  const currentLesson = course.lecciones
    && course.lecciones.find((lesson) => lesson._id === lessonIndex);

  // const isFirst = currentLesson && currentLesson.no_leccion === 1;
  // const isLast = currentLesson && currentLesson.no_leccion === course.lecciones.length;
  const isFirst = currentLesson
    && course.lecciones.findIndex((item) => item._id === currentLesson._id) === 0;

  const isLast = currentLesson
    && course.lecciones.findIndex((item) => item._id === currentLesson._id)
    === course.lecciones.length - 1;

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
      <Menu totalComments={totalComments} />

      {(!tab || tab === 'overview') && course.unidades && (
        <UnitList
          units={course.unidades}
          lessons={course.lecciones}
        />
      )}
      {tab === 'comments' && <ListComment courseId={courseId} listenerComentAdded={listenerComentAdded} />}
      {tab === 'resources' && <h3 className="title">Recursos adicionales</h3>}
      {tab === 'certificate' && <h3 className="title">Certificado</h3>}
    </div>
  );
};

export default CourseOverview;
