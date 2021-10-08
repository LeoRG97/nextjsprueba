import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { useRouter } from 'next/router';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import { LoadingIndicator } from '@/components';
import styles from './expertsList.module.css';
import UserCard from '../userCard/UserCard';

const ExpertsList = () => {
  const router = useRouter();
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data.length) return null; // reached the end
    let params = '';
    if (router.query.search) params = `${params}&cadena=${router.query.search}`;
    return `${ApiRoutes.Experts}?pageNum=${pageIndex + 1}&pageSize=8${params}`; // API endpoint
  };

  const {
    data, size, setSize, isValidating,
  } = useSWRInfinite(getKey, fetchData, {
    fallbackData: [{ data: [], registros: 0 }],
  });

  const isEmpty = data?.[size - 1]?.data.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className="subtitle">{isValidating ? 'Cargando... ' : `${data[0].registros} resultados para`}</p>
        <h1 className="title-xl">
          {
            router.asPath.includes('search')
              ? `"${router.query.search}"`
              : 'Todos los expertos'
          }
        </h1>
      </div>

      {data && data.map((page) => {
        return page.data.map((user) => (
          <UserCard key={user._id} user={user} />
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
                Ver más resultados
              </button>
            )}
        </>
      </div>
    </div>
  );
};

export default ExpertsList;
