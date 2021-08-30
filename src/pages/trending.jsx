import React from 'react';
import {
  Layout,
  TrendingBannerComponent,
  TrendingArticleComponent,
  TrendingFilterComponent,
  Footer,
} from '@/components';

const TrendingPage = () => {
  return (
    <Layout>
      <main>
        <TrendingBannerComponent />
        <TrendingFilterComponent />
        <TrendingArticleComponent />
      </main>
      <Footer />
    </Layout>
  );
};

export default TrendingPage;
