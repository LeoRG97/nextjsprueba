import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import InviteMemberForm from './InviteMemberForm';
import TableMember from './TableMembers';
import { fetchInvitationsData } from '@/services/swr';
import { deleteInvitationService } from '@/services/invitations';
import { ApiRoutes } from '@/global/constants';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import { SuccessIndicatorModal } from '@/components';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';

const ProfileMembersAndInvitations = () => {
  const router = useRouter();
  useEffect(() => {

  }, [router]);

  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(false);

  const { data, mutate } = useSWR(`${ApiRoutes.Invitation}?pageNum=${1}&pageSize=${100}`, fetchInvitationsData);
  let dataMembers = [];
  if (data && data.invitaciones) {
    dataMembers = data.invitaciones;
  }

  const deleteMember = async (id) => {
    setModalLoading(true);
    setModalSucces(false);
    setModalError(false);
    const res = await deleteInvitationService(id);
    if (res.ok) {
      mutate({ ...data });
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
        <div className="col-md-3">
          <InviteMemberForm />
        </div>
        <div className="col-md-8">
          <h1 className="title">Listado de miembros</h1>
          <TableMember
            data={dataMembers}
            deleteMember={deleteMember}
          />
        </div>
      </div>
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => setModalLoading(false)}
        textHeader="Eliminando miembro..."
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={modalSucces}
        onClose={() => setModalSucces(false)}
        textHeader="Miembro eliminado"
        textBody="El miembro ha sido eliminado correctamente."
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
