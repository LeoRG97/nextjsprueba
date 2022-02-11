/* eslint-disable no-console */
import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { CourseDetailComponent, SuccessIndicatorModal } from '@/components';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import { reviewerAccess } from '@/helpers/accessVerifiers';
import { deleteCourse } from '@/services/courses';

const CoursesListComponent = ({ cursos, onFilter, showOptions = false }) => {
  const [loadModal, setLoadModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [session] = useSession();

  const onDelete = async (id) => {
    setLoadModal(true);
    try {
      const rs = await deleteCourse(id);
      if (rs.ok) {
        console.log(rs);
        const filtered = await cursos.filter((item) => item._id !== id);
        onFilter(filtered);
        setLoadModal(false);
        setSuccessModal(true);
      }
    } catch (error) {
      setLoadModal(false);
      setModalError(true);
    }
  };
  // const onDelete = async (id) => {
  //   console.log(onFilter);
  //   console.log(id);
  // };

  return (
    <div>
      {
        session && showOptions ? (
          <>
            {
              reviewerAccess(session.user.role) ? (
                <>
                  {
                    cursos.map((curso) => {
                      return (
                        <CourseDetailComponent
                          key={curso._id}
                          curso={curso}
                          onDelete={onDelete}
                          onUpdate={null}
                          isAdmin
                        />
                      );
                    })
                  }
                </>
              ) : (
                <>
                  {cursos.map((curso) => {
                    return (
                      <CourseDetailComponent
                        key={curso._id}
                        curso={curso}
                      />
                    );
                  })}
                </>
              )
            }
          </>
        ) : (
          <>
            {cursos.map((curso) => {
              return (
                <CourseDetailComponent
                  key={curso._id}
                  curso={curso}
                />
              );
            })}
          </>
        )
      }
      <LoadingIndicatorModal
        show={loadModal}
        onClose={() => setLoadModal(false)}
        textHeader="Eliminando articulo"
        textBody=""
      />
      <SuccessIndicatorModal
        show={successModal}
        onClose={() => setSuccessModal(false)}
        textHeader="Curso eliminado"
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

export default CoursesListComponent;
