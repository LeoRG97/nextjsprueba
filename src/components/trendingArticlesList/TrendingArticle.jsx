/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { TrendingSelectComponent } from '@/components';
import styles from './tArticle.module.css';

const TrendingArticleComponent = () => {
  const articulos = [
    {
      id: '1',
      nombre: 'Emprender: La clave es el enfoque',
    },
    {
      id: '2',
      nombre: 'Emprender: La clave es el enfoque',
    },
    {
      id: '3',
      nombre: 'Emprender: La clave es el enfoque',
    },
    {
      id: '4',
      nombre: 'Emprender: La clave es el enfoque',
    },
    {
      id: '5',
      nombre: 'Emprender: La clave es el enfoque',
    },
    {
      id: '6',
      nombre: 'Emprender: La clave es el enfoque',
    },
    {
      id: '7',
      nombre: 'Emprender: La clave es el enfoque',
    },
  ];

  return (
    <div className={styles.articlesContainer}>
      <div className={styles.selectsContainer}>
        <div className={styles.selectRecent}>
          <TrendingSelectComponent selectN="1" />
        </div>
        <div className={styles.selectFilter}>
          <TrendingSelectComponent selectN="2" />
        </div>
      </div>
      {articulos.map((index, i) => {
        return (
          <div key={articulos[i].id} className={styles.cardContainer}>
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
        );
      })}
    </div>
  );
};

export default TrendingArticleComponent;
