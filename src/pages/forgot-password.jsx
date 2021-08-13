import { ForgotPasswordForm, LoginHeader } from '@/components';
import withoutAuth from '@/helpers/withoutAuth';
import React from 'react';

const ResetPassword = () => {
  return (
    <div className="background-gray">
      <LoginHeader />
      <div className="main-container centered-content">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default withoutAuth(ResetPassword);
