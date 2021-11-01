import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/client';
import styles from './detailsModal.module.css';
import { FileInput } from '@/components';
import { upload } from '@/services/aws';
import { generateMongoID } from '@/helpers/mongoIDGenerator';
import { validateResourceData } from './lessonValidation';

const ModalAddFileLesson = ({
  show, onClose, onSubmit, typeFile,
}) => {
  const [session] = useSession();

  const [fileData, setFileData] = useState({
    nombre: '',
    ruta: '',
    descripcion: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [fileLoading, setFileLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFileData({ ...fileData, [e.target.name]: e.target.value });
  };

  const handleSaveFile = async (file) => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'application/pdf') {
      return setErrors({ ...errors, ruta: 'El tipo de archivo no está permitido' });
    }
    setErrors({ ...errors, ruta: '' });
    setFileLoading(true);

    const res = await upload(`${session.user.id}/courses/resources`, file);
    setFileLoading(false);
    if (res.ok) {
      // add file
      setFileData({ ...fileData, ruta: res.file.split('.com/')[1] });
    } else {
      setErrors({ ...errors, ruta: 'No ha sido posible subir el archivo' });
    }
    return '';
  };

  useEffect(() => {
    setSubmitted(false);
    setErrors({ isValid: true });
    setFileData({
      _id: '',
      nombre: '',
      ruta: '',
      tipo: typeFile,
      descripcion: '',
    });
  }, [typeFile]);

  useEffect(() => {
    if (submitted) {
      const errorObj = validateResourceData(fileData);
      setErrors(errorObj);
    }
  }, [fileData]);

  const handleSubmit = () => {
    setSubmitted(true);
    const errorObj = validateResourceData(fileData);
    if (!errorObj.isValid) {
      setErrors(errorObj);
    } else {
      const _id = generateMongoID();
      onSubmit({ ...fileData, _id });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        centered
        size="md"
        contentClassName={styles.modalContainer}
      >
        <Modal.Body>
          <Row>
            <Col md={12}>
              {
                typeFile === 'link'
                  ? <h3 className="title">Insertar enlace</h3>
                  : <h3 className="title">Insertar archivo</h3>
              }
              <Row>
                <Col md={12}>
                  {
                    typeFile === 'link'
                      ? (
                        <label className="d-block subtitle" htmlFor="title">Enlace
                          <input
                            type="text"
                            name="ruta"
                            id="url"
                            className="input"
                            placeholder="URL"
                            value={fileData.ruta}
                            onChange={handleChange}
                          />
                        </label>
                      )
                      : (
                        <label className="d-block subtitle" htmlFor="title">Archivo
                          <FileInput
                            inputId="recurso"
                            fileName={fileLoading ? 'Cargando...' : fileData.ruta.split('resources/')[1]}
                            onSave={handleSaveFile}
                          // onDelete={handleDeleteFile}
                          />
                        </label>

                      )
                  }
                  <small className="text-sm text--theme-error">{errors.ruta}</small>
                </Col>
                <Col md={12}>
                  <label className="d-block subtitle" htmlFor="linkVideo">
                    {
                      typeFile === 'link'
                        ? 'Nombre del enlace'
                        : 'Nombre del archivo'
                    }
                    <input
                      type="text"
                      name="nombre"
                      id="linkVideo"
                      className="input"
                      placeholder="Título"
                      value={fileData.nombre}
                      onChange={handleChange}
                    />
                  </label>
                  <small className="text-sm text--theme-error">{errors.nombre}</small>
                </Col>
                <Col md={12}>
                  <label className="d-block subtitle" htmlFor="description">Descripción
                    <textarea
                      type="text"
                      name="descripcion"
                      id="description"
                      className={`${styles.textarea} input`}
                      placeholder="Hasta 250 caracteres"
                      rows={3}
                      maxLength={250}
                      required
                      value={fileData.descripcion}
                      onChange={handleChange}
                    />
                  </label>
                  <small className="text-sm text--theme-error">{errors.descripcion}</small>
                </Col>
              </Row>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <button className="button button--theme-secondary" onClick={onClose}>
            Descartar
          </button>
          <div>
            <button className="button button--theme-primary" onClick={handleSubmit}>
              Insertar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalAddFileLesson.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  typeFile: PropTypes.string.isRequired,
};

export default ModalAddFileLesson;
