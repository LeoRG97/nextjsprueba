/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Link from 'next/link';
import styles from './articlesList.module.css';

const ArticlesListComponent = ({ articles }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video': return 'F';
      case 'Podcast': return 'Q';
      default: return 'P';
    }
  };

  return (
    <div>
      {articles.map((article) => {
        return (
          <Link
            key={article._id}
            href={`/trending-topics/${article.usuario_id.slug}/${article.slug}`}
            prefetch={false}
            passHref
          >
            <div className={styles.cardContainer}>
              <div className={styles.cardImageContainer}>
                <div className={`main-bg text-sm text--theme-light ${styles.trendingLabel}`}>
                  {article.tipo}{' '}<span className="icon text--theme-light">{getTypeIcon(article.tipo)}</span>
                </div>
                <img src="/images/imgpr2.jpg" alt="" />
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
        );
      })}
    </div>
  );
};

export default ArticlesListComponent;
