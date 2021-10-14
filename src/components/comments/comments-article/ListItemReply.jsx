import { useState } from 'react';
import Image from 'next/image';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';
import styles from '../comments.module.css';
import convertDate from './convertDate';
import { useForm } from './useForm';
import { updateRespuesta } from '@/services/articles';

export const ListItemReply = ({
  reply, session, onDeleteReply, replyValoracion, commentId, eventMutate,
}) => {
  const [onUpdateReply, setOnUpdate] = useState(false);
  const { values, handleInputChange } = useForm({
    titulo: reply.titulo,
  });

  const addZero = (index) => (index < 10 ? `0${index}` : index);

  const getHour = (day) => {
    const date = new Date(day);
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  };

  const { titulo } = values;

  const handleSubmitUpdateReply = async (e) => {
    e.preventDefault();

    await updateRespuesta(commentId, titulo, reply._id);
    eventMutate();
    setOnUpdate(false);
  };

  return (
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
              {convertDate(reply.createdAt)} | {getHour(reply.createdAt)}
            </small>
          </div>

          <div className="text-md theme-secondary">
            <div>

              {
                onUpdateReply
                  ? (
                    <form onSubmit={handleSubmitUpdateReply} className="d-flex align-items-center">
                      <input
                        className="input"
                        value={titulo}
                        onChange={handleInputChange}
                        name="titulo"
                      />
                      <button
                        type="submit"
                        disabled={titulo.length === 0}
                        // onClick={handleSubmit}
                        className="icon-button icon-button--primary py-1 icon ms-4"
                        title="Guardar"
                      >n
                      </button>
                    </form>
                  ) : reply.titulo
              }

            </div>
          </div>

          <div className="d-flex my-2 align-items-center">
            {
              onUpdateReply ? (
                <small
                  className={`${styles.pointer} subtitle text-link me-3`}
                  onClick={() => setOnUpdate(false)}
                >
                  Cancelar edición
                </small>
              ) : (
                session[0]?.user
                && (
                  <small
                    className={`${styles.pointer} subtitle text-link me-3`}
                    onClick={() => replyValoracion(reply._id)}
                  >
                    Valorar
                  </small>
                )
              )

            }
            {
              !onUpdateReply && (
                session[0]?.user.role === 'admin'
                  || session[0]?.user.role === 'user-reviewer'
                  || reply.usuario_id._id === session[0]?.user.id ? (
                    <div className={`position-relative ${styles.DropDown}`}>
                      <OptionDropdown
                        options={
                          reply.usuario_id._id === session[0]?.user.id
                            ? [
                              {
                                option: 'Modificar',
                                event: true,
                                eventName: (() => setOnUpdate(true)),
                              },
                              {
                                option: 'Eliminar',
                                event: true,
                                eventName: (() => onDeleteReply(reply._id)),
                              },
                            ] : [
                              {
                                option: 'Eliminar',
                                event: true,
                                eventName: (() => onDeleteReply(reply._id)),
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
              <small className={`icon ${reply.liked && 'text--theme-highlight'}`}>c</small>
              <small className="text--theme-highlight">{reply.likes}</small>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
