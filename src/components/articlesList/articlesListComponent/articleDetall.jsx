/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useRouter } from 'next/router';
import { BUCKET_URL } from '@/global/constants';
import styles from './articlesList.module.css';
// import Link from 'next/link';
import { ArticleOptionsAdmin } from './articleOptionsAdmin';

const ArticlesDetailComponent = ({ article, classContent, isAdmin = false }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video': return 'F';
      case 'Podcast': return 'Q';
      default: return 'P';
    }
  };

  const router = useRouter();

  const showArticle = () => {
    router.push(`/trending-topics/${article.usuario_id.slug}/${article.slug}`);
  };

  const handleEditArticle = () => {
    router.push(`/editor/${article.tipo.toLowerCase()}/${article._id}`);
  };

  return (
    <>
      <div key={article._id} className={`${styles.cardContainer} ${classContent} ${isAdmin && styles.adminOptions}`}>
        <div className={styles.cardImageContainer}>
          {
            isAdmin && (
              <ArticleOptionsAdmin
                onEdit={handleEditArticle}
              />
            )
          }
          <div className={`text-sm text--theme-light ${styles.trendingLabel}`}>
            {article.tipo}{' '}<span className="icon text--theme-light">{getTypeIcon(article.tipo)}</span>
          </div>
          {article.premium && !isAdmin && (
            <div className={`text-sm text--theme-light ${styles.trendingLabel} ${styles.premium}`}>
              Premium{' '}<span className="icon text--theme-light">R</span>
            </div>
          )}
          <img
            onClick={showArticle}
            src={article.portada && article.portada.ruta_imagen ? `${BUCKET_URL}${article.portada.ruta_imagen}` : '/images/imgpr2.jpg'}
            alt=""
          />
        </div>

        <div onClick={showArticle} className={styles.cardLikesContainer}>
          <div className="text-sm">{article.usuario_id.name} {article.usuario_id.apellidos}</div>
          <div className={`text-sm ${styles.likesContainer}`}><span className="icon">c</span>{' '}{article.likes}</div>
        </div>
        <div onClick={showArticle} className={`title ${styles.cardMargin}`}>
          {article.portada && article.portada.titulo ? article.portada.titulo : 'Sin título'}
        </div>
        <div onClick={showArticle} className="text-sm">
          {article.portada && article.portada.descripcion ? article.portada.descripcion : 'Sin descripción'}
        </div>
      </div>
    </>
  );
};

export default ArticlesDetailComponent;
