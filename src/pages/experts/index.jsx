import React from 'react';
import dynamic from 'next/dynamic';
import { Layout } from '@/components';
import ExpertsList from '@/components/experts/expertsList/ExpertsList';

const Footer = dynamic(() => import('@/components/footer/Footer'));

const ExpertsPage = () => {
  return (
    <Layout>
      <div className="container">
        <ExpertsList />
      </div>
      <Footer />
    </Layout>
  );
};

export default ExpertsPage;
