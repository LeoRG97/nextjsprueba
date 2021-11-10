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
import { getTotalCommentsCourse } from '@/services/courses';
import { postSubscLection, getSubscriptionsUser } from '@/services/subscription';

const CourseOverview = ({ courseInfo, subsInfo }) => {
  const session = useSession();
  const router = useRouter();
  const { query: { slug, params } } = router;
  const [course, setCourse] = useState({});
  const [infoSubsCourse, setInfoSubsCourse] = useState({});
  const [totalComments, setTotalComments] = useState(0);
  const [prevLection, setPrevL] = useState('');
  const [nextLection, setNextL] = useState('');
  const [courseId, setCourseID] = useState('');
  const [iconCertificate, setCertf] = useState('W');

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
    if (subsInfo) {
      setInfoSubsCourse(subsInfo);
    }
    setCourse(courseInfo[0]);
    listenerComentAdded(0);
    if (courseInfo[0]) {
      setCourseID(courseInfo[0]._id);
    }
  }, []);

  const [lessonIndex, tab] = params || [];

  const registerlection = async () => {
    const lection = {
      leccionId: lessonIndex,
    };
    const resp = await postSubscLection(infoSubsCourse._id, lection);
    if (resp.ok && resp.message && resp.message === 'added') {
      const data = {
        curso_id: course._id,
        usuario_id: session[0].user.id,
      };
      const subsInfoNew = await getSubscriptionsUser(data, session[0].accessToken);
      setInfoSubsCourse(subsInfoNew);
      if (course.lecciones.length === subsInfoNew.lecciones.length) {
        setCertf('q');
      } else {
        setCertf('W');
      }
    } else if (course.lecciones.length === subsInfo.lecciones.length) {
      setCertf('q');
    } else {
      setCertf('W');
    }
    return resp;
  };

  const FindMyLession = () => {
    if (course && course.lecciones) {
      // eslint-disable-next-line consistent-return
      const lessonObj = course.lecciones.find((lesson) => lesson._id === lessonIndex);
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
          certificateIc={iconCertificate}
          certificateLink={course.certificado}
        />
      )}

      {(!tab || tab === 'overview') && course && course.unidades && infoSubsCourse && (
        <UnitList
          units={course.unidades}
          lessons={course.lecciones}
          lessonsRead={infoSubsCourse}
        />
      )}
      {tab === 'comments' && <ListComment courseId={courseId} listenerComentAdded={listenerComentAdded} />}
      {tab === 'resources' && <ResoursesLect resourses={currentLesson} />}
      {tab === 'certificate' && <CertificateCourse certificate={course.certificado} />}
    </div>
  );
};

export default CourseOverview;
