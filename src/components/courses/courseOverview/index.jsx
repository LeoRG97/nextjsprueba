/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import LessonVideo from './lessonVideo/LessonVideo';
import Menu from './menu/Menu';
import UnitList from './unitList/UnitList';
import ResoursesLect from './resourses/resourses';
import CertificateCourse from './certificate/certificate';
import styles from './course.module.css';
import { ListComment } from '@/components/comments/comments-course/ListComment';
import { checkIfLikedThisCourse, getTotalCommentsCourse, rateCourse } from '@/services/courses';
import { postSubscLection, getSubscriptionsUser } from '@/services/subscription';

const CourseOverview = ({ courseInfo, subsInfo }) => {
  const [session] = useSession();
  const router = useRouter();
  const { query: { slug, params } } = router;
  const [course, setCourse] = useState({});
  const [infoSubsCourse, setInfoSubsCourse] = useState({});
  const [totalComments, setTotalComments] = useState(0);
  const [prevLection, setPrevL] = useState('');
  const [nextLection, setNextL] = useState('');
  const [courseId, setCourseID] = useState('');
  const [iconCertificate, setCertf] = useState('W');
  const [checkResourses, setResour] = useState(false);
  const [canValue, setCanValue] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [rateTotal, setRateTotal] = useState(0);

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

  const handleRateCourse = async () => {
    if (session && course) {
      const res = await rateCourse(course._id, session.user.id);
      if (res.message.toString() === 'liked') {
        setLiked(true);
        setRateTotal(rateTotal + 1);
      }
      if (res.message.toString() === 'unliked') {
        setLiked(false);
        setRateTotal(rateTotal - 1);
      }
    }
  };

  const checkIfLikedThisCourseFunc = async () => {
    if (session && course && course._id) {
      const liked = await checkIfLikedThisCourse(course._id, session.accessToken);
      setRateTotal(liked.likes);
      if (liked.ok) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  };

  useEffect(() => {
    if (session && course) {
      checkIfLikedThisCourseFunc();
    }
  }, [session, course]);

  useEffect(() => {
    if (subsInfo) {
      setInfoSubsCourse(subsInfo);
    }
    setCourse(courseInfo[0]);
    if (courseInfo[0]) {
      setCourseID(courseInfo[0]._id);
    }
  }, []);

  useEffect(() => {
    if (courseId) {
      listenerComentAdded(0);
    }
  }, [courseId]);

  const [lessonIndex, tab] = params || [];
  const registerlection = async () => {
    const lection = {
      leccionId: lessonIndex,
    };
    const arrayIdsLessonsCourses = [];
    course.lecciones.forEach((lessonCourse) => arrayIdsLessonsCourses.push(lessonCourse._id));
    const resp = await postSubscLection(infoSubsCourse._id, lection);
    if (resp.ok && resp.message && resp.message === 'added') {
      const data = {
        curso_id: course._id,
        usuario_id: session.user.id,
      };
      const subsInfoNew = await getSubscriptionsUser(data, session.accessToken);
      setInfoSubsCourse(subsInfoNew);
      const arrayLessonsIncludedInSubsNew = [];
      arrayIdsLessonsCourses.forEach((lessonCourseId) => {
        subsInfoNew.lecciones.forEach((lessonsSubsNew) => {
          if (lessonCourseId === lessonsSubsNew) {
            arrayLessonsIncludedInSubsNew.push(lessonsSubsNew);
          }
        });
      });
      if (arrayIdsLessonsCourses.length === arrayLessonsIncludedInSubsNew.length) {
        setCertf('q');
        setCanValue(true);
      } else {
        setCertf('W');
        setCanValue(false);
      }
    }
    return resp;
  };

  const FindMyLession = () => {
    if (course && course.lecciones) {
      // eslint-disable-next-line consistent-return
      const lessonObj = course.lecciones.find((lesson) => lesson._id === lessonIndex);
      if (!checkResourses && lessonObj && lessonObj.recursos.length > 0) {
        setResour(true);
      } else if (checkResourses && lessonObj && lessonObj.recursos.length === 0) {
        setResour(false);
      }
      return lessonObj;
    }
    return null;
  };

  const currentLesson = FindMyLession();

  const FindisFirstLession = () => {
    if (course && course.lecciones) {
      // eslint-disable-next-line consistent-return
      const lessonObj = course.lecciones.findIndex((item) => item._id === currentLesson._id);
      if (lessonObj === 0) {
        return true;
      }
      return false;
    }
    return true;
  };

  // const isFirst = currentLesson && currentLesson.no_leccion === 1;
  // const isLast = currentLesson && currentLesson.no_leccion === course.lecciones.length;
  const isFirst = currentLesson && FindisFirstLession();

  const FindLastLession = () => {
    if (course && course.lecciones) {
      // eslint-disable-next-line consistent-return
      const info1 = course.lecciones.findIndex((item) => item._id === currentLesson._id);
      const info2 = course.lecciones.length - 1;
      if (info1 === info2) {
        return true;
      }
    }
    return false;
  };

  const isLast = currentLesson && FindLastLession();

  const getLessonByIndex = (index) => {
    if (course && course.lecciones) {
      // eslint-disable-next-line consistent-return
      const lessonObj = course.lecciones.find((obj) => Number(obj.numeroLeccion) === index);
      return lessonObj;
    }
    return null;
  };

  const handlePrev = () => {
    if (currentLesson) {
      const lesson = getLessonByIndex(Number(currentLesson.numeroLeccion) - 1);
      if (lesson) {
        setPrevL(`/courses/${slug}/lesson/${lesson._id}/${tab || ''}`);
        // return (`/courses/${slug}/lesson/${lesson._id}/${tab || ''}`);
      }
    }
    return '';
  };

  const handleNext = () => {
    if (currentLesson) {
      const lesson = getLessonByIndex(Number(currentLesson.numeroLeccion) + 1);
      if (lesson) {
        setNextL(`/courses/${slug}/lesson/${lesson._id}/${tab || ''}`);
        // return (`/courses/${slug}/lesson/${lesson._id}/${tab || ''}`);
      }
    }
    return '';
  };

  useEffect(() => {
    if (currentLesson && slug && lessonIndex && infoSubsCourse) {
      handlePrev();
      handleNext();
    }
  }, [slug, currentLesson, lessonIndex, infoSubsCourse]);

  useEffect(() => {
    if (course && course.lecciones && infoSubsCourse) {
      registerlection();
    }
  }, [slug, lessonIndex, course]);

  useEffect(() => {
    const idsLessonsCourses = [];
    const idsMatch = [];
    if (infoSubsCourse && infoSubsCourse.lecciones && course && course.lecciones) {
      course.lecciones.forEach((lessonCourse) => idsLessonsCourses.push(lessonCourse._id));
      idsLessonsCourses.forEach((elemento) => {
        infoSubsCourse.lecciones.forEach((lessonsSubs) => {
          if (elemento === lessonsSubs) {
            idsMatch.push(lessonsSubs);
          }
        });
      });
      if (idsLessonsCourses.length === idsMatch.length) {
        setCertf('q');
        setCanValue(true);
      } else {
        setCertf('W');
        setCanValue(false);
      }
    }
  }, [infoSubsCourse]);

  return (
    <div className={styles.container}>
      {course && course.unidades && (
        <LessonVideo
          data={currentLesson}
          prev={prevLection}
          next={nextLection}
          isFirst={isFirst}
          isLast={isLast}
          unitsCourse={course.unidades}
        />
      )}
      {course && (
        <Menu
          totalComments={totalComments}
          checkRes={checkResourses}
          certificateIc={iconCertificate}
          certificateLink={course.certificado}
        />
      )}

      {(!tab || tab === 'overview') && course && course.unidades && infoSubsCourse && (
        <UnitList
          units={course.unidades}
          lessons={course.lecciones}
          lessonsRead={infoSubsCourse}
          onLike={handleRateCourse}
          canValue={canValue}
          rateTotal={rateTotal}
          isLiked={isLiked}
        />
      )}
      {tab === 'comments' && <ListComment courseId={courseId} listenerComentAdded={listenerComentAdded} />}
      {tab === 'resources' && <ResoursesLect resourses={currentLesson} />}
      {tab === 'certificate' && <CertificateCourse certificate={course.certificado} />}
    </div>
  );
};

export default CourseOverview;
