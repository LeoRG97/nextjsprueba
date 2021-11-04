import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
// import { useSWRConfig } from 'swr';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import styles from '../profileArticles/profile.module.css';
import {
  ArticleListSelectComponent, CourseDetailComponent, LoadingIndicator, SuccessIndicatorModal,
} from '@/components';
import { deleteCourse } from '@/services/courses';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';

const ProfileCourses = () => {
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
    return `${ApiRoutes.CoursesAuthor}/${session.user.id}?pageNum=${pageIndex + 1}&pageSize=9${params}`; // API endpoint
  };

  const {
    data, isValidating, size, setSize, mutate,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  const isEmpty = data?.[size - 1]?.length === 0;

  const handleTypeChange = (item) => {
    const { query, pathname } = router;
    delete query.type;
    router.push({
      pathname,
      query: {
        ...query,
        ...(item.value && { type: item.value }),
      },
    }, undefined, { scroll: false, shallow: true });
  };

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
        <div className="select-recent">
          <ArticleListSelectComponent
            defaultTitle="Todos"
            currentValue={router.query.type}
            onChange={handleTypeChange}
            selectN="2"
            items={[
              { label: 'Todos', value: '' },
            ]}
          />
        </div>
        <div className={`select-filter ${styles.hideMobile}`}>
          <div
            className={styles.optionsContainer}
          >
            <button className="button button--theme-primary">
              Nuevo curso <span className="button__icon-right text--theme-light">1</span>
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
