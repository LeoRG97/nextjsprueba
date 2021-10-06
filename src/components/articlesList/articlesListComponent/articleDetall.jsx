/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BUCKET_URL } from '@/global/constants';
import styles from './articlesList.module.css';
// import Link from 'next/link';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';

const ArticlesDetailComponent = ({
  article, classContent, isAdmin = false, onDelete,
}) => {
  const [showOptions, setShowOptions] = useState(false);
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

  const handleUpdate = () => {
    router.push(`/editor/${article.tipo.toLowerCase()}/${article._id}`);
  };

  const [options] = useState([
    {
      option: 'Modificar',
      event: true,
      eventName: handleUpdate,
      data: true,
      iconType: 'K',
    },
    {
      option: 'Eliminar',
      event: true,
      eventName: () => onDelete(article._id),
      data: true,
      iconType: 'L',
    },
  ]);

  return (
    article ? (
      <>
        <div
          key={article._id}
          className={`${styles.cardContainer} ${classContent} ${isAdmin && styles.adminOptions}`}
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <div className={styles.cardImageContainer}>
            {
              isAdmin && showOptions && (
                <>
                  <div className={styles.options}>
                    <OptionDropdown
                      options={options}
                    />
                  </div>
                </>

              )
            }
            {isAdmin && (
              <div className={styles.optionsMobile}>
                <OptionDropdown
                  options={options}
                />
              </div>
            )}
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

          {
            article.usuario_id ? (
              <div onClick={showArticle} className={styles.cardLikesContainer}>
                <div className="text-sm">{article.usuario_id.name} {article.usuario_id.apellidos}</div>
                <div className={`text-sm ${styles.likesContainer}`}><span className="icon">c</span>{' '}{article.likes}</div>
              </div>
            ) : (<></>)
          }
          {
            article.portada && article.portada.titulo && (
              <>
                <div onClick={showArticle} className={`title ${styles.cardMargin}`}>
                  {article.portada.titulo || 'Sin título'}
                </div>
              </>
            )
          }
          {
            article.portada && article.portada.descripcion && (
              <>
                <div onClick={showArticle} className="text-sm">
                  {article.portada.descripcion || 'Sin descripción'}
                </div>
              </>
            )
          }
        </div>
      </>
    ) : (<></>)
  );
};

export default ArticlesDetailComponent;
