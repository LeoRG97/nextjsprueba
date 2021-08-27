/* eslint-disable import/extensions */
import React, { useState } from 'react';
import styles from './userInvitation.module.css';

const SelectImg = () => {
  const [imagen, setImagen] = useState();
  const [imagenSend, setImagenSend] = useState('');
  // eslint-disable-next-line no-console
  console.log(imagenSend);

  const handleChangeFile = (event) => {
    event.preventDefault();
    if (event.target.files.length > 0) {
      setImagen(URL.createObjectURL(event.target.files[0]));
      setImagenSend((event.target.files[0]));
    } else {
      setImagen('');
      setImagenSend('');
    }
  };
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-auto">
          {
            imagen === '' || imagen === undefined ? (
              <div />
            ) : (
              <img className={styles.img} src={imagen} alt="profile" />
            )
          }
        </div>
        <input className={styles.inputImg} accept="image/png,image/jpeg,image/jpeg" id="imagen" size="60" type="file" placeholder="Imagen" autoComplete="off" name="imagen" required="required" onChange={(event) => handleChangeFile(event)} />
        {
          imagen === '' ? (
            <label htmlFor="imagen" id="labelInput">
              <span className={styles.labelInput}>Elegir imagen</span>
            </label>
          ) : (
            <label htmlFor="imagen" id="labelInput">
              <span className={styles.labelInput}>Cambiar imagen</span>
            </label>
          )
        }
      </div>
    </div>
  );
};

export default SelectImg;
