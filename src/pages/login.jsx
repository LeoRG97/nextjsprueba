/* eslint-disable import/extensions */
import withoutAuth from '@/helpers/withoutAuth';
// eslint-disable-next-line import/order
import React from 'react';
import { LoginForm, LoginHeader } from '@/components';
// eslint-disable-next-line import/order
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
