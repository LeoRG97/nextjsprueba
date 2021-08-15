/* eslint-disable import/extensions */
import React from 'react';
import { LoginHeader, ResetPasswordForm } from '@/components';

const ResetPasswordPage = () => {
  return (
    <div className="background-gray">
      <LoginHeader />
      <div className="main-container centered-content">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { tokenp1, tokenp2, tokenp3 } = query;

  if (!tokenp1 || !tokenp2 || !tokenp3) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }

  return {
    props: {},
  };
}

export default ResetPasswordPage;
