import React from 'react';
import { Layout } from '@/components';
import withAuth from '@/helpers/withAuth';
import { Roles } from '@/global/constants';

const AdminMain = () => {
  return (
    <Layout>
      <h1 className="title-xl pt-5">Admin Index</h1>
    </Layout>
  );
};

export default withAuth(AdminMain, [Roles.Admin]);
