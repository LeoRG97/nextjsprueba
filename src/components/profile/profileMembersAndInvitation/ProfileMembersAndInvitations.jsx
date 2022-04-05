import React, { useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import InviteMemberForm from './InviteMemberForm';
import TableMember from './TableMembers';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import styles from './profileMembersAndInvitations.module.css';
import { adminAccess } from '@/helpers/accessVerifiers';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import { disableUserAccount } from '@/services/user';

const LoadingIndicatorModal = dynamic(() => import('@/components/modalsIndicators/LoadingModal'));
const SuccessIndicatorModal = dynamic(() => import('@/components/modalsIndicators/SuccesModal'));
const ErrorIndicatorModal = dynamic(() => import('@/components/modalsIndicators/ErrorModal'));

const ProfileMembersAndInvitations = () => {
  const [session] = useSession();

  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(false);

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.Users}?pageNum=${pageIndex + 1}&pageSize=9&rol=${session.user.role}`; // API endpoint
  };

  const {
    data, size, setSize, isValidating, mutate,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  let dataMembers = [];
  if (data) {
    data.forEach((page) => {
      dataMembers = [...dataMembers, ...page];
    });
  }

  const isEmpty = data?.[size - 1]?.length === 0;

  const deleteMember = async (id) => {
    setModalLoading(true);
    setModalSucces(false);
    setModalError(false);
    const res = await disableUserAccount(id);
    if (res._id) {
      mutate();
      setModalLoading(false);
      setModalSucces(true);
      setModalError(false);
    } else {
      setModalLoading(false);
      setModalSucces(false);
      setModalError(true);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-between">
        {adminAccess(session.user.role) && (
          <div className="col-md-3">
            <InviteMemberForm />
          </div>
        )}
        <div className={adminAccess(session.user.role) ? 'col-md-8' : 'col-md-12'}>
          <h1 className={`title ${styles.content_table}`}>Listado de miembros</h1>
          {(!isValidating || dataMembers.length > 0) && (
            <TableMember
              data={dataMembers}
              deleteMember={deleteMember}
              mutate={mutate}
            />
          )}
          <div className="d-flex justify-content-center">
            {isValidating
              ? <LoadingIndicator />
              : !isEmpty && (
                <button
                  className="button button--theme-secondary"
                  onClick={() => setSize(size + 1)}
                >
                  Ver más usuarios
                </button>
              )}
          </div>
        </div>
      </div>
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => {}}
        textHeader="Deshabilitando..."
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={modalSucces}
        onClose={() => setModalSucces(false)}
        textHeader="Miembro deshabilitado"
        textBody="La cuenta del miembro ha sido desactivada correctamente. Si se desea habilitar de nuevo, se tiene que enviar otra invitación al usuario."
      />
      <ErrorIndicatorModal
        show={modalError}
        onClose={() => setModalError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Por favor, revisa tu informacion y vuelve a intentarlo."
      />
    </div>
  );
};

export default ProfileMembersAndInvitations;
