/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/client';
import { useSWRConfig } from 'swr';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import {
  ArticleListSelectComponent,
  LoadingIndicator,
} from '@/components';
import ArticlesDetailComponent from '@/components/articlesList/articlesListComponent/articleDetall';
import { deleteArticle } from '@/services/articles';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '@/components/modalsIndicators/SuccesModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import styles from './profile.module.css';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';

const ProfileArticles = ({ estado }) => {
  const router = useRouter();
  const {
    mutate: globalMutate,
  } = useSWRConfig();
  const [loadModal, setLoadModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalError, setModalError] = useState(false);

  const [session] = useSession();

  const getKey = (pageIndex, previousPageData) => {
    let params = '';

    if (router.query.type) {
      const { type } = router.query;
      params = `${params}&tipo=${type}`;
    }

    if (previousPageData && !previousPageData.data.length) return null; // reached the end
    return `${ApiRoutes.ArticlesUserAuthor}/${session.user.id}?estado=${estado}&pageNum=${pageIndex + 1}&pageSize=9${params}`; // API endpoint
  };

  const {
    data, size, setSize, isValidating, mutate,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  const onDelete = async (id) => {
    setLoadModal(true);
    try {
      await deleteArticle(id);
      mutate();
      globalMutate([ApiRoutes.UserTotals, session.user.id]);
      setLoadModal(false);
      setSuccessModal(true);
    } catch (error) {
      setLoadModal(false);
      setModalError(true);
      return error;
    }
    return '';
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

  const isEmpty = data && size * 9 >= data[0].registros;

  const { query } = router;

  const navigateToEditor = (option) => {
    router.push(`/editor/${option}`);
  };

  return (
    <>
      {
        estado === 'publicado' && (
          <div className="selects-container">
            <div className="select-recent">
              <TooltipContainer
                placement="top"
                tooltipText="Filtrar por tipo de entrada"
              >
                <div>
                  <ArticleListSelectComponent
                    defaultTitle="Todos"
                    currentValue={query.type}
                    onChange={handleTypeChange}
                    selectN="2"
                    items={[
                      { label: 'Todos', value: '' },
                      { label: 'Blogs', value: 'Blog' },
                      { label: 'Videos', value: 'Video' },
                      { label: 'Podcasts', value: 'Podcast' },
                      { label: 'Reportes', value: 'Reporte' },
                    ]}
                  />
                </div>
              </TooltipContainer>
            </div>
            <div className={`select-filter ${styles.hideMobile}`}>
              <div
                className={styles.optionsContainer}
              >
                <button className="button button--theme-primary">
                  Crear <span className="button__icon-right text--theme-light">1</span>
                </button>
                <div className={styles.list_content}>
                  <div className="drop-item" onClick={() => navigateToEditor('blog')}>
                    <span className="drop-item__content">Blog</span>
                  </div>
                  <div className="drop-item" onClick={() => navigateToEditor('video')}>
                    <span className="drop-item__content">Video</span>
                  </div>
                  <div className="drop-item" onClick={() => navigateToEditor('podcast')}>
                    <span className="drop-item__content">Podcast</span>
                  </div>
                  <div className="drop-item" onClick={() => navigateToEditor('reporte')}>
                    <span className="drop-item__content">Reporte</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <>
        <div className={styles.cardList}>
          {data && data.map((page) => {
            return page.data.map((article) => (
              <ArticlesDetailComponent
                onDelete={onDelete}
                onUpdate={null}
                key={article._id}
                article={article}
                estado={estado}
                isAdmin
              />
            ));
          })}
        </div>
        <div className="d-flex justify-content-center">
          <>
            {isValidating
              ? <LoadingIndicator />
              : !isEmpty && (
                <button
                  className="button button--theme-secondary"
                  onClick={() => setSize(size + 1)}
                >
                  Ver más publicaciones
                </button>
              )}
          </>
        </div>
      </>
      <LoadingIndicatorModal
        show={loadModal}
        onClose={() => setLoadModal(false)}
        textHeader="Eliminando articulo"
        textBody=""
      />
      <SuccessIndicatorModal
        show={successModal}
        onClose={() => setSuccessModal(false)}
        textHeader="Articulo Eliminado"
        textBody="Se ha eliminado el articulo correctamente"
      />
      <ErrorIndicatorModal
        show={modalError}
        onClose={() => setModalError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Algo ha salido mal, vulve a intentarlo más tarde"
      />
    </>
  );
};

export default ProfileArticles;
