import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import ArticleListSelectComponent from '@/components/articlesList/articleListSelectComponent/ArticleListSelect';
import { fetchPaginatedDataWithAuthTokenCourses } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import { CoursesListComponent, LoadingIndicator, TrendingFilterComponent } from '@/components';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';
import { getProfile } from '@/services/profile';

const UserPreferencesCourses = ({ initialData }) => {
  const [session] = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState(initialData.data);
  const [pageNum, setPageNum] = useState(1);
  const [preferencesUser, setPreferencesUser] = useState([]);

  const { data, mutate } = useSWR(
    [ApiRoutes.CursosUserPreference, router.query, pageNum],
    fetchPaginatedDataWithAuthTokenCourses,
  );

  const onFilter = (filteredCourses) => {
    mutate([...data]);
    setCourses(filteredCourses);
  };

  useEffect(() => {
    if (data && pageNum === 1) {
      setCourses(data.data);
    } else if (data && pageNum > 1) {
      const array = courses.concat(data.data);
      const set = new Set(array.map(JSON.stringify));
      const arrSinDuplicaciones = Array.from(set).map(JSON.parse);
      setCourses(arrSinDuplicaciones);
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
    <div>
      {
        router.query.user && preferencesUser
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
              { label: 'Más antiguos', value: 'asc' },
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
      {(courses) ? (
        <CoursesListComponent
          cursos={courses}
          showOptions
          onFilter={onFilter}
        />
      ) : <></>}
      <div className="d-flex justify-content-center">
        {!data && <LoadingIndicator />}
        {data && data.data.length > 0 && data.registros > courses.length && (
          <button
            className="button button--theme-secondary"
            onClick={() => setPageNum(pageNum + 1)}
          >
            Ver más cursos
          </button>
        )}
      </div>
    </div>
  );
};

export default UserPreferencesCourses;
