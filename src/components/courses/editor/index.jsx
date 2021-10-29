import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';
import styles from './courseEditor.module.css';
import Units from './units/Units';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import ModalDetailsLesson from '../modals/coursesLesson/ModalDetailsLesson';
import { saveCourse, updateCourse } from '@/services/courses';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '@/components/modalsIndicators/SuccesModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import ModalDetailsCourse from '../modals/detailsCourseModal/DetailsCourseModal';

const CourseEditor = ({ initialData }) => {
  const [session] = useSession();
  const router = useRouter();
  const {
    course,
    setCourse,
    units,
    lessons,
    setUnits,
    setLessons,
    showLessonModal,
    handleCloseLessonModal,
  } = useContext(CourseContext);

  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState({ show: false });
  const [errorData, setErrorData] = useState({ show: false });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (initialData._id) {
      setCourse({ ...course, ...initialData });
      setUnits(initialData.unidades);
      setLessons(initialData.lecciones);
    }
  }, [initialData]);

  const unitsArray = units.map((unit) => {
    // agrupar las lecciones con sus respectivas unidades (y conservar el orden)
    const data = [];
    lessons.forEach((lesson) => {
      if (lesson.unidad === unit._id) {
        data.push({ ...lesson });
      }
    });
    return { ...unit, lessons: data };
  });

  const handlePublish = async (estatus) => {
    setShowDetails(false);
    setSubmitting(true);
    const lecciones = [];
    // asignar el número de lección a cada elemento del arreglo
    unitsArray.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        lecciones.push({
          ...lesson,
          numeroLeccion: lecciones.length + 1,
        });
      });
    });

    const data = {
      ...course,
      estatus,
      unidades: units,
      lecciones,
      autor: session.user.id,
    };

    if (!course._id) {
      const res = await saveCourse(data, session.user.id);
      setSubmitting(false);
      if (res.ok) {
        setSuccessData({
          show: true,
          title: estatus === 'publicado' ? 'Publicacion finalizada' : 'Cambios guardados',
          message: estatus === 'publicado' ? 'El curso ha sido publicado exitosamente.' : 'El curso ha sido guardado correctamente.',
        });
        setCourse({ ...course, ...res.data });
        router.replace(`${router.asPath}/${res.data._id}`, undefined, { shallow: false });
      } else {
        setErrorData({
          show: true,
          title: 'Ha ocurrido un error',
          message: 'Vuelva a intentarlo más tarde',
        });
      }
    } else {
      const res = await updateCourse(course._id, data, session.user.id);
      setSubmitting(false);
      if (res.ok) {
        setSuccessData({
          show: true,
          title: estatus === 'publicado' ? 'Publicación finalizada' : 'Cambios guardados',
          message: estatus === 'publicado' ? 'El curso ha sido publicado exitosamente.' : 'El curso ha sido actualizado correctamente.',
        });
        setCourse({ ...course, ...res.data });
      } else {
        setErrorData({
          show: true,
          title: 'Ha ocurrido un error',
          message: 'Vuelva a intentarlo más tarde',
        });
      }
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorContent}>
        <>
          {unitsArray && (
            <Units
              units={unitsArray}
            />
          )}
        </>
      </div>
      <div className={styles.optionsContainer}>

        <TooltipContainer tooltipText="Publicar" placement="left">
          <div
            className={`icon-button icon-button--primary ${styles.optionsItem}`}
            onClick={() => setShowDetails(true)}
          >
            H
          </div>
        </TooltipContainer>

        <TooltipContainer tooltipText="Guardar borrador" placement="left">
          <div
            className={`icon-button icon-button--success ${styles.optionsItem}`}
            onClick={() => handlePublish('borrador')}
          >
            I
          </div>
        </TooltipContainer>
        <TooltipContainer tooltipText="Vista previa" placement="left">
          <div className={`icon-button icon-button--secondary ${styles.optionsItem}`}>C</div>
        </TooltipContainer>
      </div>
      <ModalDetailsLesson
        show={showLessonModal}
        onClose={handleCloseLessonModal}
      />
      <ModalDetailsCourse
        show={showDetails}
        onClose={() => setShowDetails(false)}
        onSubmit={handlePublish}
      />
      <LoadingIndicatorModal
        show={submitting}
        onClose={() => {}}
        textHeader="Guardando cambios"
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={successData.show}
        onClose={() => setSuccessData({ ...successData, show: false })}
        textHeader={successData.title}
        textBody={successData.message}
      />
      <ErrorIndicatorModal
        show={errorData.show}
        onClose={() => setErrorData({ ...errorData, show: false })}
        textHeader={errorData.title}
        textBody={errorData.message}
      />
    </div>
  );
};

export default CourseEditor;
