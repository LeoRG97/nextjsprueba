/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-danger */
import { Container, Overlay, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { AutorComponent } from '@/components';
import { ListComment } from '../comments/comments-article/ListComment';
import { addNotesService } from '@/services/notes';
import { BUCKET_URL } from '@/global/constants';
import styles from './blog.module.css';
import Resources from './Resources';
import { vipUserAccess, userAccess } from '@/helpers/accessVerifiers';
import {
  showPremiumAlert,
  showPremiumStaticAlert,
  showSubscribeAlert,
  showSubscribeStaticAlert,
} from '@/reducers/alert';

const ModalNuevaNota = dynamic(() => import('../notas/ModalNuevaNota'));
const LoadingIndicatorModal = dynamic(() => import('../modalsIndicators/LoadingModal'));
const SuccessIndicatorModal = dynamic(() => import('../modalsIndicators/SuccesModal'));
const ErrorIndicatorModal = dynamic(() => import('../modalsIndicators/ErrorModal'));

const BlogComponent = ({
  blogInfo, htmlCode, autorInfo, onLike, cssSaved, quitSaved, saveArt, isLiked, shareArt,
  renderResource, rateTotal,
}) => {
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const [textSelected, setTextSelected] = useState('');
  const [selected, setSelected] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [selectMenu, setSelectMenu] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const target = useRef(null);

  const getPosition = (elem) => {
    const box = elem.getBoundingClientRect();
    const x = Math.round(box.left);
    const y = Math.round(box.top);
    const width = Math.round(box.right - x);
    const height = Math.round(box.bottom - y);
    return {
      x,
      y,
      width,
      height,
    };
  };

  const onClickTooltip = () => {
    setSelected(true);
    if (selectMenu !== false) {
      setSelectMenu(false);
      setTop(0);
      setLeft(0);
    }
  };
  const onSelecta = () => {
    if (window.getSelection) {
      if (window.getSelection().toString() !== '' && window.getSelection().toString() !== ' ') {
        setTextSelected(window.getSelection().toString());
        const rng = window.getSelection().getRangeAt(0);
        const position = getPosition(rng);
        const positionY = (`${position.y + window.scrollY - 60}px`);
        const positionX = (`${(position.x + Math.round(position.width / 2)) - 20}px`);
        setTop(positionY);
        setLeft(positionX);
        setSelectMenu(true);
      } else {
        setSelectMenu(false);
        setTop(0);
        setLeft(0);
      }
    } else if (document.selection) {
      if (document.selection.createRange().text !== '' && document.selection.createRange().text !== ' ') {
        setTextSelected(document.selection.createRange().text);
        const rng = document.selection.getRangeAt(0);
        const position = getPosition(rng);
        const positionY = (`${position.y + window.scrollY - 45}px`);
        const positionX = (`${(position.x + Math.round(position.width / 2)) - 20}px`);
        setTop(positionY);
        setLeft(positionX);
        setSelectMenu(true);
      } else {
        setSelectMenu(false);
        setTop(0);
        setLeft(0);
      }
    }
  };

  const saveNota = async (nota) => {
    setModalLoading(true);
    setModalSucces(false);
    setModalError(false);
    setSelected(false);
    setTextSelected('');
    const res = await addNotesService(nota);
    if (res.ok) {
      setModalLoading(false);
      setModalSucces(true);
      setModalError(false);
    } else {
      setModalLoading(false);
      setModalSucces(false);
      setModalError(true);
    }
  };

  const renderCode = (item) => {
    if (item.type === 'linkVideo') {
      return (
        <div className="content-video">
          <iframe src={item.tag} title="video" />
        </div>
      );
    }
    if (item.type === 'image' || item.type === 'iframeAudio' || item.type === 'iframeVideo') {
      return (<div className="article-content-center" dangerouslySetInnerHTML={{ __html: item.tag }} />);
    }
    return (
      <div onMouseUp={() => onSelecta()} onTouchEnd={() => onSelecta()}>
        <div className="select-area" dangerouslySetInnerHTML={{ __html: item.tag }} ref={target} />
      </div>
    );
  };

  useEffect(() => {
    // muestra el modal Premium si el usuario no tiene permisos para ver el contenido
    if (!loading && blogInfo.premium && !vipUserAccess(session?.user.role)) {
      dispatch(showPremiumStaticAlert());
    }
    if (!loading && blogInfo.user_register && !userAccess(session?.user.role)) {
      dispatch(showSubscribeStaticAlert());
    }
  }, [session, loading]);

  const validateSession = (callback) => {
    if (blogInfo.premium && !vipUserAccess(session?.user.role)) {
      dispatch(showPremiumAlert());
    } else if (!session) {
      dispatch(showSubscribeAlert());
    } else {
      callback();
    }
  };

  return (
    <>
      <Container>
        <div className="">
          <h3 className="title-editor-xl">{blogInfo.portada.titulo}</h3>
          <p className="subtitle-editor">{blogInfo.portada.descripcion}</p>
          <ul className={styles.categoryList}>
            {
              blogInfo.categorias && blogInfo.categorias.map((category) => (
                <li
                  key={category._id}
                  className={`text-sm text--theme-light ${styles.category}`}
                >
                  {category.nombre}
                </li>
              ))
            }
          </ul>
          <Resources
            resources={blogInfo.recursos}
            validateSession={validateSession}
            vipArticle={blogInfo.premium}
          />
          <AutorComponent
            autor={autorInfo}
            validateSession={validateSession}
            dateBlog={blogInfo.createdAt}
            onLike={onLike}
            liked={isLiked}
            rateTotal={rateTotal}
            likes={blogInfo.likes}
            cssSaved={cssSaved}
            quitSaved={quitSaved}
            saveArt={saveArt}
            shareArt={shareArt}
          />
          {blogInfo.portada.ruta_imagen && (
            <div className={styles.cover_gradient}>
              <Image
                src={`${BUCKET_URL}${blogInfo.portada.ruta_imagen}`}
                alt={blogInfo.portada.titulo}
                layout="responsive"
                objectFit="cover"
                width={720}
                height={480}
              />
            </div>
          )}
          <div className="article-content" onClick={() => onSelecta()}>
            {
              (htmlCode.length !== 0) ? (
                htmlCode.map((item) => {
                  return (
                    <div key={item.id}>
                      {renderCode(item)}
                    </div>
                  );
                })) : (<></>)
            }
          </div>

          {blogInfo.recursos && blogInfo.recursos.length > 0 && (
            <div className="content-btns-last">
              <label className="text-md">Ver en</label>
              {blogInfo.recursos.map((recurso) => renderResource(recurso, 'bottom'))}
            </div>
          )}
          {
            selectMenu && (
              <>
                {
                  session?.user
                    ? (
                      <Overlay target={target.current} show={selectMenu} placement="top">
                        {(props) => (
                          <Tooltip
                            onClick={onClickTooltip}
                            id="overlay-example"
                            className="tooltip-notas-menu"
                            {...props}
                            style={{ top, left }}
                          >
                            <span className="icon-md">??</span>
                          </Tooltip>
                        )}
                      </Overlay>
                    )
                    : (
                      <>
                      </>
                    )
                }
              </>
            )
          }
          <AutorComponent
            autor={autorInfo}
            validateSession={validateSession}
            dateBlog={blogInfo.createdAt}
            onLike={onLike}
            liked={isLiked}
            likes={blogInfo.likes}
            cssSaved={cssSaved}
            quitSaved={quitSaved}
            saveArt={saveArt}
            shareArt={shareArt}
            rateTotal={rateTotal}
          />
          <ListComment
            blogInfo={blogInfo._id}
          />

        </div>
        <ModalNuevaNota
          show={selected}
          onClose={() => setSelected(false)}
          textSelected={textSelected}
          saveNota={(nota) => saveNota(nota)}
        />
        <LoadingIndicatorModal
          show={modalLoading}
          onClose={() => setModalLoading(false)}
          textHeader="Guardando anotaci??n..."
          textBody="Esta operaci??n podr??a tardar unos minutos, por favor espere."
        />
        <SuccessIndicatorModal
          show={modalSucces}
          onClose={() => setModalSucces(false)}
          textHeader="Nota guardada"
          textBody="Su anotaci??n fue guardada exitosamente."
        />
        <ErrorIndicatorModal
          show={modalError}
          onClose={() => setModalError(false)}
          textHeader="Ha ocurrido un error"
          textBody="Por favor, revice su informaci??n y vuelva a intentarlo."
        />
      </Container>
    </>
  );
};

BlogComponent.propTypes = {
  blogInfo: PropTypes.shape(),
  // eslint-disable-next-line react/forbid-prop-types
  htmlCode: PropTypes.array,
  autorInfo: PropTypes.shape(),
  cssSaved: PropTypes.string,
  quitSaved: PropTypes.func.isRequired,
  saveArt: PropTypes.func.isRequired,
  shareArt: PropTypes.func.isRequired,
};

BlogComponent.defaultProps = {
  blogInfo: {},
  htmlCode: {},
  autorInfo: {},
  cssSaved: '',
};

export default BlogComponent;
