/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Link from 'next/link';
import styles from './articlesList.module.css';
import { BUCKET_URL } from '@/global/constants';

const ArticlesDetailComponent = ({ article, classContent }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video': return 'F';
      case 'Podcast': return 'Q';
      default: return 'P';
    }
  };
  return (
    <>
      <Link
        key={article._id}
        href={`/trending-topics/${article.usuario_id.slug}/${article.slug}`}
        prefetch={false}
        passHref
      >
        <div className={`${styles.cardContainer} ${classContent}`}>
          <div className={styles.cardImageContainer}>
            <div className={`text-sm text--theme-light ${styles.trendingLabel}`}>
              {article.tipo}{' '}<span className="icon text--theme-light">{getTypeIcon(article.tipo)}</span>
            </div>
            {article.premium && (
              <div className={`text-sm text--theme-light ${styles.trendingLabel} ${styles.premium}`}>
                Premium{' '}<span className="icon text--theme-light">R</span>
              </div>
            )}
            <img
              src={article.portada.ruta_imagen ? `${BUCKET_URL}${article.portada.ruta_imagen}` : '/images/imgpr2.jpg'}
              alt=""
            />
          </div>
          <div className={styles.cardLikesContainer}>
            <div className="text-sm">{article.usuario_id.name} {article.usuario_id.apellidos}</div>
            <div className={`text-sm ${styles.likesContainer}`}><span className="icon">c</span>{' '}{article.likes}</div>
          </div>
          <div className={`title ${styles.cardMargin}`}>
            {article.portada.titulo || 'Sin título'}
          </div>
          <div className="text-sm">
            {article.portada.descripcion || 'Sin descripción'}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArticlesDetailComponent;