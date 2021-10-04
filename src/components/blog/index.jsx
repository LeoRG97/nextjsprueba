/* eslint-disable no-console */
/* eslint-disable react/no-danger */
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AutorComponent } from '@/components';
import ModalNuevaNota from '../notas/ModalNuevaNota';
import { addNotesService } from '@/services/notes';
import LoadingIndicatorModal from '../modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '../modalsIndicators/SuccesModal';
import ErrorIndicatorModal from '../modalsIndicators/ErrorModal';

const BlogComponent = ({
  blogInfo, htmlCode, autorInfo, onLike, cssSaved, quitSaved, saveArt, isLiked, shareArt,
}) => {
  const [textSelected, setTextSelected] = useState('');
  const [selected, setSelected] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(false);

  /* const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here is some <strong>amazing</strong> content. It is very engaging.
        right?
      </Popover.Body>
    </Popover>
  ); */

  const onSelecta = () => {
    if (window.getSelection) {
      if (window.getSelection().toString() !== '') {
        setTextSelected(window.getSelection().toString());
        setSelected(true);
        /* return (
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="success">Click me to see</Button>
          </OverlayTrigger>
        ); */
      }
    } else if (document.selection) {
      if (document.selection.createRange().text !== '') {
        setTextSelected(document.selection.createRange().text);
        setSelected(true);
        /* return (
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="success">Click me to see</Button>
          </OverlayTrigger>
        ); */
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
      <div onMouseUp={() => onSelecta()}>
        <div className="select-area" dangerouslySetInnerHTML={{ __html: item.tag }} />
      </div>
    );
  };
  return (
    <>
      <Container>
        <div className="">
          <h3 className="title-editor-xl">{blogInfo.portada.titulo}</h3>
          <p className="subtitle-editor">{blogInfo.portada.descripcion}</p>
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
          <div className="article-content">
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
          <div className="content-btns-last">
            <label className="text-md">Ver en</label>
            <button className="Btn-square d-i">P</button>
            <button className="Btn-square d-i">S</button>
            <button className="Btn-square d-i">N</button>
          </div>
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
