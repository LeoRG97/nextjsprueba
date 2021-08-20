/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AudioModalComponent from './AudioModal';
import styles from './editor.module.css';

const EditorComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  const renderTooltip = (props) => (
    // eslint-disable-next-line react/jsx-filename-extension
    <Tooltip id="button-tooltip">{props}</Tooltip>
  );

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

  return (
    <div className={styles.editor}>
      <AudioModalComponent
        show={modalShow}
        evento={() => elementAudio(true, 'div')}
        onHide={() => setModalShow(false)}
      />
      <div className={styles.editorContent} align="center">
        <div>
          <div id="canvas" className={styles.canvas}>
            Estructura aquí el contenido de tu artículo
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
                <div className="icon tools-media">F</div>
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
          <div className="option-content">
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
    </div>
  );
};

export default EditorComponent;
