/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TrendingSelectComponent } from '@/components';
import styles from './tArticle.module.css';

const TrendingArticleComponent = () => {
  const router = useRouter();
  const articulos = [
    {
      id: '1',
      nombre: 'Emprender: La clave es el enfoque',
      slug: 'emprender-la-clave-es-el-enfoque',
      usuario_id: {
        slug: 'user-123',
      },
    },
    {
      id: '2',
      nombre: 'Emprender: La clave es el enfoque',
      slug: 'emprender-la-clave-es-el-enfoque',
      usuario_id: {
        slug: 'user-123',
      },
    },
    {
      id: '3',
      nombre: 'Emprender: La clave es el enfoque',
      slug: 'emprender-la-clave-es-el-enfoque',
      usuario_id: {
        slug: 'user-123',
      },
    },
    {
      id: '4',
      nombre: 'Emprender: La clave es el enfoque',
      slug: 'emprender-la-clave-es-el-enfoque',
      usuario_id: {
        slug: 'user-123',
      },
    },
    {
      id: '5',
      nombre: 'Emprender: La clave es el enfoque',
      slug: 'emprender-la-clave-es-el-enfoque',
      usuario_id: {
        slug: 'user-123',
      },
    },
    {
      id: '6',
      nombre: 'Emprender: La clave es el enfoque',
      slug: 'emprender-la-clave-es-el-enfoque',
      usuario_id: {
        slug: 'user-123',
      },
    },
    {
      id: '7',
      nombre: 'Emprender: La clave es el enfoque',
      slug: 'emprender-la-clave-es-el-enfoque',
      usuario_id: {
        slug: 'user-123',
      },
    },
  ];

  const handleOrderChange = (item) => {
    const { query, pathname } = router;
    router.push({
      pathname,
      query: { ...query, sort: item.value },
    }, undefined, { scroll: false });
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
    <div className={styles.articlesContainer}>
      <div className={styles.selectsContainer}>
        <div className={styles.selectRecent}>
          <TrendingSelectComponent
            defaultTitle="Más recientes"
            currentValue={query.sort}
            onChange={handleOrderChange}
            selectN="1"
            items={[
              { label: 'Más recientes', value: 'newest-first' },
              { label: 'Más antiguos', value: 'oldest-first' },
            ]}
          />
        </div>
        <div className={styles.selectFilter}>
          <TrendingSelectComponent
            defaultTitle="Todos"
            currentValue={query.type}
            onChange={handleTypeChange}
            selectN="2"
            items={[
              { label: 'Todos', value: '' },
              { label: 'Blogs', value: 'Blog' },
              { label: 'Videos', value: 'Video' },
              { label: 'Podcasts', value: 'Podcast' },
            ]}
          />
        </div>
      </div>
      {articulos.map((index, i) => {
        return (
          <Link
            key={articulos[i].id}
            href={`/trending-topics/post/${articulos[i].slug}`}
            prefetch={false}
            passHref
          >
            <div className={styles.cardContainer}>
              <div className={styles.cardImageContainer}>
                <div className={`main-bg text-sm ${styles.trendingLabel}`}>Post <span className="icon">C</span></div>
                <img src="/images/imgpr2.jpg" alt="" />
              </div>
              <div className={styles.cardLikesContainer}>
                <div className="text-sm">Autor</div>
                <div className={`text-sm ${styles.likesContainer}`}><span className="icon">C</span> likes</div>
                <div className={`text-sm ${styles.viewsContainer}`}><span className="icon">C</span> vistas</div>
              </div>
              <div className={`title ${styles.cardMargin}`}>
                {articulos[i].nombre}
              </div>
              <div className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TrendingArticleComponent;
