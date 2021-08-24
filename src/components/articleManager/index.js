/* eslint-disable react/no-danger */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AudioModalComponent from './AudioModal';
import DetailsModal from './detailsModal/DetailsModal';
import ModalVideo from './addVideoModal/addVideoModal';
import styles from './editor.module.css';

const EditorComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [modalShowVideo, setModalShowVideo] = useState(false);
  const [arrayItemsEditor, setItems] = useState({});

  const renderTooltip = (props) => (
    // eslint-disable-next-line react/jsx-filename-extension
    <Tooltip id="button-tooltip">{props}</Tooltip>
  );

  const makeid = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = 5;
    for (let i = 0; i < 5; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const elementsOptions = (icon, canvas) => {
    // CANVAS OPTION
    const elementOptionM = document.createElement('div');
    elementOptionM.classList = 'canvas-options';
    canvas.appendChild(elementOptionM);

    // CANVAS OPTION ICON
    const elementIconM = document.createElement('div');
    elementIconM.innerHTML = icon;
    elementIconM.classList = 'canvas-option-icon icon';
    elementOptionM.appendChild(elementIconM);
  };

  const elementsGenerator = () => {
    const canvas = document.getElementById('canvas');
    if (canvas.children.length === 0) {
      canvas.innerHTML = '';
    }

    // CANVAS CONTAINER
    const elementGeContainer = document.createElement('div');
    elementGeContainer.classList = 'canvas-component-container text-';
    canvas.appendChild(elementGeContainer);

    elementsOptions('4', elementGeContainer);
    // CANVAS TEXTAREA
    const elementG = document.createElement('textarea');
    elementG.setAttribute('rows', '3');
    elementG.setAttribute('cols', '60');
    elementG.classList = 'textarea';
    elementGeContainer.appendChild(elementG);
    elementsOptions('0', elementGeContainer);
  };

  const elementAudio = (tag) => {
    const canvas = document.getElementById('canvas');
    if (canvas.children.length === 0) {
      canvas.innerHTML = '';
    }

    const inputAudio = document.getElementById('modal-input');
    if (inputAudio.value) {
      // CANVAS CONTAINER
      const elementGeContainer = document.createElement('div');
      elementGeContainer.classList = 'canvas-component-container text-';
      canvas.appendChild(elementGeContainer);

      const iframeEC = document.createElement(tag);
      iframeEC.classList = 'multimedia';
      iframeEC.innerHTML = inputAudio.value;
      if (iframeEC.getElementsByTagName('iframe').length > 0) {
        elementsOptions('4', elementGeContainer);
        iframeEC.getElementsByTagName('iframe')[0].width = '100%';
        iframeEC.getElementsByTagName('iframe')[0].height = '100%';
        elementGeContainer.appendChild(iframeEC);
        elementsOptions('0', elementGeContainer);
        setModalShow(false);
      } else {
        const spanModal = document.getElementById('modal-mensaje');
        spanModal.innerHTML = 'No se permiten URLs';
      }
    }
  };

  const addVideoFunct = (tag, embedIframe) => {
    setModalShowVideo(false);
    const EditorContent = localStorage.getItem('contentEditor');
    const obj = JSON.parse(EditorContent);
    const idContainer = makeid();
    if (!embedIframe) {
      obj.html.push({ id: idContainer, type: 'linkVideo', content: tag });
    } else {
      obj.html.push({ id: idContainer, type: 'iframeVideo', content: tag });
    }
    localStorage.setItem('contentEditor', JSON.stringify(obj));
    setItems(obj);
  };

  useEffect(() => {
    const EditorContent = localStorage.getItem('contentEditor');
    if (EditorContent === null) {
      // {"id": "", "type":"","content":""}
      const jsonStr = '{"html":[]}';
      localStorage.setItem('contentEditor', jsonStr);
      setItems({ html: [] });
    } else {
      setItems(JSON.parse(EditorContent));
    }
  }, []);

  const renderSwitchContainer = (item) => {
    switch (item.type) {
      case 'linkVideo':
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="Editor-content">
                  <button className="Edit-btn move-btn icon">4</button>
                  <div className="Editor-container">
                    <iframe src={item.content} title="video" />
                  </div>
                  <div className="Edit-dropdown-content">
                    <div className="Edit-dropdown">
                      <button className="Edit-dropbtn icon">0</button>
                      <div className="Edit-dropdown-container">
                        <a href="#"><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                        <a href="#"><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'iframeVideo':
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="Editor-content">
                  <button className="Edit-btn move-btn icon">4</button>
                  <div className="Editor-container">
                    <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                  </div>
                  <div className="Edit-dropdown-content">
                    <div className="Edit-dropdown">
                      <button className="Edit-dropbtn icon">0</button>
                      <div className="Edit-dropdown-container">
                        <a href="#"><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                        <a href="#"><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (<> </>);
    }
  };

  return (
    <div className={styles.editor}>
      <AudioModalComponent
        show={modalShow}
        evento={() => elementAudio(true, 'div')}
        onHide={() => setModalShow(false)}
      />
      <ModalVideo
        show={modalShowVideo}
        addVideo={addVideoFunct}
        showModal={() => setModalShowVideo(false)}
      />
      <div className={styles.editorContent} align="center">
        <div>
          <div id="canvas" className={styles.canvas}>
            Estructura aquí el contenido de tu artículo
            {
              (arrayItemsEditor.length !== 0 && arrayItemsEditor.html)
                ? (arrayItemsEditor.html.map((item) => {
                  return (
                    <div key={item.id}>
                      {
                        renderSwitchContainer(item)
                      }
                    </div>
                  );
                })) : (<> </>)
            }
          </div>
          <div className="tools">
            <section>
              <div className="files text-md">Insertar</div>
            </section>
            <section className="tools-select">
              <div className="dropdown">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 200 }}
                  overlay={renderTooltip('Texto')}
                >
                  <div className="dropdown-select">
                    <span id="select-span" className="text-sm">Select</span>
                    <i className="icon">1</i>
                  </div>
                </OverlayTrigger>
                <input type="hidden" name="option" />
                <ul className="select-dropdown">
                  <li className="text-sm" onClick={() => elementsGenerator('h1')} id="h1">
                    Cabecera
                  </li>
                  <li className="text-sm" onClick={() => elementsGenerator('h3')} id="h3">
                    Subcabecera
                  </li>
                  <li className="text-sm" onClick={() => elementsGenerator('p')} id="p">
                    Párrafo
                  </li>
                  <li className="text-sm" onClick={() => elementsGenerator('small')} id="small">
                    Pie de texto
                  </li>
                </ul>
              </div>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={renderTooltip('Imagen')}
              >
                <div className="icon tools-media">E</div>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={renderTooltip('Video')}
              >
                <div
                  className="icon tools-media"
                  onClick={() => setModalShowVideo(true)}
                >F
                </div>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={renderTooltip('Audio')}
              >
                <div
                  onClick={() => setModalShow(true)}
                  className="icon tools-media"
                >
                  G
                </div>
              </OverlayTrigger>
            </section>
          </div>
        </div>
      </div>
      {/* EDITOR OPTIONS NAV */}
      <div className="options-container">
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 200 }}
          overlay={renderTooltip('Publicar')}
        >
          <div className="option-content" onClick={() => setShowPublish(true)}>
            <div className="icon-content icon icon-toolBackgournd-1 colorLight">
              H
            </div>
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 200 }}
          overlay={renderTooltip('Guardar borrador')}
        >
          <div className="option-content">
            <div className="icon-content icon icon-toolBackgournd-2 colorLight">
              I
            </div>
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 200 }}
          overlay={renderTooltip('Vista previa')}
        >
          <div className="option-content">
            <div className="icon-content icon">C</div>
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 200 }}
          overlay={renderTooltip('Detalles')}
        >
          <div className="option-content">
            <div className="icon-content icon">J</div>
          </div>
        </OverlayTrigger>
      </div>
      <DetailsModal
        show={showPublish}
        onClose={() => setShowPublish(false)}
      />
    </div>
  );
};

export default EditorComponent;
