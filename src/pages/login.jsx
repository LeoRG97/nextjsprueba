import withoutAuth from '@/helpers/withoutAuth';
import React from 'react';
import { LoginForm, LoginHeader } from '@/components';
import Head from 'next/head';

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
