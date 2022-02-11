import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import ArticlesListComponent from '@/components/articlesList/articlesListComponent/articlesList';
import { fetchPaginatedDataWithAuthToken } from '@/services/swr';
import { getProfile } from '@/services/profile';
import { ApiRoutes } from '@/global/constants';
import { LoadingIndicator, TrendingCategoryFilter } from '@/components';
import TrendingPageFilters from '../trendingFilter/TrendingPageFilters';

const UserPreferencesPosts = ({ initialData }) => {
  const [session] = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState(initialData && initialData.data ? initialData.data : []);
  const [pageNum, setPageNum] = useState(1);
  const [preferencesUser, setPreferencesUser] = useState([]);

  const { data, mutate } = useSWR(
    [ApiRoutes.ArticlesUserPreference, router.query, pageNum],
    fetchPaginatedDataWithAuthToken,
  );

  const onFilter = (filteredArticles) => {
    mutate({ ...data });
    setArticles(filteredArticles);
  };

  useEffect(() => {
    if (data && data.data && pageNum === 1) {
      setArticles(data.data);
    } else if (data && data.data && pageNum > 1) {
      const array = articles.concat(data.data);
      const set = new Set(array.map(JSON.stringify));
      const arrSinDuplicaciones = Array.from(set).map(JSON.parse);
      setArticles(arrSinDuplicaciones);
    }
  }, [data]);

  useEffect(() => {
    setPageNum(1);
  }, [router.query]);

  useEffect(async () => {
    if (session && session.user) {
      const user = await getProfile(session.user.id);
      if (user.preferences) {
        if ((user.preferences.length !== preferencesUser.length)) {
          setPreferencesUser(user.preferences);
        }
      }
    }
  }, [preferencesUser, session]);

  return (
    <>
      {
        router.query.user && preferencesUser && preferencesUser.length > 0
        && <TrendingCategoryFilter preferences={preferencesUser} />
      }
      <TrendingPageFilters />
      {(articles) ? (
        <ArticlesListComponent
          articles={articles}
          showOptions
          onFilter={onFilter}
        />
      ) : <></>}
      <div className="d-flex justify-content-center">
        {!data && <LoadingIndicator />}
        {data && data.data && data.data.length > 0 && data.registros > articles.length && (
          <button
            className="button button--theme-secondary"
            onClick={() => setPageNum(pageNum + 1)}
          >
            Ver más publicaciones
          </button>
        )}
      </div>
    </>
  );
};

export default UserPreferencesPosts;
