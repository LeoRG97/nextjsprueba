import { useState } from 'react';
import Image from 'next/image';
import useSWRInfinite from 'swr/infinite';
import { useSession } from 'next-auth/client';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';

import styles from '../comments.module.css';
import { useForm } from './useForm';
import { AddComment } from './AddComment';
import { addCommentReply, addValoracionComentario, addValoracionRespuesta } from '@/services/articles';

export const ListItem = ({ comment }) => {
  const [selectComment, setSelectComment] = useState(false);

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.ArticleReplies}/${comment._id}?&pageNum=${pageIndex + 1}&pageSize=1`; // API endpoint
  };
  const session = useSession();

  const [values, handleInputChange, resetForm] = useForm({
    titulo: '',
  });
  const { titulo } = values;

  const {
    data, size, setSize, mutate,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });
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
      resetForm();
    }
  };

  const commentValoracion = async () => {
    try {
      const res = await addValoracionComentario(comment._id);
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
  return (
    <div className={`${styles.mainLevel} py-1`}>
      <div className="row py-4">
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

            <small className={`${styles.positionDate} text-sm`}>
              {converDate(comment.updatedAt)} | {getHour(comment.updatedAt)}
            </small>
          </div>

          <div className="text-md theme-secondary">
            <div>
              {comment.comentario}
            </div>
          </div>

          <div className="d-flex my-2">
            <small
              className="subtitle text-link me-3"
              onClick={commentValoracion}
            >
              Valorar
            </small>
            <small
              onClick={() => handleReply(comment._id)}
              className="subtitle text-link me-3"
            >
              Responder
            </small>
            <small className="icon">
              0
            </small>
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
        comment.respuesta > 0 && (
          <>
            <ul className={`${styles.commentList}`}>
              {
                data && data.map((page) => {
                  return page.map((reply) => (
                    <li key={reply._id}>

                      <div className="row py-4">
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

                            <small className={`${styles.positionDate} text-sm`}>
                              {converDate(reply.createdAt)} | {getHour(reply.createdAt)}
                            </small>
                          </div>

                          <div className="text-md theme-secondary">
                            <div>
                              {reply.titulo}
                            </div>
                          </div>

                          <div className="d-flex my-2">
                            <small
                              className="subtitle text-link me-3"
                              onClick={() => replyValoracion(reply._id)}
                            >
                              Valorar
                            </small>
                            <small className="icon">
                              0
                            </small>
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
                  <button
                    className="button button--theme-secondary"
                    onClick={() => setSize(size + 1)}
                  >
                    Ver más respuestas
                  </button>
                )}
              </>
            </div>
          </>
        )
      }
    </div>
  );
};
