import React from 'react';
import { Footer, Layout } from '@/components';
import ExpertsList from '@/components/experts/expertsList/ExpertsList';

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
