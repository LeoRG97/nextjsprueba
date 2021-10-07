/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import useSWR, { useSWRConfig } from 'swr';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { fetchData } from '@/services/swr';
import { BUCKET_URL, ApiRoutes } from '@/global/constants';
import styles from './forums.module.css';
import ForumModal from './forumEditor/ForumEditor';
import DeleteModal from '../modalsIndicators/DeleteModal';
import { deleteForum } from '@/services/forums';
import LoadingIndicatorModal from '../modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '../modalsIndicators/SuccesModal';
import ErrorIndicatorModal from '../modalsIndicators/ErrorModal';
import OptionDropdown from '../optionsDropdown/OptionsDropdown';

const ForumsComponent = ({
  showOptions, showSubs,
}) => {
  const [session] = useSession();
  const [showOptionsForum, setShowOptionsForum] = useState({
    show: false,
    idForum: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [idEdit, setIdEdit] = useState('');
  const { mutate } = useSWRConfig();
  const { data } = useSWR(
    ApiRoutes.Forums,
    fetchData,
  );

  const subscribeForum = async (idForum) => {
    return idForum;
  };

  const closeModal = () => {
    setShowModal(false);
    setIdEdit('');
  };

  const closeDeleteModal = () => {
    setShowDelete(false);
    setIdEdit('');
  };

  const updateForumModal = (idForum) => {
    setIdEdit(idForum);
    setShowModal(true);
  };

  const deleteForumModal = (idForum) => {
    setIdEdit(idForum);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    setShowDelete(false);
    setSubmitting(true);
    const res = await deleteForum(idEdit);
    setSubmitting(false);
    if (res.ok) {
      mutate(ApiRoutes.Forums, {
        ...data,
        data: data.data.filter((item) => item._id !== idEdit),
      }, false);
      mutate([ApiRoutes.UserTotals, session.user.id]);
      setIdEdit('');
      setShowSuccess(true);
    } else {
      setShowError(true);
    }
  };

  const activateShowOptions = (show, idForum) => {
    if (show) {
      if (idForum !== showOptionsForum.idForum) {
        setShowOptionsForum({
          show,
          idForum,
        });
      } else {
        setShowOptionsForum({
          show,
        });
      }
    } else {
      setShowOptionsForum({
        show: false,
        idForum: '',
      });
    }
  };

  return (
    <Container>
      {
        showOptions && (
          <div className="d-flex justify-content-center justify-content-lg-end mb-4">
            <button
              className="button button--theme-primary"
              onClick={() => setShowModal(true)}
            >Nuevo foro
            </button>
          </div>
        )
      }
      {
        data && data.data && data.data.map((forum) => {
          return (
            <Row
              className={styles.forum_row}
              key={forum._id}
              onMouseEnter={() => activateShowOptions(true, forum._id)}
              onMouseLeave={() => setShowOptionsForum(false, forum._id)}
            >
              <Col xl="6" lg="6" sm="12" className="col-12">
                <div className={styles.forum_info_cont}>
                  <div className={styles.forum_conten_img}>
                    <img
                      src={`${BUCKET_URL}${forum.imagen}`}
                      className={styles.forum_img}
                      alt={forum.titulo}
                    />
                  </div>
                  <div>
                    <div>
                      <h2 className="title">{forum.titulo}</h2>
                    </div>
                    {
                      showSubs && (
                        <div className={styles.forum_btn_cont}>
                          <a href={forum.url} target="_blank" rel="noreferrer">
                            <button className="button button--theme-primary" onClick={() => subscribeForum(forum._id)}>Unirme</button>
                          </a>
                        </div>
                      )
                    }
                    {
                      (showOptions && showOptionsForum && forum._id === showOptionsForum.idForum)
                        && (
                          <OptionDropdown
                            options={[
                              {
                                option: 'Modificar',
                                event: true,
                                eventName: () => updateForumModal(forum._id),
                                iconType: 'K',
                              },
                              {
                                option: 'Eliminar',
                                event: true,
                                eventName: () => deleteForumModal(forum._id),
                                iconType: 'L',
                              },
                            ]}
                          />
                        )
                    }
                  </div>
                </div>
              </Col>
              <Col xl="6" lg="6" sm="12" className="col-12">
                <p className="text-md">{forum.descripcion}</p>
              </Col>
            </Row>
          );
        })
      }
      <div className={styles.forum_separator}> </div>
      <ForumModal
        show={showModal}
        onClose={closeModal}
        idEdit={idEdit}
      />
      <DeleteModal
        show={showDelete}
        onClose={closeDeleteModal}
        functionDelete={handleDelete}
        btnConfirm="Confirmar"
        btnCancel="Cancelar"
        textHeader="Alerta"
        textBody="Estás a punto de eliminar la información de este foro. ¿Seguro que deseas continuar?"
      />
      <LoadingIndicatorModal
        show={submitting}
        onClose={() => setSubmitting(false)}
        textHeader="Eliminando foro"
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        textHeader="Foro eliminado"
        textBody="La información del foro ha sido eliminada correctamente"
      />
      <ErrorIndicatorModal
        show={showError}
        onClose={() => setShowError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Vuelva a intentarlo más tarde"
      />
    </Container>
  );
};

export default ForumsComponent;
