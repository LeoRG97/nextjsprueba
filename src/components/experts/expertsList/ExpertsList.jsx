import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import { LoadingIndicator } from '@/components';
import styles from './expertsList.module.css';
import UserCard from '../userCard/UserCard';

const ExpertsList = ({ initialData }) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data.length) return null; // reached the end
    return `${ApiRoutes.Experts}?pageNum=${pageIndex + 1}&pageSize=8`; // API endpoint
  };

  const {
    data, size, setSize, isValidating,
  } = useSWRInfinite(getKey, fetchData, {
    fallbackData: [initialData],
  });

  const isEmpty = data?.[size - 1]?.data.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className="subtitle">{data[0].registros} resultados para</p>
        <h1 className="title-xl">Todos los expertos</h1>
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
