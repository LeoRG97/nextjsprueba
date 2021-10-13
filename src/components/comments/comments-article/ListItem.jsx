import { useState } from 'react';
import Image from 'next/image';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/client';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';

import styles from '../comments.module.css';
import { useForm } from './useForm';
import { AddComment } from './AddComment';
import {
  addCommentReply, addValoracionComentario,
  addValoracionRespuesta,
  deleteComentario, deleteRespuesta, updateComentario,
} from '@/services/articles';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';
import { LoadingIndicator } from '@/components';
import DeleteModal from '@/components/modalsIndicators/DeleteModal';

export const ListItem = ({ comment, mutateList }) => {
  const [selectComment, setSelectComment] = useState(false);
  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const [showDeleteReply, setShowDeleteReply] = useState(false);
  const [replyDelete, setReplyDelete] = useState(null);
  const [onUpdateComment, setOnUpdateComment] = useState(false);

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.ArticleReplies}/${comment._id}?&pageNum=${pageIndex + 1}&pageSize=1`; // API endpoint
  };
  const session = useSession();

  const { values, handleInputChange, resetForm } = useForm({
    titulo: '',
  });
  const { titulo } = values;

  const {
    values: comentUpd,
    handleInputChange: handleUpdate,
  } = useForm({
    nvoComentario: comment.comentario,
  });

  const {
    data, size, setSize, mutate, isValidating,
  } = useSWRInfinite(getKey, fetchData);
  // console.log(`Respuestas de ${comment._id}`,data)

  const converDate = (date) => {
    const dateFormat = new Date(date);

    let formattedDate = Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(dateFormat);
    formattedDate = formattedDate.toString();
    formattedDate = formattedDate.replace('January', 'Enero');
    formattedDate = formattedDate.replace('February', 'Febrero');
    formattedDate = formattedDate.replace('March', 'Marzo');
    formattedDate = formattedDate.replace('April', 'Abril');
    formattedDate = formattedDate.replace('May', 'Mayo');
    formattedDate = formattedDate.replace('June', 'Junio');
    formattedDate = formattedDate.replace('July', 'Julio');
    formattedDate = formattedDate.replace('August', 'Agosto');
    formattedDate = formattedDate.replace('September', 'Septiembre');
    formattedDate = formattedDate.replace('October', 'Octubre');
    formattedDate = formattedDate.replace('November', 'Noviembre');
    formattedDate = formattedDate.replace('December', 'Diciembre');
    return formattedDate;
  };

  const addZero = (index) => (index < 10 ? `0${index}` : index);

  const getHour = (day) => {
    const date = new Date(day);
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  };

  const isEmpty = data?.[size - 1]?.length === 0;

  const handleReply = () => {
    setSelectComment(!selectComment);
  };

  const handleSubmitComment = async () => {
    if (titulo !== '') {
      const replyData = {
        titulo,
      };
      await addCommentReply(comment._id, replyData);
      mutate();
      mutateList();
      resetForm();
      setSelectComment(false);
    }
  };

  const commentValoracion = async () => {
    try {
      const res = await addValoracionComentario(comment._id);
      mutateList();
      mutate();
      return res;
    } catch (error) {
      return error;
      // console.error(error.message);
    }
  };

  const replyValoracion = async (respuestaId) => {
    try {
      const res = await addValoracionRespuesta(comment._id, respuestaId);
      mutate();
      return res;
    } catch (error) {
      // console.error(error.message);
      return error;
    }
  };

  const onDeleteComment = async () => {
    await deleteComentario(comment._id);
    mutate();
    mutateList();
    setShowDeleteComment(false);
  };

  const onDeleteReply = async (replyId) => {
    setShowDeleteReply(true);
    setReplyDelete(replyId);
  };

  const handleDeleteReply = async () => {
    await deleteRespuesta(comment._id, replyDelete);
    mutate();
    mutateList();
    setReplyDelete(null);
    setShowDeleteReply(false);
  };

  const handleSubmitUpdateComment = async (e) => {
    e.preventDefault();
    await updateComentario(comment._id, comentUpd.nvoComentario);
    setOnUpdateComment(false);
    mutateList();
  };

  const onCancelUpdate = () => {
    setOnUpdateComment(false);
  };

  return (
    <div className={`${styles.mainLevel} py-1`}>
      <div className="row py-2">
        <div className="col-lg-1 col-md-2 col-sm-12">
          <Image
            height="45"
            width="45"
            objectFit="contain"
            src={comment.usuario_id.picture === 'string' || !comment.usuario_id.picture ? '/images/profile/no-profile-img.png' : comment.usuario_id.picture}
            className={styles.author_pict}
          />
        </div>

        <div className="col-lg-11 col-md-10 col-sm-12">
          <div className="d-flex bd-highlight mb-2">
            <small className="subtitle">
              {
                comment.usuario_id.name
                  ? comment.usuario_id.name : ''
              }
            </small>
            <small className="subtitle ms-1">
              {
                comment.usuario_id?.apellidos
                  ? comment.usuario_id.apellidos : ''
              }
            </small>

            <small className={`${styles.positionDate} text-sm`}>
              {converDate(comment.updatedAt)} | {getHour(comment.updatedAt)}
            </small>
          </div>

          <div className="text-md theme-secondary">
            {
              onUpdateComment ? (
                <form onSubmit={handleSubmitUpdateComment} className="d-flex align-items-center">
                  <input
                    className="input"
                    value={comentUpd.nvoComentario}
                    onChange={handleUpdate}
                    name="nvoComentario"
                  />
                  <button
                    type="submit"
                    disabled={comentUpd.nvoComentario.length === 0}
                    // onClick={handleSubmit}
                    className="icon-button icon-button--primary py-1 icon ms-4"
                    title="Guardar"
                  >n
                  </button>
                </form>
              ) : (
                <div>
                  {comment.comentario}
                </div>
              )
            }
          </div>

          <div className="d-flex my-2 align-items-center">
            {
              onUpdateComment ? (
                <>
                  <small
                    className={`${styles.pointer} subtitle text-link me-3`}
                    onClick={onCancelUpdate}
                  >
                    Cancelar edición
                  </small>
                </>
              )
                : (
                  <>
                    <small
                      className={`${styles.pointer} subtitle text-link me-3`}
                      onClick={commentValoracion}
                    >
                      Valorar
                    </small>
                    <small
                      onClick={() => handleReply(comment._id)}
                      className={`${styles.pointer} subtitle text-link me-3`}
                    >
                      Responder
                    </small>

                  </>
                )
            }

            {
              !onUpdateComment
              && (session[0]?.user.role === 'admin'
                || session[0]?.user.role === 'user-reviewer'
                || comment.usuario_id._id === session[0]?.user.id ? (
                  <div className={`position-relative ${styles.DropDown}`}>
                    <OptionDropdown
                      options={
                        comment.usuario_id._id === session[0]?.user.id
                          ? [{
                            option: 'Modificar',
                            event: true,
                            eventName: (() => setOnUpdateComment(true)),
                          },
                          {
                            option: 'Eliminar',
                            event: true,
                            eventName: (() => setShowDeleteComment(true)),
                          },
                          ] : [
                            {
                              option: 'Eliminar',
                              event: true,
                              eventName: (() => setShowDeleteComment(true)),
                            },
                          ]
                      }
                    />
                  </div>
                )
                : (
                  <></>
                ))
            }
            <div className="d-flex align-items-center position-absolute end-0">
              <small className={`icon ${comment.liked && 'text--theme-highlight'}`}>c</small>
              <small className="text--theme-highlight">{comment.likes}</small>
            </div>
          </div>
        </div>
      </div>

      {selectComment
        && (
          <ul>
            {
              session[0]?.user && (
                <AddComment
                  values={values}
                  handleInputChange={handleInputChange}
                  fieldName="titulo"
                  handleSubmit={handleSubmitComment}
                />
              )
            }

          </ul>
        )}
      {
        comment.respuesta > 0 ? (
          <>
            <ul className={`${styles.commentList}`}>
              {
                data && data.map((page) => {
                  return page.map((reply) => (
                    <li key={reply._id}>

                      <div className="row py-2">
                        <div className="col-lg-1 col-md-2 col-sm-12">
                          <Image
                            height="45"
                            width="45"
                            objectFit="contain"
                            src={reply.usuario_id.picture === 'string' || !reply.usuario_id.picture ? '/images/profile/no-profile-img.png' : reply.usuario_id.picture}
                            className={styles.author_pict}
                          />
                        </div>

                        <div className="col-lg-11 col-md-10 col-sm-12">
                          <div className="d-flex bd-highlight mb-2">
                            <small className="subtitle">
                              {
                                reply.usuario_id.name
                                  ? reply.usuario_id.name : ''
                              }
                            </small>
                            <small className="subtitle ms-2">
                              {
                                reply.usuario_id?.apellidos
                                  ? reply.usuario_id.apellidos : ''
                              }
                            </small>

                            <small className={`${styles.positionDate} text-sm`}>
                              {converDate(reply.createdAt)} | {getHour(reply.createdAt)}
                            </small>
                          </div>

                          <div className="text-md theme-secondary">
                            <div>

                              {
                                reply.titulo
                              }

                            </div>
                          </div>

                          <div className="d-flex my-2 align-items-center">
                            <small
                              className={`${styles.pointer} subtitle text-link me-3`}
                              onClick={() => replyValoracion(reply._id)}
                            >
                              Valorar
                            </small>
                            {

                              session[0]?.user.role === 'admin'
                                || session[0]?.user.role === 'user-reviewer'
                                || reply.usuario_id._id === session[0]?.user.id ? (
                                  <div className={`position-relative ${styles.DropDown}`}>
                                    <OptionDropdown
                                      options={[
                                        {
                                          option: 'Modificar',
                                          event: true,
                                          eventName: (() => { }),
                                        },
                                        {
                                          option: 'Eliminar',
                                          event: true,
                                          eventName: (() => onDeleteReply(reply._id)),
                                        },
                                      ]}
                                    />
                                  </div>
                                )
                                : (
                                  <></>
                                )

                            }
                            <div className="d-flex align-items-center position-absolute end-0">
                              <small className={`icon ${reply.liked && 'text--theme-highlight'}`}>c</small>
                              <small className="text--theme-highlight">{reply.likes}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ));
                })
              }
            </ul>
            <div className="d-flex justify-content-center">
              <>
                {!isEmpty && (
                  isValidating ? (
                    <LoadingIndicator />
                  )
                    : (
                      <a
                        className={`${styles.pointer} subtitle text-link me-3`}
                        onClick={() => setSize(size + 1)}
                      >
                        Ver más respuestas
                      </a>
                    )
                )}
              </>
            </div>
          </>
        ) : (<></>)
      }
      <DeleteModal
        show={showDeleteComment}
        onClose={() => setShowDeleteComment(false)}
        functionDelete={() => onDeleteComment()}
        btnConfirm="Confirmar"
        btnCancel="Cancelar"
        textHeader="Alerta"
        textBody="¿Estás seguro de eliminar el comentario?"
      />
      <DeleteModal
        show={showDeleteReply}
        onClose={() => setShowDeleteReply(false)}
        functionDelete={() => handleDeleteReply()}
        btnConfirm="Confirmar"
        btnCancel="Cancelar"
        textHeader="Alerta"
        textBody="¿Estás seguro de eliminar la respuesta?"
      />
    </div>
  );
};
