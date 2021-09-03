import React from 'react';
import {
  Layout,
  TrendingBannerComponent,
  TrendingFilterComponent,
  TrendingSelectComponent,
  ArticlesListComponent,
  Footer,
} from '@/components';

const TrendingPage = () => {
  return (
    <Layout>
      <main>
        <TrendingBannerComponent />
        <TrendingFilterComponent />
        <div className="selects-container">
          <div className="select-recent">
            <TrendingSelectComponent selectN="1" />
          </div>
          <div className="select-filter">
            <TrendingSelectComponent selectN="2" />
          </div>
        </div>
        <ArticlesListComponent />
      </main>
      <Footer />
    </Layout>
  );
};

export default TrendingPage;
