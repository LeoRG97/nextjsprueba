import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { fetchCoursesPaginatedData } from '@/services/swr';
import styles from './mainPosts.module.css';
import { ApiRoutes } from '@/global/constants';
import { CoursesListComponent, LoadingIndicator, TrendingCategoryFilter } from '@/components';
import TrendingPageFilters from '../trendingFilter/TrendingPageFilters';

const AllCourses = ({ preferences, initialData, loggedIn }) => {
  const router = useRouter();
  const [cursos, setCursos] = useState(initialData?.data ? initialData.data : []);
  const [pageNum, setPageNum] = useState(1);
  const estado = 'publicado';

  const { data, mutate } = useSWR(
    [ApiRoutes.Cursos, router.query, pageNum, estado],
    fetchCoursesPaginatedData,
  );

  const onFilter = (filteredCursos) => {
    mutate({ ...data });
    setCursos(filteredCursos);
  };
  useEffect(() => {
    if (data && pageNum === 1) {
      setCursos(data.data);
    } else if (data && pageNum > 1) {
      const array = cursos.concat(data.data);
      const set = new Set(array.map(JSON.stringify));
      const arrSinDuplicaciones = Array.from(set).map(JSON.parse);
      setCursos(arrSinDuplicaciones);
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
      {(cursos) ? (
        <CoursesListComponent
          cursos={cursos}
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
              data && data.data ? (
                <>
                  {
                    (data.data.length > 0) && data.registros > cursos.length && (
                      <button
                        className="button button--theme-secondary"
                        onClick={() => setPageNum(pageNum + 1)}
                      >
                        Ver más cursos
                      </button>
                    )
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

export default AllCourses;
