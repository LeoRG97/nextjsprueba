import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { deleteArticle } from '@/services/articles';
import ArticlesDetailComponent from './articleDetall';
import { SuccessIndicatorModal } from '@/components';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import { reviewerAccess } from '@/helpers/accessVerifiers';

const ArticlesListComponent = ({ articles, onFilter, showOptions = false }) => {
  const [loadModal, setLoadModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [session] = useSession();

  const onDelete = async (id) => {
    setLoadModal(true);
    try {
      const rs = await deleteArticle(id);
      if (rs.ok) {
        const filtered = await articles.filter((item) => item._id !== rs.id);
        onFilter(filtered);
        setLoadModal(false);
        setSuccessModal(true);
      }
    } catch (error) {
      setLoadModal(false);
      setModalError(true);
    }
  };

  return (
    <div>
      {
        session && showOptions ? (
          <>
            {
              reviewerAccess(session.user.role) ? (
                <>
                  {
                    articles.map((article) => {
                      return (
                        <ArticlesDetailComponent
                          key={article._id}
                          article={article}
                          onDelete={onDelete}
                          onUpdate={null}
                          isAdmin
                        />
                      );
                    })
                  }
                </>
              ) : (
                <>
                  {articles.map((article) => {
                    return (
                      <ArticlesDetailComponent
                        key={article._id}
                        article={article}
                      />
                    );
                  })}
                </>
              )
            }
          </>
        ) : (
          <>
            {articles.map((article) => {
              return (
                <ArticlesDetailComponent
                  key={article._id}
                  article={article}
                />
              );
            })}
          </>
        )
      }
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
    </div>
  );
};

export default ArticlesListComponent;
