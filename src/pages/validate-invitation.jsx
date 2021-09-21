import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import EditorContextProvider from '@/helpers/contexts/editorContext';
import { Layout, LoadingIndicator } from '@/components';
import { updateInvitationService } from '@/services/invitations';
import { fetch as fetchProfile } from '@/reducers/profile';

const ValidateInvitation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { fetched } = useSelector((state) => state.profile);

  const [dataInvite, setDataInvite] = useState({
    email: '',
    idInvitation: '',
    role: '',
    invitation: false,
  });

  useEffect(() => {
    const dataInvitation = localStorage.getItem('dataInvitation');
    if (dataInvitation !== null) {
      const elementsInvitation = JSON.parse(dataInvitation);
      setDataInvite({ ...elementsInvitation });
    }
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, []);

  const updateInvitation = async () => {
    const res = await updateInvitationService(dataInvite.idInvitation, {
      estatus: true,
    });
    if (res.updated) {
      localStorage.setItem('dataInvitation', JSON.stringify(''));
      router.push('/trending-topics?user=true');
    }
  };

  if (dataInvite.invitation) {
    updateInvitation();
  }
  return (
    <EditorContextProvider>
      <Layout>
        <div className="container">
          <div className="row justify-content-center" style={{ paddingTop: '30%' }}>
            <div className="col-auto">
              <LoadingIndicator />
            </div>
          </div>
        </div>
      </Layout>
    </EditorContextProvider>
  );
};

export default ValidateInvitation;
