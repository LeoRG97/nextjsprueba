import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import ArticleListSelectComponent from '@/components/articlesList/articleListSelectComponent/ArticleListSelect';
import TrendingFilterComponent from '../trendingFilter/TrendingFilter';
import ArticlesListComponent from '@/components/articlesList/articlesListComponent/articlesList';
import { fetchPaginatedData } from '@/services/swr';
import styles from './mainPosts.module.css';
import { ApiRoutes } from '@/global/constants';
import { LoadingIndicator } from '@/components';

const AllPosts = ({ preferences, initialData, loggedIn }) => {
  const router = useRouter();
  const [articles, setArticles] = useState(initialData);
  const [pageNum, setPageNum] = useState(1);

  const { data } = useSWR(
    [ApiRoutes.Articles, router.query, pageNum],
    fetchPaginatedData,
  );

  useEffect(() => {
    if (data && pageNum === 1) {
      setArticles(data);
    } else if (data && pageNum > 1) {
      setArticles([...articles, ...data]);
    }
  }, [data]);

  useEffect(() => {
    setPageNum(1);
  }, [router.query]);

  const handleOrderChange = (item) => {
    const { query, pathname } = router;
    router.push({
      pathname,
      query: { ...query, sort: item.value },
    }, undefined, { scroll: false, shallow: true });
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
    }, undefined, { scroll: false, shallow: true });
  };

  const { query } = router;

  return (
    <>
      {!router.query.user && <TrendingFilterComponent preferences={preferences} />}
      <div className="selects-container">
        <div className="select-recent">
          <ArticleListSelectComponent
            defaultTitle="Más recientes"
            currentValue={query.sort}
            onChange={handleOrderChange}
            selectN="1"
            items={[
              { label: 'Más recientes', value: 'desc' },
              { label: 'Más antiguos', value: 'asc' },
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
      {(articles) ? (
        <ArticlesListComponent
          articles={articles}
        />
      ) : <></>}
      <div className="d-flex justify-content-center">
        {!loggedIn ? (
          <div className={`${styles.listFooter} text-regular text--theme-light`}>
            <div>
              Para ver más
              <Link href="/create-account" passHref>
                <button className="button button--theme-primary ms-2 me-2">Regístrate</button>
              </Link>
            </div>
            <div>
              ó
              <Link href="/login" passHref>
                <a className="text-regular text-link ms-2">Inicia sesión</a>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {!data && <LoadingIndicator />}
            {data && data.length > 0 && (
              <button
                className="button button--theme-secondary"
                onClick={() => setPageNum(pageNum + 1)}
              >
                Ver más publicaciones
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllPosts;