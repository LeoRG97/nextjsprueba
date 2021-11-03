import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ArticleListSelectComponent from '@/components/articlesList/articleListSelectComponent/ArticleListSelect';
import { fetchPaginatedDataWithAuthTokenCourses } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import { CoursesListComponent, LoadingIndicator } from '@/components';

const UserPreferencesCourses = ({ initialData }) => {
  const router = useRouter();
  const [courses, setCourses] = useState(initialData);
  const [pageNum, setPageNum] = useState(1);

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
      setCourses(data);
    } else if (data && pageNum > 1) {
      const array = courses.concat(data);
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

  const { query } = router;

  return (
    <>
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
              { label: 'Cursos', value: 'Cursos' },
            ]}
          />
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
        {data && data.length > 0 && data.registros > 9 && (
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

export default UserPreferencesCourses;
