/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-danger */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

const EditorOptionRender = ({
  deleteComponentEditor, handleChange, data, editComponentFunct, activeOption, setActiveClass,
}) => {
  const [active, setActive] = useState('');

  const renderElement = (item) => {
    switch (item.type) {
      case 'linkVideo':
        return (
          <div className={`Editor-content-child ${active}`}>
            <iframe src={item.content} title="video" />
          </div>
        );
      case 'iframeVideo':
        return (
          <div className={`Editor-content-child ${active}`} dangerouslySetInnerHTML={{ __html: item.content }} />
        );
      case 'iframeAudio':
        return (
          <div className={`Editor-content-child ${active}`} dangerouslySetInnerHTML={{ __html: item.content }} />
        );
      case 'image':
        return (
          <div className={`Editor-content-child ${active} image-editor-self`}>
            <img className="image-editor" src={item.content} alt="" />
          </div>
        );
      case 'textHeader':
        return (
          <TextareaAutosize
            className="Edit-area title-editor"
            defaultValue={item.content}
            placeholder="Agrega una cabecera"
            onChange={(e) => handleChange(item.id, e)}
          />
        );
      case 'textSubHeader':
        return (
          <TextareaAutosize
            className="Edit-area subtitle-editor"
            defaultValue={item.content}
            placeholder="Agrega una subcabecera"
            onChange={(e) => handleChange(item.id, e)}
          />
        );
      case 'textParagraph':
        return (
          <TextareaAutosize
            className="Edit-area paragraph-editor"
            defaultValue={item.content}
            placeholder="Agrega un párrafo"
            onChange={(e) => handleChange(item.id, e)}
          />
        );
      case 'textFooter':
        return (
          <TextareaAutosize
            className="Edit-area footer-text-editor"
            defaultValue={item.content}
            placeholder="Agrega un pie de texto"
            onChange={(e) => handleChange(item.id, e)}
          />
        );
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (activeOption === data.id) {
      setActive('active');
    } else {
      setActive('');
    }
  }, [activeOption]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="Editor-content" onClick={() => setActiveClass(data.id)}>
              <button className="Edit-btn move-btn icon">4</button>
              <div className="Editor-container">
                {renderElement(data)}
              </div>
              <div className="Edit-dropdown-content">
                <div className="Edit-dropdown">
                  <button className="Edit-dropbtn icon">0</button>
                  <div className="Edit-dropdown-container">
                    {
                      (data.type !== 'textHeader' && data.type !== 'textSubHeader' && data.type !== 'textParagraph' && data.type !== 'textFooter') ? (
                        <a onClick={() => editComponentFunct(data.content, data.id, data.type)}><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                      ) : (<></>)
                    }
                    <a onClick={() => deleteComponentEditor(data.id)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

EditorOptionRender.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.string,
  }),
  activeOption: PropTypes.string,
  deleteComponentEditor: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  editComponentFunct: PropTypes.func.isRequired,
  setActiveClass: PropTypes.func.isRequired,
};

EditorOptionRender.defaultProps = {
  data: {},
  activeOption: '',
};

export default EditorOptionRender;
