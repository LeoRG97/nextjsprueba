import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
// import { useSWRConfig } from 'swr';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import { LoadingIndicator, SuccessIndicatorModal } from '@/components';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import CourseSubscription from '@/components/courses/coursesComponent/CourseSubscription';

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

  const isEmpty = data?.[size - 1]?.length === 0;

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

export default ProfileCourseSubscription;
