import React, { useRef } from 'react';

const FileInput = ({ id, file, setFile }) => {
  const inputRef = useRef();

  const handleIconClick = () => {
    if (!file) {
      return inputRef.current.click();
    }
    return setFile('');
  };

  const handleFile = (e) => {
    const fileData = e.target.files[0];
    setFile(fileData);
  };

  return (
    <div className="input-container">
      <label className="subtitle input" htmlFor={id}>
        {file ? file.name : 'Añadir archivo'}
        <input
          ref={inputRef}
          id={id}
          type="file"
          className="input--hidden"
          placeholder="Añadir archivo"
          onChange={handleFile}
          accept="image/jpeg,image/png,application/pdf"
        />
      </label>
      <span className="input__icon icon" onClick={handleIconClick}>{file ? 'O' : 'Ñ'}</span>
    </div>
  );
};

export default FileInput;
