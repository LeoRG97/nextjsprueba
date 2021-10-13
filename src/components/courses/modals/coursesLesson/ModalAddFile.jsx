import React from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'react-bootstrap';
import styles from './detailsModal.module.css';
import { FileInput } from '@/components';

const ModalAddFileLesson = ({ show, onClose, typeFile }) => {
  const onSave = (fileData, inputId) => {
    // eslint-disable-next-line no-console
    console.log(fileData, inputId);
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
                            name="title"
                            id="title"
                            className="input"
                            placeholder="URL"
                          />
                        </label>
                      )
                      : (
                        <label className="d-block subtitle" htmlFor="title">Archivo
                          <FileInput
                            onSave={onSave}
                            type="text"
                            name="title"
                            id="title"
                            className="input"
                            placeholder="Añadir archivo"
                          />
                        </label>
                      )
                  }

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
                      name="linkVideo"
                      id="linkVideo"
                      className="input"
                      placeholder="Título"
                    />
                  </label>
                </Col>
                <Col md={12}>
                  <label className="d-block subtitle" htmlFor="description">Descripción
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      className={`${styles.textarea} input`}
                      placeholder="Hasta 250 caracteres"
                      rows={3}
                      maxLength={250}
                      required
                    />
                  </label>
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
            <button className="button button--theme-primary">
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
  typeFile: PropTypes.string.isRequired,
};

export default ModalAddFileLesson;
