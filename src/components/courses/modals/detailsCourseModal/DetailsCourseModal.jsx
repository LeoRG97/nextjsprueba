import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'react-bootstrap';
import styles from './detailsCourseModal.module.css';
import { Switch } from '@/components';
import CategorySelector from '@/components/categorySelector/CategorySelector';
import { getPreferencesService } from '@/services/preferences';
import ImagePicker from '@/components/formComponents/imagePicker/ImagePicker';

const ModalDetailsCourse = ({ show, onClose }) => {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    getPreferencesService().then((res) => {
      setPreferences(res.data);
    });
  }, []);

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
            <Col md={6}>
              <h3 className="title">Detalles del curso</h3>
              <span className="d-block subtitle">Imagen de portada</span>
              <div className={styles.imageInput}>
                <ImagePicker />
              </div>
              <label className="d-block subtitle" htmlFor="title">Título del curso
                <input
                  type="text"
                  name="titulo"
                  id="title"
                  className="input"
                  placeholder="Título"
                />
              </label>
              <label className="d-block subtitle" htmlFor="url">Video de presentación
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="input"
                  placeholder="URL"
                />
              </label>
              <label className="d-block subtitle" htmlFor="title">Duración aproximada del curso
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="input"
                  placeholder="Ejemplo: 4 horas"
                />
              </label>
            </Col>
            <Col md={6}>
              <div className={styles.visibilitySection}>
                <h3 className="title mb-3">Visibilidad</h3>
                <div className={styles.switchContainer}>
                  <label className="subtitle">Contenido exclusivo</label>
                  <Switch
                    name="premium"
                    checked={false}
                    onChange={() => true}
                  />
                </div>
                <label className="d-block subtitle">Categoría(s) a la que pertenece</label>
                <CategorySelector
                  data={preferences}
                  placeholder="Selecciona las categorías"
                  initialSelectedItems={[]}
                  addCategory={() => false}
                  deleteCategory={() => false}
                />
              </div>
              <label className="d-block subtitle" htmlFor="title">Certificado
                <div className=" input-container">
                  <input
                    type="text"
                    name="url"
                    id="url"
                    className="input"
                    placeholder="Añadir archivo del certificado"
                  />
                  <span className="icon input__icon">Ñ</span>
                </div>
              </label>
              <label className="d-block subtitle" htmlFor="title">Objetivo del curso
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="input"
                  placeholder="Objetivo"
                />
              </label>
              <label className="d-block subtitle" htmlFor="description">Descripción
                <textarea
                  type="text"
                  name="descripcion"
                  id="description"
                  className={`input ${styles.textarea}`}
                  placeholder="Hasta 250 caracteres"
                  maxLength="250"
                  rows={4}
                />
              </label>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <button className="button button--theme-secondary" onClick={onClose}>
            Cancelar
          </button>
          <div>
            <button className="button button--theme-success me-3">
              <span className="button__icon-left text--theme-light">I</span>{' '}Guardar borrador
            </button>
            <button className="button button--theme-primary">
              <span className="button__icon-left text--theme-light">H</span>{' '}Publicar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalDetailsCourse.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalDetailsCourse;
