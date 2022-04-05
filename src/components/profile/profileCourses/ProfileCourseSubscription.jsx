import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import { LoadingIndicator } from '@/components';
import CourseSubscription from '@/components/courses/coursesComponent/CourseSubscription';

const LoadingIndicatorModal = dynamic(() => import('@/components/modalsIndicators/LoadingModal'));
const SuccessIndicatorModal = dynamic(() => import('@/components/modalsIndicators/SuccesModal'));
const ErrorIndicatorModal = dynamic(() => import('@/components/modalsIndicators/ErrorModal'));

const ProfileCourseSubscription = () => {
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
    return `${ApiRoutes.Subscriptions}/${session.user.id}?pageNum=${pageIndex + 1}&pageSize=9${params}`; // API endpoint
  };

  const {
    data, isValidating, size, setSize,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });
  const { data: total } = useSWR([ApiRoutes.UserTotals, session.user.id],
    { fallbackData: { subscripcionesCursos: 0 } });

  const { subscripcionesCursos } = total;

  const isEmpty = size * 9 >= subscripcionesCursos;

  return (
    <div>
      {
        data && data.map((page) => {
          return page.map((course) => (
            <CourseSubscription
              key={course._id}
              curso={course}
              onDelete={() => {}}
              isAdmin
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
                Ver más cursos
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

export default ProfileCourseSubscription;
