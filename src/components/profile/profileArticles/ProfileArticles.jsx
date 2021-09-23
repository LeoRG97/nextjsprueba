import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/client';
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

const ProfileArticles = () => {
  const router = useRouter();
  const [loadModal, setLoadModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalError, setModalError] = useState(false);

  useEffect(() => {

  }, [router]);

  const [session] = useSession();

  const getKey = (pageIndex, previousPageData) => {
    let params = '';

    if (router.query.type) {
      const { type } = router.query;
      params = `${params}&tipo=${type}`;
    }

    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.ArticlesUserAuthor}/${session.user.id}?pageNum=${pageIndex + 1}&pageSize=9${params}`; // API endpoint
  };

  const {
    data, size, setSize, isValidating, mutate,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  const onDelete = async (id) => {
    setLoadModal(true);
    let updated = null;
    try {
      const rs = await deleteArticle(id);
      updated = mutate(async (existingData) => {
        const filtered = await existingData.filter((item) => item[0]?._id !== rs.id);
        return filtered;
      });
      setLoadModal(false);
      setSuccessModal(true);
    } catch (error) {
      setLoadModal(false);
      setModalError(true);
      return error;
    }
    return updated;
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

  const isEmpty = data?.[size - 1]?.length === 0;

  const { query } = router;

  return (
    <>
      <div className="selects-container">
        <div className="select-recent">
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
            ]}
          />
        </div>
        <div className="select-filter">
          <button className="button button--theme-primary me-2">
            Crear <span className="icon text--theme-light">1</span>
          </button>
        </div>
      </div>
      <>
        {data && data.map((page) => {
          return page.map((article) => (
            <ArticlesDetailComponent
              onDelete={onDelete}
              onUpdate={null}
              key={article._id}
              article={article}
              isAdmin
            />
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
