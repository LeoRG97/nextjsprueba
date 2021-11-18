import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import { fetchData } from '@/services/swr';
import { LoadingIndicator } from '@/components';
import ArticlesDetailComponent from '@/components/articlesList/articlesListComponent/articleDetall';
import { ApiRoutes } from '@/global/constants';

const ProfileSavedArts = () => {
  const [session] = useSession();

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data.length) return null; // reached the end
    return `${ApiRoutes.UserSavedArticles}/${session.user.id}/user?pageNum=${pageIndex + 1}&pageSize=9`; // API endpoint
  };

  const {
    data, size, setSize, isValidating,
  } = useSWRInfinite(getKey, fetchData);

  const { data: total } = useSWR([ApiRoutes.UserTotals, session.user.id],
    { fallbackData: { biblioteca: 0 } });

  const { biblioteca } = total;

  const isEmpty = size * 9 >= biblioteca;

  return (
    <>
      {data && data.map((page) => {
        return page.data.map((saved) => {
          const article = { ...saved.articulo[0], usuario_id: saved.autor[0], likes: saved.likes };
          return (
            <ArticlesDetailComponent key={saved._id} article={article} />
          );
        });
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

export default ProfileSavedArts;
