import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Layout,
  TrendingBannerComponent,
  TrendingArticleComponent,
  TrendingFilterComponent,
  Footer,
} from '@/components';
import { getPreferencesService } from '@/services/preferences';

// página general de trending topics
const TrendingPage = ({ preferences }) => {
  const router = useRouter();

  useEffect(() => {

  }, [router]);

  return (
    <Layout>
      <main>
        <TrendingBannerComponent />
        <TrendingFilterComponent preferences={preferences} />
        <TrendingArticleComponent />
      </main>
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps() {
  const { data: preferences } = await getPreferencesService();
  return {
    props: {
      preferences,
    },
  };
}

export default TrendingPage;
