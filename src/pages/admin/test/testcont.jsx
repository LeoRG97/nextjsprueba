import React from 'react';
import withAuth from '@/helpers/withAuth';
// import { Roles } from '@/global/constants';
import { UpdateRolUserModal } from '@/components';

const AdminMain = () => {
  return (
    <>
      <div className="main-container main-bg">
        <UpdateRolUserModal />
      </div>
    </>
  );
};
// export default withAuth(AdminMain, [Roles.Admin]);
export default withAuth(AdminMain);
