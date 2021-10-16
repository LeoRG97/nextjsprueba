import React from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import {
  Layout,
  TrendingBannerComponent,
  Footer,
  MainPosts,
  UserPreferencesPosts,
} from '@/components';
import { getPreferencesService } from '@/services/preferences';
import { fetchArticlesSSR, fetchArticlesByUserPreferenceSSR } from '@/services/articles';

// página general de trending topics
const TrendingPage = ({
  preferences, articulos, isAuthenticated,
}) => {
  const router = useRouter();
  const { query } = router;

  return (
    <Layout>
      <main>
        <TrendingBannerComponent
          loggedIn={isAuthenticated}
        />
        <div className="container">

          {query.user
            ? <UserPreferencesPosts initialData={articulos} />
            : (
              <MainPosts
                initialData={articulos}
                preferences={preferences}
                loggedIn={isAuthenticated}
              />
            )}

        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps({ query, req }) {
  const { data: preferences } = await getPreferencesService();
  const session = await getSession({ req });
  let results;

  if (query.search) {
    return {
      props: {
        preferences,
        articulos: {},
        isAuthenticated: session !== null,
      },
    };
  }

  if (query.user) {
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/trending-topics',
        },
      };
    }
    // pre-render articles for the user according to its preferences
    results = await fetchArticlesByUserPreferenceSSR(session.accessToken, query);
  } else {
    // pre-render articles
    results = await fetchArticlesSSR(query);
  }

  return {
    props: {
      preferences,
      articulos: results,
      isAuthenticated: session !== null,
    },
  };
}

export default TrendingPage;
