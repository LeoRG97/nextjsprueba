import React from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import {
  Layout,
  TrendingBannerComponent,
  Footer,
  MainPosts,
  UserPreferencesPosts,
  MainCourses,
} from '@/components';
import { getPreferencesService } from '@/services/preferences';
import { fetchArticlesSSR, fetchArticlesByUserPreferenceSSR } from '@/services/articles';
import { fetchCoursesByUserPreferenceSSR, fetchCoursesSSR } from '@/services/courses';
import UserPreferencesCourses from '@/components/trending/userPreferencesPosts/UserPreferencesCourses';

// página general de trending topics
const TrendingPage = ({
  preferences, articulos, cursos, isAuthenticated,
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
          {
            query.type !== 'Cursos' ? (
              <>
                {query.user
                  ? <UserPreferencesPosts initialData={articulos} />
                  : (
                    <MainPosts
                      initialData={articulos}
                      preferences={preferences}
                      loggedIn={isAuthenticated}
                    />
                  )}
              </>
            ) : (
              <>
                {query.user
                  ? <UserPreferencesCourses initialData={cursos} />
                  : (
                    <MainCourses
                      initialData={cursos}
                      preferences={preferences}
                      loggedIn={isAuthenticated}
                    />
                  )}
              </>
            )
          }
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
  let courses;

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
    courses = await fetchCoursesByUserPreferenceSSR(session.accessToken, query);
  } else {
    // pre-render articles
    results = await fetchArticlesSSR(query);
    courses = await fetchCoursesSSR(query);
  }

  return {
    props: {
      preferences,
      articulos: results,
      cursos: courses,
      isAuthenticated: session !== null,
    },
  };
}

export default TrendingPage;
