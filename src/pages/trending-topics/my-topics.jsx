import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Layout,
  TrendingBannerComponent,
  ArticleListSelectComponent,
  Footer,
  ArticlesListComponent,
} from '@/components';

// página para los intereses del usuario
const TrendingPageUser = () => {
  const router = useRouter();

  useEffect(() => {

  }, [router]);

  // Todo
  return (
    <Layout>
      <main>
        <TrendingBannerComponent />
        <div className="selects-container">
          <div className="select-recent">
            <ArticleListSelectComponent selectN="1" />
          </div>
          <div className="select-filter">
            <ArticleListSelectComponent selectN="2" />
          </div>
        </div>
        <ArticlesListComponent />
      </main>
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default TrendingPageUser;
