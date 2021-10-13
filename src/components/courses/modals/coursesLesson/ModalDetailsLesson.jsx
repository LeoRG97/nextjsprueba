import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'react-bootstrap';
import styles from './detailsModal.module.css';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';
import ModalAddFileLesson from './ModalAddFile';

const ModalDetailsLesson = ({ show, onClose }) => {
  const [modalFileLessonShow, setModalFileLessonShow] = useState(false);
  const [typeFile, setTypeFile] = useState(false);
  const showFile = (type) => {
    setTypeFile(type);
    setModalFileLessonShow(true);
    onClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        centered
        size="lg"
        dialogClassName={styles.modalWidth}
        contentClassName={styles.modalContainer}
      >
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h3 className="title">Detalles de la lección</h3>
              <Row>
                <Col md={6}>
                  <label className="d-block subtitle" htmlFor="title">Título de la lección
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="input"
                      placeholder="Título"
                    />
                  </label>
                </Col>
                <Col md={6}>
                  <label className="d-block subtitle" htmlFor="linkVideo">Video
                    <input
                      type="text"
                      name="linkVideo"
                      id="linkVideo"
                      className="input"
                      placeholder="URL"
                    />
                  </label>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={12}>
                  <label className="d-block subtitle" htmlFor="description">Descripción
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      className={`${styles.textarea} input`}
                      placeholder="Hasta 1000 caracteres"
                      rows={3}
                      maxLength={1000}
                      required
                    />
                  </label>
                </Col>
              </Row>
            </Col>
            <Col md={12} className="mt-4">
              <h3 className="title mb-3">Recursos adicionales</h3>
            </Col>
            <Col md={12} className="">
              <div className={styles.tools}>
                <section>
                  <div className={`${styles.files} text-md`}>Insertar</div>
                </section>
                <section>
                  <TooltipContainer placement="top" tooltipText="Archivo">
                    <div
                      className={`icon ${styles.tools_media}`}
                      onClick={() => showFile('file')}
                    >q
                    </div>
                  </TooltipContainer>
                  <TooltipContainer placement="top" tooltipText="Enlace">
                    <div
                      className={`icon ${styles.tools_media}`}
                      onClick={() => showFile('link')}
                    >l
                    </div>
                  </TooltipContainer>
                </section>
              </div>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <button className="button button--theme-secondary" onClick={onClose}>
            Cancelar
          </button>
          <div>
            <button className="button button--theme-primary">
              Crear lección
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <ModalAddFileLesson
        show={modalFileLessonShow}
        onClose={() => setModalFileLessonShow(false)}
        typeFile={typeFile} // si es un enlace o un archivo
      />
    </>
  );
};

ModalDetailsLesson.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalDetailsLesson;
