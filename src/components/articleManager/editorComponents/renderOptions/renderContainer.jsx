/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-danger */
import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { Draggable } from 'react-beautiful-dnd';

const EditorOptionRender = memo(({
  deleteComponentEditor, handleChange, handleChangeImage, data, editComponentFunct, activeOption,
  setActiveClass, index, dragDisabled,
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
      case 'link':
        return (
          <div className={`Editor-content-child ${active}`} dangerouslySetInnerHTML={{ __html: item.content }} />
        );
      default:
        return <></>;
    }
  };

  const onChangeImage = (e) => {
    handleChangeImage(data.id, data.content, e);
  };

  useEffect(() => {
    if (activeOption === data.id) {
      setActive('active');
    } else {
      setActive('');
    }
  }, [activeOption]);

  return (
    <Draggable draggableId={data.id} index={index} isDragDisabled={dragDisabled}>
      {(provided) => (
        <div className="container-fluid" {...provided.draggableProps} ref={provided.innerRef}>
          <div className="row">
            <div className="col">
              <div className="Editor-content" onClick={() => setActiveClass(data.id)}>
                <div className={`Edit-btn move-btn icon ${dragDisabled && 'disabled'}`} {...provided.dragHandleProps}>4</div>
                <div className="Editor-container">
                  {renderElement(data)}
                </div>
                <div className="Edit-dropdown-content">
                  <div className="Edit-dropdown">
                    <button className="Edit-dropbtn icon">0</button>
                    <div className="Edit-dropdown-container">
                      {
                        // eslint-disable-next-line no-nested-ternary
                        (data.type !== 'textHeader' && data.type !== 'textSubHeader' && data.type !== 'textParagraph' && data.type !== 'textFooter')
                          ? (
                            (data.type === 'image')
                              ? (
                                (
                                  <a>
                                    <label htmlFor={`imagenUpdate${data.id}`}>
                                      <span className="icon">E</span>&nbsp;&nbsp;&nbsp;&nbsp; Modificar
                                      <input
                                        className="input-image-none"
                                        accept="image/png,image/jpeg,image/jpeg"
                                        id={`imagenUpdate${data.id}`}
                                        size="60"
                                        type="file"
                                        placeholder="Imagen"
                                        autoComplete="off"
                                        name="imagenUpdate"
                                        required="required"
                                        onChange={onChangeImage}
                                      />
                                    </label>
                                  </a>
                                )
                              ) : (<a onClick={() => editComponentFunct(data.content, data.id, data.type)}><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>)
                          ) : (<></>)
                      }
                      <a onClick={() => deleteComponentEditor(data.id, data.type)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
});

EditorOptionRender.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.string,
  }),
  activeOption: PropTypes.string,
  deleteComponentEditor: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeImage: PropTypes.func,
  editComponentFunct: PropTypes.func,
  setActiveClass: PropTypes.func.isRequired,
  dragDisabled: PropTypes.bool,
};

EditorOptionRender.defaultProps = {
  data: {},
  activeOption: '',
  dragDisabled: false,
  handleChangeImage: () => {},
  editComponentFunct: () => {},
};

export default EditorOptionRender;
