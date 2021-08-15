// eslint-disable-next-line import/extensions
import React from 'react';
import Head from 'next/head';
// eslint-disable-next-line import/extensions
import withoutAuth from '@/helpers/withoutAuth';
// eslint-disable-next-line import/extensions
import { LoginForm, LoginHeader } from '@/components';

const LoginPage = () => {
  return (
    <div className="background-gray">
      <Head>
        <title>Iniciar sesión</title>
      </Head>
      <LoginHeader />
      <div className="main-container centered-content">
        <LoginForm />
      </div>
    </div>
  );
};

export default withoutAuth(LoginPage);
