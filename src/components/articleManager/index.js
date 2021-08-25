/* eslint-disable react/no-danger */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import AudioModalComponent from './AudioModal';
import DetailsModal from './detailsModal/DetailsModal';
import ModalVideo from './addVideoModal/addVideoModal';
import ToolsComponent from './toolsComponent/tools';
import styles from './editor.module.css';

const EditorComponent = ({ option }) => {
  const [modalShow, setModalShow] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [modalShowVideo, setModalShowVideo] = useState(false);
  const [arrayItemsEditor, setItems] = useState({});
  const [addedVideo, setContentVideo] = useState(false);

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

  const handleChange = (idContent, e) => {
    // e.persist();
    arrayItemsEditor.html.forEach((item, index) => {
      if (item.id === idContent) {
        // eslint-disable-next-line prefer-const
        let modText = arrayItemsEditor;
        modText.html[index].content = e.target.value;
        setItems(modText);
        localStorage.setItem('contentEditor', JSON.stringify(modText));
      }
    });
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
    const EditorContent = localStorage.getItem('contentEditor');
    const obj = JSON.parse(EditorContent);
    const idContainer = makeid();
    if (option === 'onlyVideo') {
      setContentVideo(true);
    }
    if (obj.html.length > 0 && option === 'onlyVideo') {
      const topVideo = { html: [] };
      if (!embedIframe) {
        topVideo.html.push({ id: idContainer, type: 'linkVideo', content: tag });
      } else {
        topVideo.html.push({ id: idContainer, type: 'iframeVideo', content: tag });
      }
      obj.html.forEach((item) => {
        topVideo.html.push(item);
      });
      localStorage.setItem('contentEditor', JSON.stringify(topVideo));
      setItems(topVideo);
    } else {
      if (!embedIframe) {
        obj.html.push({ id: idContainer, type: 'linkVideo', content: tag });
      } else {
        obj.html.push({ id: idContainer, type: 'iframeVideo', content: tag });
      }
      localStorage.setItem('contentEditor', JSON.stringify(obj));
      setItems(obj);
    }
    setModalShowVideo(false);
  };

  const addTextFunct = (optionText) => {
    const EditorContent = localStorage.getItem('contentEditor');
    const obj = JSON.parse(EditorContent);
    const idContainer = makeid();
    if (optionText === 'h1') {
      obj.html.push({ id: idContainer, type: 'textHeader', content: '' });
    } else if (optionText === 'h3') {
      obj.html.push({ id: idContainer, type: 'textSubHeader', content: '' });
    } else if (optionText === 'p') {
      obj.html.push({ id: idContainer, type: 'textParagraph', content: '' });
    } else if (optionText === 'small') {
      obj.html.push({ id: idContainer, type: 'textFooter', content: '' });
    }
    localStorage.setItem('contentEditor', JSON.stringify(obj));
    setItems(obj);
  };

  const deleteComponentEditor = (idContent) => {
    const newArrayContent = { html: [] };
    arrayItemsEditor.html.forEach((item) => {
      if (item.id !== idContent) {
        newArrayContent.html.push(item);
      }
    });
    setItems(newArrayContent);
    localStorage.setItem('contentEditor', JSON.stringify(newArrayContent));
    if (option === 'onlyVideo') {
      let validateVideo = false;
      newArrayContent.html.forEach((item) => {
        if (item.type === 'linkVideo' || item.type === 'iframeVideo') {
          validateVideo = true;
        }
      });
      setContentVideo(validateVideo);
    }
  };

  useEffect(() => {
    const EditorContent = localStorage.getItem('contentEditor');
    if (EditorContent === null) {
      // {id: "", type: "", content: ""}
      const jsonStr = '{"html":[]}';
      localStorage.setItem('contentEditor', jsonStr);
      setItems({ html: [] });
    } else {
      setItems(JSON.parse(EditorContent));
      const elementsEditor = JSON.parse(EditorContent);
      elementsEditor.html.forEach((item) => {
        if (item.type === 'linkVideo' || item.type === 'iframeVideo') {
          setContentVideo(true);
        }
      });
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
                        <a href="#" onClick={() => deleteComponentEditor(item.id)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
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
                        <a href="#" onClick={() => deleteComponentEditor(item.id)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'textHeader':
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="Editor-content">
                  <button className="Edit-btn move-btn icon">4</button>
                  <div className="Editor-container">
                    <TextareaAutosize
                      className="Edit-area title-editor"
                      defaultValue={item.content}
                      placeholder="Agrega una cabecera"
                      onChange={(e) => handleChange(item.id, e)}
                    />
                  </div>
                  <div className="Edit-dropdown-content">
                    <div className="Edit-dropdown">
                      <button className="Edit-dropbtn icon">0</button>
                      <div className="Edit-dropdown-container">
                        <a href="#"><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                        <a href="#" onClick={() => deleteComponentEditor(item.id)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'textSubHeader':
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="Editor-content">
                  <button className="Edit-btn move-btn icon">4</button>
                  <div className="Editor-container">
                    <TextareaAutosize
                      className="Edit-area subtitle-editor"
                      defaultValue={item.content}
                      placeholder="Agrega una subcabecera"
                      onChange={(e) => handleChange(item.id, e)}
                    />
                  </div>
                  <div className="Edit-dropdown-content">
                    <div className="Edit-dropdown">
                      <button className="Edit-dropbtn icon">0</button>
                      <div className="Edit-dropdown-container">
                        <a href="#"><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                        <a href="#" onClick={() => deleteComponentEditor(item.id)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'textParagraph':
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="Editor-content">
                  <button className="Edit-btn move-btn icon">4</button>
                  <div className="Editor-container">
                    <TextareaAutosize
                      className="Edit-area paragraph-editor"
                      defaultValue={item.content}
                      placeholder="Agrega un párrafo"
                      onChange={(e) => handleChange(item.id, e)}
                    />
                  </div>
                  <div className="Edit-dropdown-content">
                    <div className="Edit-dropdown">
                      <button className="Edit-dropbtn icon">0</button>
                      <div className="Edit-dropdown-container">
                        <a href="#"><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                        <a href="#" onClick={() => deleteComponentEditor(item.id)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'textFooter':
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="Editor-content">
                  <button className="Edit-btn move-btn icon">4</button>
                  <div className="Editor-container">
                    <TextareaAutosize
                      className="Edit-area footer-text-editor"
                      defaultValue={item.content}
                      placeholder="Agrega un pie de texto"
                      onChange={(e) => handleChange(item.id, e)}
                    />
                  </div>
                  <div className="Edit-dropdown-content">
                    <div className="Edit-dropdown">
                      <button className="Edit-dropbtn icon">0</button>
                      <div className="Edit-dropdown-container">
                        <a href="#"><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                        <a href="#" onClick={() => deleteComponentEditor(item.id)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
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
          <ToolsComponent
            option={option}
            addedVideo={addedVideo}
            renderTooltip={renderTooltip}
            addTextFunct={addTextFunct}
            setModalShowVideo={setModalShowVideo}
            setModalShow={setModalShow}
          />
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

EditorComponent.propTypes = {
  option: PropTypes.string,
};

EditorComponent.defaultProps = {
  option: '',
};

export default EditorComponent;
