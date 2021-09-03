import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Layout,
  TrendingBannerComponent,
  TrendingArticleComponent,
  Footer,
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
        <TrendingArticleComponent />
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
