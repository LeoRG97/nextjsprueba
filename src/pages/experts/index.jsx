import React from 'react';
import { Footer, Layout } from '@/components';
import ExpertsList from '@/components/experts/expertsList/ExpertsList';
import { getExpertsSSR } from '@/services/user';
// import { getExperts } from '@/services/user';

const ExpertsPage = ({ initialData }) => {
  return (
    <Layout>
      <div className="container">
        <ExpertsList initialData={initialData} />
      </div>
      <Footer />
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getExpertsSSR({ pageNum: 1 });
  return {
    props: {
      initialData: res,
    },
    revalidate: 60,
  };
}

export default ExpertsPage;
