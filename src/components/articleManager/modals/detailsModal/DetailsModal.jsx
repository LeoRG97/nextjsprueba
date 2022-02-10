import { Col, Modal, Row } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './detailsModal.module.css';
import { getPreferencesService } from '@/services/preferences';
import CategorySelector from '@/components/categorySelector/CategorySelector';
import ImagePicker from '../../../formComponents/imagePicker/ImagePicker';
import Switch from '@/components/switch/Switch';
import { detailsValidation } from './detailsModalValidation';

import { EditorContext } from '@/helpers/contexts/editorContext';

const DetailsModal = ({ show, onClose, onPublish }) => {
  const [preferences, setPreferences] = useState([]);
  const {
    formData, setFormData, errors, setErrors,
  } = useContext(EditorContext);

  const [submitted, setSubmitted] = useState(false);

  const revalidateCurrentData = async () => {
    const currentData = JSON.parse(localStorage.getItem('storedData'));
    if (currentData) {
      const { portada } = currentData;
      setFormData((data) => ({
        ...data,
        titulo: portada ? portada.titulo : '',
        descripcion: portada ? portada.descripcion : '',
        destacado: currentData.destacado || false,
        premium: currentData.premium || false,
      }));
    }
  };

  useEffect(() => {
    getPreferencesService().then((res) => {
      setPreferences(res.data);
      revalidateCurrentData();
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitch = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleCoverChange = async (file) => {
    setFormData({ ...formData, portada: file });
  };

  const handleAddCategory = (newItem) => {
    const { categorias } = formData;
    const newCategories = [...categorias, newItem];
    setFormData({ ...formData, categorias: newCategories });
  };

  const handleDeleteCategory = (removedItem) => {
    const { categorias } = formData;
    const newCategories = categorias.filter((item) => item !== removedItem);
    setFormData({ ...formData, categorias: newCategories });
  };

  useEffect(() => {
    if (submitted) {
      const errorObj = detailsValidation(formData);
      setErrors(errorObj);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errorObj = detailsValidation(formData);
    if (!errorObj.isValid) {
      setErrors(errorObj);
    } else {
      onPublish('publicado');
    }
  };

  const handleDraft = async (e) => {
    e.preventDefault();
    onPublish('borrador');
  };

  const {
    titulo, descripcion, portada, destacado, premium, categorias, rutaPortada,
  } = formData;

  return (
    <div>
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
              <h3 className="title">Detalles de la publicación</h3>
              <span className="d-block subtitle">Imagen de portada</span>
              <div className={styles.imageInput}>
                <ImagePicker
                  image={portada}
                  setImage={handleCoverChange}
                  prevUrl={rutaPortada}
                  resizeType="large"
                />
              </div>
              <span className="text-sm text--theme-error">{errors.portada}</span>
              <label className="d-block subtitle" htmlFor="title">Título de la publicación
                <input
                  type="text"
                  name="titulo"
                  id="title"
                  className="input"
                  placeholder="Título"
                  value={titulo}
                  onChange={handleChange}
                />
              </label>
              <span className="text-sm text--theme-error">{errors.titulo}</span>
            </Col>
            <Col md={6}>
              <div className={styles.visibilitySection}>
                <h3 className="title mb-2">Visibilidad</h3>
                <small className="text-sm text--theme-error">
                  {errors.premium}
                </small>
                <div className={styles.switchContainer}>
                  <label className="subtitle">Destacar publicación</label>
                  <Switch
                    name="destacado"
                    checked={destacado}
                    onChange={handleSwitch}
                  />
                </div>
                <div className={styles.switchContainer}>
                  <label className="subtitle">Contenido exclusivo</label>
                  <Switch
                    name="premium"
                    checked={premium}
                    onChange={handleSwitch}
                  />
                </div>

                <label className="d-block subtitle">Categoría(s) a la que pertenece</label>
                <CategorySelector
                  data={preferences}
                  placeholder="Selecciona las categorías"
                  initialSelectedItems={categorias}
                  addCategory={handleAddCategory}
                  deleteCategory={handleDeleteCategory}
                />
                <span className="text-sm text--theme-error">{errors.categorias}</span>
              </div>
              <label className="d-block subtitle" htmlFor="description">Descripción
                <textarea
                  type="text"
                  name="descripcion"
                  id="description"
                  className={`input ${styles.descriptionInput}`}
                  placeholder="Hasta 250 caracteres"
                  value={descripcion}
                  onChange={handleChange}
                  maxLength="250"
                />
              </label>
              <span className="text-sm text--theme-error">{errors.descripcion}</span>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <button className="button button--theme-secondary" onClick={onClose}>
            Cancelar
          </button>
          <div>
            <button className="button button--theme-success me-3" onClick={handleDraft}>
              <span className="button__icon-left text--theme-light">I</span>{' '}Guardar borrador
            </button>
            <button className="button button--theme-primary" onClick={handleSubmit}>
              <span className="button__icon-left text--theme-light">H</span>{' '}Publicar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

DetailsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
};

export default DetailsModal;
