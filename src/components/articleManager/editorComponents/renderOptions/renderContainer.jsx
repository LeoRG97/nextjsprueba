/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

const EditorOptionRender = ({
  deleteComponentEditor, handleChange, data,
}) => {
  const renderElement = (item) => {
    switch (item.type) {
      case 'linkVideo':
        return (
          <iframe src={item.content} title="video" />
        );
      case 'iframeVideo':
        return (
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        );
      case 'iframeAudio':
        return (
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
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

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="Editor-content">
              <button className="Edit-btn move-btn icon">4</button>
              <div className="Editor-container">
                {renderElement(data)}
              </div>
              <div className="Edit-dropdown-content">
                <div className="Edit-dropdown">
                  <button className="Edit-dropbtn icon">0</button>
                  <div className="Edit-dropdown-container">
                    <a href="#"><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                    <a href="#" onClick={() => deleteComponentEditor(data.id)}><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
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
  deleteComponentEditor: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

EditorOptionRender.defaultProps = {
  data: {},
};

export default EditorOptionRender;
