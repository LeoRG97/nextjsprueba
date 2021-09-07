import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import {
  Layout,
  TrendingBannerComponent,
  TrendingFilterComponent,
  ArticleListSelectComponent,
  ArticlesListComponent,
  Footer,
} from '@/components';
import { getPreferencesService } from '@/services/preferences';
import styles from '@/global/styles/Topics.module.css';
import { fetchAllArticles } from '@/services/articles';

// página general de trending topics
const TrendingPage = ({ preferences, articulos }) => {
  const router = useRouter();
  const [session] = useSession();

  // const { data } = useSWR(
  //   ['/articulos', router.query],
  //   fetcher,
  //   { fallbackData: articulos, revalidateOnMount: true },
  // );

  const handleOrderChange = (item) => {
    const { query, pathname } = router;
    router.push({
      pathname,
      query: { ...query, sort: item.value },
    }, undefined, { scroll: false });
  };

  const handleTypeChange = (item) => {
    const { query, pathname } = router;
    delete query.type;
    router.push({
      pathname,
      query: {
        ...query,
        ...(item.value && { type: item.value }),
      },
    }, undefined, { scroll: false });
  };

  const { query } = router;

  return (
    <Layout>
      <main>
        <TrendingBannerComponent />
        <div className="container">
          <TrendingFilterComponent preferences={preferences} />
          <div className="selects-container">
            <div className="select-recent">
              <ArticleListSelectComponent
                defaultTitle="Más recientes"
                currentValue={query.sort}
                onChange={handleOrderChange}
                selectN="1"
                items={[
                  { label: 'Más recientes', value: 'newest-first' },
                  { label: 'Más antiguos', value: 'oldest-first' },
                ]}
              />
            </div>
            <div className="select-filter">
              <ArticleListSelectComponent
                defaultTitle="Todos"
                currentValue={query.type}
                onChange={handleTypeChange}
                selectN="2"
                items={[
                  { label: 'Todos', value: '' },
                  { label: 'Blogs', value: 'Blog' },
                  { label: 'Videos', value: 'Video' },
                  { label: 'Podcasts', value: 'Podcast' },
                ]}
              />
            </div>
          </div>
          {(articulos) ? (
            <ArticlesListComponent
              articles={articulos}
            />
          ) : <></>}

          <div className="d-flex justify-content-center">
            {!session ? (
              <div className={`${styles.listFooter} text-regular text--theme-light`}>
                Para ver más
                <Link href="/create-account" passHref>
                  <button className="button button--theme-primary">Regístrate</button>
                </Link>
                ó
                <Link href="/login" passHref>
                  <a className="text-regular text-link">Inicia sesión</a>
                </Link>
              </div>
            ) : (
              <button className="button button--theme-secondary">Ver más publicaciones</button>
            )}

          </div>

        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const { data: preferences } = await getPreferencesService();

  const { category, type, sort } = query;
  const res = await fetchAllArticles(category, type, sort);

  return {
    props: {
      articulos: res.data,
      preferences,
    },
  };
}

export default TrendingPage;
