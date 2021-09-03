/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Link from 'next/link';
import styles from './articlesList.module.css';

const ArticlesListComponent = () => {
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

  return (
    <div className={styles.articlesContainer}>
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

export default ArticlesListComponent;
