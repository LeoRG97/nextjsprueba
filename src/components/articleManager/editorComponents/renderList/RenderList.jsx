import React from 'react';
import EditorOptionRender from '../renderOptions/renderContainer';

const RenderList = React.memo(({
  arrayItemsEditor,
  deleteComponentEditor,
  editComponentFunct,
  handleChange,
  setActiveClass,
  activeOption,
}) => {
  return (
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
            />
          </div>
        );
      })) : (' Estructura aquí el contenido de tu artículo')
  );
});

export default RenderList;
