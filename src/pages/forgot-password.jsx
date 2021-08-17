import React from 'react';
import { ForgotPasswordForm, LoginHeader } from '@/components';
import withoutAuth from '@/helpers/withoutAuth';

const ResetPassword = () => {
  return (
    <div className="main-bg">
      <LoginHeader />
      <div className="main-container centered-content">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default withoutAuth(ResetPassword);
