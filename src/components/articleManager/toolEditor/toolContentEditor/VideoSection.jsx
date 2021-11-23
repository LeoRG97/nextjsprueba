/* eslint-disable object-curly-newline */
import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from '../../editor.module.css';
import ModalVideo from '../../modals/addVideoModal/addVideoModal';
import EditorOptionRender from '../../editorComponents/renderOptions/renderContainer';
import ToolsComponent from '../../editorComponents/toolsComponent/tools';
import { ToolContext } from '@/helpers/contexts/toolContext';

const VideoSection = () => {
  const {
    definition: arrayItemsEditor,
    setDefinition: setItems,
  } = useContext(ToolContext);
  const [modalShowVideo, setModalShowVideo] = useState(false);
  const [addedVideo, setContentVideo] = useState(false);
  const [editVideo, setEditVideo] = useState({ idContent: '', tagEdit: '', type: '' });
  const [updateEvent, setUpdateEvent] = useState(false);
  const [activeOption, setActiveCont] = useState('');

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
        switch (modText.html[index].type) {
          case 'textHeader': {
            modText.html[index].tag = `<h1>${e.target.value}</h1>`;
            break;
          }
          case 'textSubHeader': {
            modText.html[index].tag = `<h3>${e.target.value}</h3>`;
            break;
          }
          case 'textParagraph': {
            modText.html[index].tag = `<p>${e.target.value}</p>`;
            break;
          }
          case 'textFooter': {
            modText.html[index].tag = `<small>${e.target.value}</small>`;
            break;
          }
          default: {
            break;
          }
        }
        setItems(modText);
      }
    });
  };

  /* Add components functions */

  const addVideoFunct = (tag, embedIframe) => {
    const obj = { ...arrayItemsEditor };
    const idContainer = makeid();
    const topVideo = { html: [] };
    if (!embedIframe) {
      topVideo.html.push({ id: idContainer, type: 'linkVideo', content: tag, tag });
    } else {
      topVideo.html.push({ id: idContainer, type: 'iframeVideo', content: tag, tag });
    }
    obj.html.forEach((item) => {
      topVideo.html.push(item);
    });
    setItems(topVideo);
    setModalShowVideo(false);
  };

  const addTextFunct = (optionText) => {
    const obj = { ...arrayItemsEditor };
    const idContainer = makeid();
    if (optionText === 'h1') {
      obj.html.push({
        id: idContainer, type: 'textHeader', content: '', tag: '<h1></h1>',
      });
    } else if (optionText === 'h3') {
      obj.html.push({
        id: idContainer, type: 'textSubHeader', content: '', tag: '<h3></h3>',
      });
    } else if (optionText === 'p') {
      obj.html.push({
        id: idContainer, type: 'textParagraph', content: '', tag: '<p></p>',
      });
    } else if (optionText === 'small') {
      obj.html.push({
        id: idContainer, type: 'textFooter', content: '', tag: '<small></small>',
      });
    }
    setItems(obj);
  };

  /* ######################### */

  /* Edit components functions */
  const editComponentFunct = (tag, idElement, typeOption) => {
    if (typeOption === 'linkVideo' || typeOption === 'iframeVideo') {
      setModalShowVideo(true);
      setEditVideo({ idContent: idElement, tagEdit: tag, type: typeOption });
      setUpdateEvent(true);
    }
  };

  const updateFunctionEventVideo = (tag, idElement, typeContent) => {
    setUpdateEvent(false);
    setModalShowVideo(false);
    const oldArray = arrayItemsEditor.html;
    let newTag = {};
    if (!typeContent) {
      newTag = { id: idElement, type: 'linkVideo', content: tag, tag };
    } else {
      newTag = { id: idElement, type: 'iframeVideo', content: tag, tag };
    }
    oldArray.forEach((item, index) => {
      if (item.id === idElement) {
        oldArray[index] = newTag;
      }
    });
  };

  /* ######################### */

  const deleteComponentEditor = (idContent) => {
    const newArrayContent = { html: [] };
    // let deleteImage = true;
    arrayItemsEditor.html.forEach((item) => {
      if (item.id !== idContent) {
        newArrayContent.html.push(item);
      }
    });
    setItems(newArrayContent);
  };

  const setActiveClass = (id) => {
    setActiveCont(id);
  };

  useEffect(() => {
    let validateVideo = false;
    arrayItemsEditor.html.forEach((item) => {
      if (item.type === 'linkVideo' || item.type === 'iframeVideo') {
        validateVideo = true;
      }
    });
    setContentVideo(validateVideo);
  }, [arrayItemsEditor]);

  return (
    <>
      <ModalVideo
        show={modalShowVideo}
        editInfo={editVideo}
        updateEvent={updateEvent}
        addVideo={addVideoFunct}
        updateFunctionEvent={updateFunctionEventVideo}
        showModal={() => setModalShowVideo(false)}
      />
      <DragDropContext>
        <Droppable droppableId="canvasDrop">
          {(provided) => (
            <div
              id="canvas"
              className={styles.canvas}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                (arrayItemsEditor.html && arrayItemsEditor.html.length !== 0)
                  ? (arrayItemsEditor.html.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <EditorOptionRender
                          index={index}
                          data={item}
                          deleteComponentEditor={deleteComponentEditor}
                          editComponentFunct={editComponentFunct}
                          handleChange={handleChange}
                          setActiveClass={setActiveClass}
                          activeOption={activeOption}
                          dragDisabled
                        />
                      </div>
                    );
                  })) : <></>
              }
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ToolsComponent
        option="tool"
        addedVideo={addedVideo}
        addTextFunct={addTextFunct}
        setModalShowVideo={setModalShowVideo}
      />

    </>
  );
};

export default VideoSection;
