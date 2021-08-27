import Head from 'next/head';
import { ConfirmationUser, LoginHeader } from '@/components';

const ConfirmationUserRegistered = () => {
  return (
    <div className="main-bg">
      <Head>
        <title>Confirmación usuario registrado</title>
      </Head>
      <LoginHeader />
      <div className="main-container centered-content">
        <ConfirmationUser />
      </div>
    </div>
  );
};

export default ConfirmationUserRegistered;
