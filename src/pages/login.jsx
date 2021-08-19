/* eslint-disable import/extensions */
import React from 'react';
import Head from 'next/head';
import withoutAuth from '@/helpers/withoutAuth';
import { LoginForm, LoginHeader } from '@/components';

const LoginPage = () => {
  return (
    <div className="main-bg">
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
