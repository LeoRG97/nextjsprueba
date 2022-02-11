import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import { fetchPaginatedDataWithAuthTokenCourses } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import { CoursesListComponent, LoadingIndicator, TrendingCategoryFilter } from '@/components';
import { getProfile } from '@/services/profile';
import TrendingPageFilters from '../trendingFilter/TrendingPageFilters';

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
    mutate({ ...data });
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
    <div>
      {
        router.query.user && preferencesUser
        && <TrendingCategoryFilter preferences={preferencesUser} />
      }
      <TrendingPageFilters />
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
