/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/client';
import { useDispatch } from 'react-redux';
import styles from './courseSpecific.module.css';
import ContentCourse from './contentCourse/contentCourse';
import { AutorCourseComponent } from '@/components';
import { checkIfSuscribeThisCourse, createSubscriptionService, getSubscriptionsUser } from '@/services/subscription';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import { showPremiumAlert, showSubscribeAlert } from '@/reducers/alert';
import ModalInfo from './ModalInfo';
import { premiumUserAccess } from '@/helpers/accessVerifiers';

const CourseSpecific = ({ course }) => {
  const router = useRouter();
  const { query: { slug } } = router;
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [suscrito, setSuscrito] = useState(false);
  // const target = useRef(null);
  const [session] = useSession();
  const dispatchCourse = useDispatch();

  const goCoursesNav = () => {
    router.push('/trending-topics?type=Cursos', undefined, { scroll: false, shallow: true });
  };

  const handleLesson = async () => {
    if (course && course.lecciones) {
      if (course.lecciones.length > 0) {
        const data = {
          curso_id: course._id,
          usuario_id: session.user.id,
        };
        const subsInfoNew = await getSubscriptionsUser(data, session.accessToken);
        const arrayLessonsIncludedInSubsNew = [];
        const arrayIdsLessonsCourses = [];

        course.lecciones.forEach((lessonCourse) => arrayIdsLessonsCourses.push(lessonCourse._id));
        arrayIdsLessonsCourses.forEach((lessonCourseId) => {
          subsInfoNew.lecciones.forEach((lessonsSubsNew) => {
            if (lessonCourseId === lessonsSubsNew) {
              arrayLessonsIncludedInSubsNew.push(lessonsSubsNew);
            }
          });
        });

        if (arrayLessonsIncludedInSubsNew.length > 0) {
          router.push(`/courses/${slug}/lesson/${arrayLessonsIncludedInSubsNew[arrayLessonsIncludedInSubsNew.length - 1]}/`, undefined, { scroll: false, shallow: true });
        } else {
          router.push(`/courses/${slug}/lesson/${course.lecciones[0]._id}/`, undefined, { scroll: false, shallow: true });
        }
      } else {
        setModalInfo(true);
      }
    }
  };

  const handleSubscribe = async () => {
    if (course.exclusivo && !premiumUserAccess(session.user.role)) {
      dispatchCourse(showPremiumAlert());
    } else {
      const model = {
        curso_id: course._id,
        usuario_id: session.user.id,
        lecciones: [],
      };
      setModalLoading(true);
      const res = await createSubscriptionService(model);
      if (res) {
        setModalError(false);
        setModalLoading(false);
        setSuscrito(true);
      } else {
        setModalError(true);
        setModalLoading(false);
        setSuscrito(false);
      }
    }
  };

  const checkIfSubcribeThisCourseFunc = async () => {
    const map = {
      curso_id: course._id,
      usuario_id: session.user.id,
    };
    if (session) {
      const suscribe = await checkIfSuscribeThisCourse(map);
      if (suscribe.ok) {
        setSuscrito(true);
      } else {
        setSuscrito(false);
      }
    }
  };

  useEffect(() => {
    if (session && course) {
      checkIfSubcribeThisCourseFunc();
    }
  }, [session, course]);
  return (
    <Container fluid className="content-n-p">
      <div className={styles.container}>
        <Row>
          <Col xs={12}>
            <div className={styles.centered}>
              <Row>
                <Col xs={12} className="subtitle"><span>{course && course.categorias && course.categorias[0].nombre}</span></Col>
                <Col xs={12}>
                  <h1 className="title-xl">{course && course.titulo}</h1>
                </Col>
                <Col xs={12} className="text-sm">
                  <p>
                    {
                      course && course.lecciones && course.lecciones.length > 1 ? (`${course.lecciones.length} lecciones (${course.duracion || ''})`)
                        : (course && course.lecciones && course.lecciones.length > 0 && `${course.lecciones.length} lección (${course.duracion || ''})`)
                    }
                  </p>
                </Col>
                <Col xs={12}>
                  <div className="mt-2">
                    {
                      course.url_presentacion ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: course.url_presentacion }}
                          className={styles.video}
                        />
                      ) : (
                        <div className={`${styles.video} ${styles.empty}`} />
                      )
                    }
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <AutorCourseComponent
            autor={course.usuario_id[0]}
            suscrito={suscrito}
            handleSubscribe={() => (
              session?.user
                ? (handleSubscribe()) : dispatchCourse(showSubscribeAlert())
            )}
            handleLesson={() => handleLesson}
          />
          <Col xs={12}>
            <div className="mt-3">
              <h1 className="title">{course && course.objetivo}</h1>
              <p className="text-md mt-3">{course && course.descripcion}</p>
            </div>
          </Col>
          <Col xs={12}>
            <ContentCourse course={course} suscrito={suscrito} />
          </Col>
          <Col xs={12}>
            <Row>
              <Col xs={6} className={styles.btnFirst}>
                <button
                  onClick={goCoursesNav}
                  className="button button--theme-secondary me-2"
                >
                  Ver más cursos
                </button>
              </Col>
              <Col xs={6} className={styles.btnSecond}>
                {
                  suscrito ? (
                    <button className="button button--theme-light me-2" onClick={() => handleLesson()}>
                      <span className="button__icon-left">F</span>{' '}Continuar viendo
                    </button>
                  ) : (
                    <button
                      onClick={() => (
                        session?.user
                          ? (handleSubscribe()) : dispatchCourse(showSubscribeAlert())
                      )}
                      className="button button--theme-primary me-2"
                    >
                      Inscribirme al curso
                    </button>
                  )
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => setModalLoading(false)}
        textHeader="Suscribiendo al curso..."
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <ErrorIndicatorModal
        show={modalError}
        onClose={() => setModalError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Por favor, vuelva a intentarlo."
      />
      <ModalInfo
        show={modalInfo}
        onClose={() => setModalInfo(false)}
      />
    </Container>
  );
};

export default CourseSpecific;
