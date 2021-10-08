/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './notes.module.css';

const ModalEditNote = ({
  show,
  onClose,
  saveNota,
  note,
}) => {
  const [errorGeneral, setErrorGeneral] = useState('');
  const [titulo, setTitulo] = useState(note.titulo || '');
  const [errorTitulo, setErrorTitulo] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [descripcion, setDescripcion] = useState(note.descripcion || '');
  const [errorDescripcion, setErrorDescripcion] = useState(
    {
      text: '',
      status: false,
    },
  );

  const validate = (type, value) => {
    if (type === 'titulo') {
      if (!value || value === '') {
        setErrorTitulo({
          status: true,
          text: 'Introduzca un título para la nota.',
        });
        setTitulo(value);
        setErrorGeneral(true);
      } else {
        setErrorTitulo({
          status: false,
          text: '',
        });
        setTitulo(value);
        setErrorGeneral(false);
      }
    } else if (type === 'descripcion') {
      if (!value || value === '') {
        setErrorDescripcion({
          status: true,
          text: 'Agregue una descripción a la nota.',
        });
        setDescripcion(value);
        setErrorGeneral(true);
      } else {
        setErrorDescripcion({
          status: false,
          text: '',
        });
        setDescripcion(value);
        setErrorGeneral(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titulo === '' || descripcion === '') {
      validate('titulo', titulo);
      validate('descripcion', descripcion);
    } else if (!errorGeneral) {
      const model = {
        titulo,
        descripcion,
        nota: note.nota,
        idNota: note._id,
      };
      saveNota(model);
    }
  };

  const closeModal = () => {
    setDescripcion(note.descripcion);
    setTitulo(note.titulo);
    onClose();
  };

  useEffect(() => {
    if (titulo !== note.titulo) {
      setTitulo(note.titulo);
    }
    if (descripcion !== note.descripcion) {
      setDescripcion(note.descripcion);
    }
  }, [note]);

  return (
    <>
      <Modal show={show} size="md" centered onHide={closeModal}>
        <Modal.Body className={styles.container}>
          <form onSubmit={handleSubmit}>
            <div className="title row content-m-centered">
              <div className="Editor-container">
                <textarea
                  className={`${styles.textarea} Edit-area`}
                  rows="1"
                  placeholder="Nueva nota..."
                  id="titulo"
                  name="titulo"
                  type="text"
                  value={titulo}
                  onChange={(event) => validate('titulo', event.target.value)}
                  required
                />
                {errorTitulo.status && <small className="d-block text-md text--theme-error">{errorTitulo.text}</small>}
              </div>
            </div>
            <div className="row">
              <h1 className="text-start">
                <span className={`${styles.container_icon} icon icon-modal--md`}>h</span>
                <span className={`${styles.text_modal} text-md text`}>{note.nota}</span>
                <span className={`${styles.container_icon} icon icon-modal--md`}>j</span>
              </h1>
            </div>
            <div className="row content-m-centered mt-2">
              <div className="Editor-container">
                <textarea
                  className={`${styles.textarea} Edit-area`}
                  rows="6"
                  maxLength={200}
                  placeholder="Escribe aquí tus comentarios..."
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  value={descripcion}
                  onChange={(event) => validate('descripcion', event.target.value)}
                  required
                />
                {errorDescripcion.status && <small className="d-block text-md text--theme-error">{errorDescripcion.text}</small>}
              </div>
            </div>
            <div className="row mt-2 mb-3 justify-content-md-center">
              <div className="col-12">
                <div className="row justify-content-md-end mt-3">
                  <div className="col-6 col-md-auto">
                    <button className="button button--theme-secondary" onClick={closeModal} type="button">
                      Descartar
                    </button>
                  </div>
                  <div className="col-6 col-md-auto">
                    <button className="button button--theme-primary" onClick={handleSubmit} type="submit">
                      Actualizar nota
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ModalEditNote.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};

export default ModalEditNote;
