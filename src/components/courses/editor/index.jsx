import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';
import styles from './courseEditor.module.css';
import Units from './units/Units';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import { saveCourse, updateCourse } from '@/services/courses';
import CoursePreviewComponent from './coursePreview';

const ModalDetailsCourse = dynamic(() => import('../modals/detailsCourseModal/DetailsCourseModal'));
const ModalDetailsLesson = dynamic(() => import('../modals/coursesLesson/ModalDetailsLesson'));
const ModalDeleteCourse = dynamic(() => import('../modals/deleteUnitModal/deleteUnitModal'));
const ModalDeleteLesson = dynamic(() => import('../modals/deleteLessonModal/deleteLessonModal'));
const LoadingIndicatorModal = dynamic(() => import('@/components/modalsIndicators/LoadingModal'));
const SuccessIndicatorModal = dynamic(() => import('@/components/modalsIndicators/SuccesModal'));
const ErrorIndicatorModal = dynamic(() => import('@/components/modalsIndicators/ErrorModal'));

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
    handleCancelLessonEdit,
    eraseOldResourcesFromS3,
    showDeltModal,
    handleCancelDeltlessonModal,
    showDeltModalLesson,
    handleCancelDeltlessonModalLesson,
  } = useContext(CourseContext);

  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState({ show: false });
  const [errorData, setErrorData] = useState({ show: false });
  const [showDetails, setShowDetails] = useState(false);
  const [preview, setPreview] = useState(false);

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
      autor: course.autor || session.user.id,
    };

    if (!course._id) {
      const res = await saveCourse(data, session.user.id);
      setSubmitting(false);
      if (res.ok) {
        eraseOldResourcesFromS3();
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
      const res = await updateCourse(course._id, data);
      setSubmitting(false);
      if (res.ok) {
        eraseOldResourcesFromS3();
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

  const handleReturnButton = () => {
    if (preview) {
      setPreview(false);
    } else {
      router.back();
    }
  };

  return (
    <div className={styles.editor}>
      <TooltipContainer placement="right" tooltipText="Regresar">
        <button
          className={`icon-button icon-button--secondary ${styles.returnButton}`}
          onClick={handleReturnButton}
        >
          a
        </button>
      </TooltipContainer>
      <div className={styles.editorContent}>
        {
          preview ? (
            <CoursePreviewComponent
              initialData={course}
              initialContent={unitsArray}
              preview={() => setPreview(!preview)}
            />
          ) : (
            <>
              {unitsArray && (
                <Units
                  units={unitsArray}
                />
              )}
            </>
          )
        }
      </div>
      {
        !preview && (
          <div className={styles.optionsContainer}>
            <TooltipContainer tooltipText="Publicar" placement="left">
              <button
                className={`icon-button icon-button--primary ${styles.optionsItem}`}
                onClick={() => setShowDetails(true)}
              >
                H
              </button>
            </TooltipContainer>
            <TooltipContainer tooltipText="Vista previa" placement="left">
              <button
                className={`icon-button icon-button--secondary ${styles.optionsItem}`}
                onClick={() => setPreview(!preview)}
              >
                8
              </button>
            </TooltipContainer>
          </div>
        )
      }
      <ModalDetailsLesson
        show={showLessonModal}
        onClose={handleCancelLessonEdit}
      />
      <ModalDeleteCourse
        show={showDeltModal}
        onClose={handleCancelDeltlessonModal}
      />
      <ModalDeleteLesson
        show={showDeltModalLesson}
        onClose={handleCancelDeltlessonModalLesson}
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
