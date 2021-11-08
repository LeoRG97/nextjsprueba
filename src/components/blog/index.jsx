/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-danger */
import { Container, Overlay, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import { AutorComponent } from '@/components';
import { ListComment } from '../comments/comments-article/ListComment';
import ModalNuevaNota from '../notas/ModalNuevaNota';
import { addNotesService } from '@/services/notes';
import LoadingIndicatorModal from '../modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '../modalsIndicators/SuccesModal';
import ErrorIndicatorModal from '../modalsIndicators/ErrorModal';
import { BUCKET_URL } from '@/global/constants';
import styles from './blog.module.css';
import Resources from './Resources';

const BlogComponent = ({
  blogInfo, htmlCode, autorInfo, onLike, cssSaved, quitSaved, saveArt, isLiked, shareArt,
  renderResource, rateTotal,
}) => {
  const [session] = useSession();
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

  return (
    <>
      <Container>
        <div className="">
          <h3 className="title-editor-xl">{blogInfo.portada.titulo}</h3>
          <p className="subtitle-editor">{blogInfo.portada.descripcion}</p>
          <Resources resources={blogInfo.recursos} />
          <AutorComponent
            autor={autorInfo}
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
                            <span className="icon-md">ñ</span>
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
            dateBlog={blogInfo.createdAt}
            onLike={onLike}
            liked={isLiked}
            likes={blogInfo.likes}
            cssSaved={cssSaved}
            quitSaved={quitSaved}
            saveArt={saveArt}
            shareArt={shareArt}
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
          textHeader="Guardando anotación..."
          textBody="Esta operación podría tardar unos minutos, por favor espere."
        />
        <SuccessIndicatorModal
          show={modalSucces}
          onClose={() => setModalSucces(false)}
          textHeader="Nota guardada"
          textBody="Su anotación fue guardada exitosamente."
        />
        <ErrorIndicatorModal
          show={modalError}
          onClose={() => setModalError(false)}
          textHeader="Ha ocurrido un error"
          textBody="Por favor, revice su información y vuelva a intentarlo."
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
