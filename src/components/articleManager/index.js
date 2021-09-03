/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './editor.module.css';
import DetailsModal from './modals/detailsModal/DetailsModal';
import ModalVideo from './modals/addVideoModal/addVideoModal';
import ModalAudio from './modals/addAudioModal/addAudioModal';
import EditorOptionRender from './editorComponents/renderOptions/renderContainer';
import ToolsComponent from './editorComponents/toolsComponent/tools';
import TooltipContainer from './editorComponents/tooltipContainer/TooltipContainer';
import { upload, remove } from '@/services/aws';

const EditorComponent = ({ option }) => {
  const [modalShow, setModalShow] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [modalShowVideo, setModalShowVideo] = useState(false);
  const [arrayItemsEditor, setItems] = useState({});
  const [addedVideo, setContentVideo] = useState(false);
  const [addedAudio, setContentAudio] = useState(false);
  const [editVideo, setEditVideo] = useState({ idContent: '', tagEdit: '', type: '' });
  const [editTag, setEditInfo] = useState({ idContent: '', tagEdit: '', type: '' });
  const [editImg, setEditImg] = useState(false);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [activeOption, setActiveCont] = useState('');

  const { data } = useSelector((state) => state.profile);

  const makeid = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = 5;
    for (let i = 0; i < 5; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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

  /* Add components functions */

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

  const addImage = async (event) => {
    event.preventDefault();
    const EditorContent = localStorage.getItem('contentEditor');
    const obj = JSON.parse(EditorContent);
    const idContainer = makeid();
    if (event.target.files.length > 0) {
      const path = `${data._id}/resources`;
      const image = event.target.files[0];

      const res = await upload(path, image);
      if (res.ok) {
        obj.html.push({ id: idContainer, type: 'image', content: res.file });
      }
      localStorage.setItem('contentEditor', JSON.stringify(obj));
      setItems(obj);
    }
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

  const addAudioFunct = (tag) => {
    const EditorContent = localStorage.getItem('contentEditor');
    const obj = JSON.parse(EditorContent);
    const idContainer = makeid();
    if (option === 'onlyAudio') {
      setContentAudio(true);
    }
    if (obj.html.length > 0 && option === 'onlyAudio') {
      const topAudio = { html: [] };
      topAudio.html.push({ id: idContainer, type: 'iframeAudio', content: tag });
      obj.html.forEach((item) => {
        topAudio.html.push(item);
      });
      localStorage.setItem('contentEditor', JSON.stringify(topAudio));
      setItems(topAudio);
    } else {
      obj.html.push({ id: idContainer, type: 'iframeAudio', content: tag });
      localStorage.setItem('contentEditor', JSON.stringify(obj));
      setItems(obj);
    }
    setModalShow(false);
  };

  /* ######################### */

  /* Edit components functions */
  const editComponentFunct = (tag, idElement, typeOption) => {
    if (typeOption === 'linkVideo' || typeOption === 'iframeVideo') {
      setModalShowVideo(true);
      setEditVideo({ idContent: idElement, tagEdit: tag, type: typeOption });
      setUpdateEvent(true);
    } else if (typeOption === 'iframeAudio') {
      setModalShow(true);
      setEditInfo({ idContent: idElement, tagEdit: tag, type: typeOption });
      setUpdateEvent(true);
    }
  };

  const updateFunctionEventVideo = (tag, idElement, typeContent) => {
    setUpdateEvent(false);
    setModalShowVideo(false);
    const oldArray = arrayItemsEditor.html;
    let newTag = {};
    if (!typeContent) {
      newTag = { id: idElement, type: 'linkVideo', content: tag };
    } else {
      newTag = { id: idElement, type: 'iframeVideo', content: tag };
    }
    oldArray.forEach((item, index) => {
      if (item.id === idElement) {
        oldArray[index] = newTag;
      }
    });
    localStorage.setItem('contentEditor', JSON.stringify(arrayItemsEditor));
  };

  const handleChangeImage = async (idElement, content, event) => {
    event.preventDefault();
    const currentContent = content;
    if (event.target.files.length > 0 && currentContent !== '' && currentContent !== 'undefined') {
      const path = `${data._id}/resources`;
      const image = event.target.files[0];

      const resDelete = await remove(currentContent);
      if (resDelete.ok) {
        const res = await upload(path, image);
        if (res.ok) {
          arrayItemsEditor.html.forEach((item, index) => {
            if (item.id === idElement) {
              const contents = arrayItemsEditor;
              contents.html[index].content = res.file;
              setItems(contents);
              setEditImg(!editImg);
              localStorage.setItem('contentEditor', JSON.stringify(contents));
            }
          });
        } else {
          setEditImg(false);
        }
      } else {
        setEditImg(false);
      }
    }
  };

  const updateFunctionEvent = (tag, idElement, typeContent) => {
    setUpdateEvent(false);
    setModalShow(false);
    const oldArray = arrayItemsEditor.html;
    const newTag = { id: idElement, type: typeContent, content: tag };
    oldArray.forEach((item, index) => {
      if (item.id === idElement) {
        oldArray[index] = newTag;
      }
    });
    localStorage.setItem('contentEditor', JSON.stringify(arrayItemsEditor));
  };
  /* ######################### */

  const removeFileToAWS = async (file) => {
    await remove(file);
  };

  const deleteComponentEditor = (idContent, type) => {
    const newArrayContent = { html: [] };
    let content = '';
    // let deleteImage = true;
    arrayItemsEditor.html.forEach((item) => {
      if (item.id !== idContent) {
        newArrayContent.html.push(item);
      } else {
        content = item.content;
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
    if (option === 'onlyAudio') {
      let validateAudio = false;
      newArrayContent.html.forEach((item) => {
        if (item.type === 'iframeAudio') {
          validateAudio = true;
        }
      });
      setContentAudio(validateAudio);
    }
    if (type === 'image') {
      removeFileToAWS(content);
    }
  };

  const setActiveClass = (id) => {
    setActiveCont(id);
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
        if (item.type === 'iframeAudio') {
          setContentAudio(true);
        }
      });
    }
  }, []);

  return (
    <div className={styles.editor}>
      <ModalAudio
        show={modalShow}
        updateEvent={updateEvent}
        editInfo={editTag}
        addAudio={addAudioFunct}
        updateFunctionEvent={updateFunctionEvent}
        showModal={() => setModalShow(false)}
      />
      <ModalVideo
        show={modalShowVideo}
        editInfo={editVideo}
        updateEvent={updateEvent}
        addVideo={addVideoFunct}
        updateFunctionEvent={updateFunctionEventVideo}
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
                      <EditorOptionRender
                        data={item}
                        deleteComponentEditor={deleteComponentEditor}
                        editComponentFunct={editComponentFunct}
                        handleChange={handleChange}
                        handleChangeImage={handleChangeImage}
                        setActiveClass={setActiveClass}
                        activeOption={activeOption}
                      />
                    </div>
                  );
                })) : (<> </>)
            }
          </div>
          <ToolsComponent
            option={option}
            addedVideo={addedVideo}
            addedAudio={addedAudio}
            addTextFunct={addTextFunct}
            setModalShowVideo={setModalShowVideo}
            setModalShow={setModalShow}
            addImage={addImage}
          />
        </div>
      </div>
      {/* EDITOR OPTIONS NAV */}
      <div className={styles.optionsContainer}>

        <TooltipContainer tooltipText="Publicar" placement="left">
          <div className={`icon-button icon-button--success ${styles.optionsItem}`} onClick={() => setShowPublish(true)}>
            H
          </div>
        </TooltipContainer>

        <TooltipContainer tooltipText="Guardar borrador" placement="left">
          <div className={`icon-button icon-button--primary ${styles.optionsItem}`}>
            I
          </div>
        </TooltipContainer>

        <TooltipContainer tooltipText="Vista previa" placement="left">
          <div className={`icon-button ${styles.optionsItem}`}>C</div>
        </TooltipContainer>

        <TooltipContainer tooltipText="Detalles" placement="left">
          <div className={`icon-button ${styles.optionsItem}`}>J</div>
        </TooltipContainer>

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
