/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { BUCKET_URL } from '@/global/constants';
import styles from './articlesList.module.css';
// import Link from 'next/link';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';
import { DeleteModal } from '@/components';
import { showPremiumAlert } from '@/reducers/alert';

const ArticlesDetailComponent = ({
  article, classContent, isAdmin = false, onDelete, estado,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [optionsModal, setOptionsModal] = useState({});
  const { data } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video': return 'F';
      case 'Podcast': return 'Q';
      default: return 'P';
    }
  };

  const router = useRouter();

  const showArticle = () => {
    if (data.role) {
      if (data.role !== 'user' && article.premium === true && estado !== 'borrador') {
        router.push(`/trending-topics/${article.usuario_id.slug}/${article.slug}`);
      } else if (data.role === 'user' && article.premium === true) {
        dispatch(showPremiumAlert());
      } else if (article.premium === false && data.role !== undefined && estado !== 'borrador') {
        router.push(`/trending-topics/${article.usuario_id.slug}/${article.slug}`);
      }
    } else if (article.premium === true) {
      dispatch(showPremiumAlert());
    } else {
      router.push(`/trending-topics/${article.usuario_id.slug}/${article.slug}`);
    }
  };

  const handleUpdate = () => {
    router.push(`/editor/${article.tipo.toLowerCase()}/${article._id}`);
  };

  const deleteArticleFunc = (id) => {
    setOptionsModal({
      fncConfirm: id,
      cancel: 'Cancelar',
      confirm: 'Eliminar articulo',
      textHeader: 'Alerta',
      textBody: 'Estás apunto de eliminar este articulo ¿Seguro que deseas continuar?',
    });
    setModalDelete(true);
  };

  const onThisDelete = () => {
    setModalDelete(false);
    onDelete(optionsModal.fncConfirm);
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
      eventName: () => deleteArticleFunc(article._id),
      data: true,
      iconType: 'L',
    },
  ]);

  return (
    article ? (
      <>
        <div
          key={article._id}
          className={estado !== 'borrador' ? `${styles.cardContainer} ${classContent} ${isAdmin && styles.adminOptions}` : `${styles.cardContainerNotFocus} ${styles.cardContainer}`}
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

            <div className={styles.image}>
              {article.portada && article.portada.ruta_imagen ? (
                <Image
                  src={`${BUCKET_URL}${article.portada.ruta_imagen}`}
                  alt={article.portada.titulo || ''}
                  layout="fill"
                  objectFit="cover"
                  onClick={showArticle}
                />
              ) : (
                <div className={styles.emptyImg}>
                  <span className="icon">E</span>
                </div>
              )}
            </div>

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
            article.portada && article.portada.titulo ? (
              <>
                <div onClick={showArticle} className={`title ${styles.cardMargin}`}>
                  {article.portada.titulo || 'Sin título'}
                </div>
              </>
            ) : (
              <>
                <div className={`title ${styles.cardMargin}`}>
                  Sin título
                </div>
              </>
            )
          }
          {
            article.portada && article.portada.descripcion ? (
              <>
                <div onClick={showArticle} className="text-sm text--theme-light">
                  {article.portada.descripcion || 'Sin descripción'}
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text--theme-light">
                  Sin descripción
                </div>
              </>
            )
          }
        </div>
        <DeleteModal
          show={modalDelete}
          onClose={() => setModalDelete(false)}
          functionDelete={() => onThisDelete()}
          btnConfirm={optionsModal.confirm}
          btnCancel={optionsModal.cancel}
          textHeader={optionsModal.textHeader}
          textBody={optionsModal.textBody}
        />
      </>
    ) : (<></>)
  );
};

export default ArticlesDetailComponent;
