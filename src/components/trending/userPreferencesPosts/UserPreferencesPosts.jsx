import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import ArticleListSelectComponent from '@/components/articlesList/articleListSelectComponent/ArticleListSelect';
import ArticlesListComponent from '@/components/articlesList/articlesListComponent/articlesList';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';
import { fetchPaginatedDataWithAuthToken } from '@/services/swr';
import { getProfile } from '@/services/profile';
import { ApiRoutes } from '@/global/constants';
import { LoadingIndicator, TrendingFilterComponent } from '@/components';

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
    mutate([...data]);
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

  const { query } = router;

  return (
    <>
      {
        router.query.user && preferencesUser && preferencesUser.length > 0
        && <TrendingFilterComponent preferences={preferencesUser} />
      }
      <div className="selects-container">
        <div className="select-recent">
          <ArticleListSelectComponent
            defaultTitle="Más recientes"
            currentValue={query.sort}
            onChange={handleOrderChange}
            selectN="1"
            items={[
              { label: 'Más recientes', value: 'desc' },
              { label: 'Más antiguas', value: 'asc' },
            ]}
          />
        </div>
        <div className="select-filter">
          <TooltipContainer
            placement="top"
            tooltipText="Filtrar por tipo de entrada"
          >
            <div>
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
                  { label: 'Cursos', value: 'Cursos' },
                ]}
              />
            </div>
          </TooltipContainer>
        </div>
      </div>
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
