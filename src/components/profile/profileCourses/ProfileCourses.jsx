import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
// import { useSWRConfig } from 'swr';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import styles from '../profileArticles/profile.module.css';
import { CourseDetailComponent, LoadingIndicator, SuccessIndicatorModal } from '@/components';
import { deleteCourse } from '@/services/courses';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';

const ProfileCourses = ({ estado }) => {
  const router = useRouter();
  const [session] = useSession();
  const [loadModal, setLoadModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalError, setModalError] = useState(false);

  const getKey = (pageIndex, previousPageData) => {
    let params = '';

    if (router.query.type) {
      const { type } = router.query;
      params = `${params}&tipo=${type}`;
    }

    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.CoursesAuthor}/${session.user.id}?pageNum=${pageIndex + 1}&pageSize=9${params}&estado=${estado}`; // API endpoint
  };

  const {
    data, isValidating, size, setSize, mutate,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  const isEmpty = data?.[size - 1]?.length === 0;

  const handleDelete = async (courseId) => {
    setLoadModal(true);
    try {
      await deleteCourse(courseId);
      setLoadModal(false);
      setSuccessModal(true);
      return mutate();
    } catch (error) {
      setLoadModal(false);
      setModalError(true);
      return error;
    }
  };

  return (
    <div>
      <div className="selects-container">
        <div className="select-recent" />
        <div className={`select-filter ${styles.hideMobile}`}>
          <div
            className={styles.optionsContainer}
          >
            <button onClick={() => router.push('/editor/course')} className="button button--theme-primary">
              Nuevo curso
            </button>
          </div>
        </div>
      </div>

      {
        data && data.map((page) => {
          return page.map((course) => (
            <CourseDetailComponent
              key={course._id}
              curso={course}
              onDelete={() => handleDelete(course._id)}
              isAdmin={session.user.role !== 'user'}
            />
          ));
        })
      }
      <div className="d-flex justify-content-center">
        <>
          {isValidating
            ? <LoadingIndicator />
            : !isEmpty && (
              <button
                className="button button--theme-secondary"
                onClick={() => setSize(size + 1)}
              >
                Ver más publicaciones
              </button>
            )}
        </>
      </div>
      <LoadingIndicatorModal
        show={loadModal}
        onClose={() => setLoadModal(false)}
        textHeader="Eliminando curso"
        textBody=""
      />
      <SuccessIndicatorModal
        show={successModal}
        onClose={() => setSuccessModal(false)}
        textHeader="Curso Eliminado"
        textBody="Se ha eliminado el curso correctamente"
      />
      <ErrorIndicatorModal
        show={modalError}
        onClose={() => setModalError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Algo ha salido mal, vulve a intentarlo más tarde"
      />
    </div>
  );
};

export default ProfileCourses;
