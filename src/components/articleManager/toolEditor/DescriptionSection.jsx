/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ToolContext } from '@/helpers/contexts/toolContext';
import styles from '../editor.module.css';
// import DetailsModal from '../modals/detailsModal/DetailsModal';
import EditorOptionRender from '../editorComponents/renderOptions/renderContainer';
import ToolsComponent from '../editorComponents/toolsComponent/tools';

const DescriptionSection = ({ setValidateContent }) => {
  const {
    usage: arrayItemsEditor,
    setUsage: setItems,
  } = useContext(ToolContext);
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
    let validateText = false;
    if (arrayItemsEditor.html.length > 0) {
      validateText = true;
    }
    setValidateContent(validateText);
  }, [arrayItemsEditor]);

  return (
    <>
      <DragDropContext>
        <Droppable droppableId="canvasDrop">
          {(provided) => (
            <div
              id="canvas2"
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
        option="toolDescription"
        addTextFunct={addTextFunct}
      />
    </>
  );
};

export default DescriptionSection;
