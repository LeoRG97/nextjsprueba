import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import ArticlesListComponent from '@/components/articlesList/articlesListComponent/articlesList';
import { fetchPaginatedData } from '@/services/swr';
import styles from './mainPosts.module.css';
import { ApiRoutes } from '@/global/constants';
import { LoadingIndicator, TrendingCategoryFilter } from '@/components';
import TrendingPageFilters from '../trendingFilter/TrendingPageFilters';

const AllPosts = ({ preferences, initialData, loggedIn }) => {
  const router = useRouter();
  const [articles, setArticles] = useState(initialData.data);
  const [pageNum, setPageNum] = useState(1);

  const useSWROptions = [];

  if (router.query.type === 'Cursos') {
    delete router.query.type;
    useSWROptions.push(ApiRoutes.Cursos, router.query, pageNum);
  } else {
    useSWROptions.push(ApiRoutes.Articles, router.query, pageNum);
  }

  const { data, mutate } = useSWR(
    useSWROptions, fetchPaginatedData,
  );

  const onFilter = (filteredArticles) => {
    mutate({ ...data });
    setArticles(filteredArticles);
  };

  useEffect(() => {
    if (data && pageNum === 1) {
      setArticles(data.data);
    } else if (data && pageNum > 1) {
      const array = articles.concat(data.data);
      const set = new Set(array.map(JSON.stringify));
      const arrSinDuplicaciones = Array.from(set).map(JSON.parse);
      setArticles(arrSinDuplicaciones);
    }
  }, [data]);

  useEffect(() => {
    setPageNum(1);
  }, [router.query]);

  const { query } = router;

  return (
    <>
      {query.search && (
        <div className="text-center">
          <p className={`subtitle d-block ${styles.topPadding}`}>{data ? `${data.registros} resultados para` : 'Cargando...'}</p>
          <h1 className="title-xl">
            {`"${query.search}"`}
          </h1>
        </div>
      )}
      {!router.query.user && <TrendingCategoryFilter preferences={preferences} />}
      <TrendingPageFilters />
      {(articles) ? (
        <ArticlesListComponent
          articles={articles}
          showOptions
          onFilter={onFilter}
        />
      ) : <></>}
      <div className="d-flex justify-content-center">
        {!loggedIn ? (
          <div className={`${styles.listFooter} text-md text--theme-light`}>
            <div>
              Para ver más
              <Link href="/create-account" passHref>
                <button className="button button--theme-primary ms-2 me-2">Regístrate</button>
              </Link>
            </div>
            <div>
              ó
              <Link href="/login" passHref>
                <a className="text-md text-link ms-2">Inicia sesión</a>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {!data && <LoadingIndicator />}
            {
              data && data.data && data.registros > 9 ? (
                <>
                  {
                    (data.data.length > 0) && (data.registros > articles.length) ? (
                      <button
                        className="button button--theme-secondary"
                        onClick={() => setPageNum(pageNum + 1)}
                      >
                        Ver más publicaciones
                      </button>
                    ) : <></>
                  }
                </>
              ) : (<></>)
            }
          </>
        )}
      </div>
    </>
  );
};

export default AllPosts;
