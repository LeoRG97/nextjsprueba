import React, { useRef } from 'react';

const InputFile = ({
  inputId, fileName, onSave, onDelete,
}) => {
  const inputRef = useRef();

  const handleIconClick = () => {
    if (!fileName) {
      inputRef.current.click();
    } else {
      onDelete(inputId);
    }
  };

  const handleFile = (e) => {
    const fileData = e.target.files[0];
    onSave(fileData, inputId);
  };

  return (
    <div className="input-container">
      <label className="subtitle input" htmlFor={inputId}>
        {fileName || 'Añadir archivo'}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="input--hidden"
          placeholder="Añadir archivo"
          onChange={handleFile}
          accept="image/jpeg,image/png,application/pdf"
        />
      </label>
      <span className="input__icon icon" onClick={handleIconClick}>{fileName ? 'O' : 'Ñ'}</span>
    </div>
  );
};

export default InputFile;
