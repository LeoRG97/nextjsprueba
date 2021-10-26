import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/client';

import styles from '../comments.module.css';
import { useForm } from '../hooks/useForm';
import { AddComment } from '../AddComment';

import DeleteModal from '@/components/modalsIndicators/DeleteModal';
import convertDate from '../helpers/convertDate';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';
import { addValoracionComentario, deleteComentario, updateComentario } from '@/services/courses';

export const ListItem = ({ comment, mutateList }) => {
  const [selectComment, setSelectComment] = useState(false);
  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const [showDeleteReply, setShowDeleteReply] = useState(false);
  const [onUpdateComment, setOnUpdateComment] = useState(false);

  const session = useSession();

  const {
    values: comentUpd,
    handleInputChange: handleUpdate,
  } = useForm({
    nvoComentario: comment.comentario,
  });

  const { values, handleInputChange } = useForm({
    titulo: '',
  });

  // console.log(`Respuestas de ${comment._id}`,data)

  const addZero = (index) => (index < 10 ? `0${index}` : index);

  const getHour = (day) => {
    const date = new Date(day);
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  };

  const handleSubmitComment = async () => {

  };

  const commentValoracion = async () => {
    try {
      const res = await addValoracionComentario(comment._id);
      mutateList();
      // mutate();
      return res;
    } catch (error) {
      return error;
      // console.error(error.message);
    }
  };

  const onDeleteComment = async () => {
    await deleteComentario(comment._id);
    // mutate();
    mutateList();
    setShowDeleteComment(false);
  };

  const handleReply = () => {
    setSelectComment(!selectComment);
  };

  const handleDeleteReply = async () => {

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
    <div className={`${styles.mainLevel} py-2`}>
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
              {convertDate(comment.updatedAt)} | {getHour(comment.updatedAt)}
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
                  session[0]?.user
                  && (
                    <>
                      {comment.liked ? (
                        <small
                          className={`${styles.pointer} subtitle text-link me-3`}
                          onClick={commentValoracion}
                        >
                          Quitar valoración
                        </small>
                      ) : (
                        <small
                          className={`${styles.pointer} subtitle text-link me-3`}
                          onClick={commentValoracion}
                        >
                          Valorar
                        </small>
                      )}
                      <small
                        onClick={handleReply}
                        className={`${styles.pointer} subtitle text-link me-3`}
                      >
                        Responder
                      </small>

                    </>
                  )
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
              <small className={
                comment.liked ? `icon ${styles.liked}` : `icon ${styles.noLiked}`
              }
              >c
              </small>
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
