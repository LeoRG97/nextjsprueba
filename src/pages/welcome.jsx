import Head from 'next/head';
import { useRouter } from 'next/router';
import { ConfirmationUser, LoginHeader } from '@/components';
import { Roles } from '@/global/constants';

const ConfirmationUserRegistered = () => {
  const { query } = useRouter();

  let type = '';

  if (query.role) {
    if (query.role === Roles.Author) {
      type = 'Colaborador';
    } else if (query.role === Roles.Reviewer) {
      type = 'Revisor';
    } else if (query.role === Roles.Admin) {
      type = 'Administrador';
    } else if (query.role === Roles.Premium) {
      type = 'usuario Premium';
    }
  }

  return (
    <div className="main-bg">
      <Head>
        <title>Confirmación usuario registrado</title>
      </Head>
      <LoginHeader />
      <div className="main-container centered-content">
        {
          query.email && query.role && query.invitacionId
            ? (
              <ConfirmationUser
                type={type}
                email={query.email}
                role={query.role}
                idInvitation={query.invitacionId}
              />
            ) : (
              <></>
            )
        }
      </div>
    </div>
  );
};

export default ConfirmationUserRegistered;
