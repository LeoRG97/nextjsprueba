import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/client';
import { fetchData } from '@/services/swr';
import { LoadingIndicator } from '@/components';
import ArticlesDetailComponent from '@/components/articlesList/articlesListComponent/articleDetall';
import { ApiRoutes } from '@/global/constants';

const RatedArticles = () => {
  const [session] = useSession();

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.UserRatedArticles}/${session.user.id}?pageNum=${pageIndex + 1}&pageSize=9`; // API endpoint
  };

  const {
    data, size, setSize, isValidating,
  } = useSWRInfinite(getKey, fetchData);

  const isEmpty = data?.[size - 1]?.length === 0;

  return (
    <>
      {data && data.map((page) => {
        return page.map((article) => (
          <ArticlesDetailComponent key={article._id} article={article} />
        ));
      })}
      <div className="d-flex justify-content-center">
        <>
          {isValidating
            ? <LoadingIndicator />
            : !isEmpty && (
              <button
                className="button button--theme-secondary"
                onClick={() => setSize(size + 1)}
              >
                Ver más publicaciones
              </button>
            )}
        </>
      </div>
    </>
  );
};

export default RatedArticles;
