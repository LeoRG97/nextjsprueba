import { Col, Modal, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import styles from './detailsModal.module.css';
import { getPreferencesService } from '@/services/preferences';
import CategorySelector from '@/components/categorySelector/CategorySelector';
import ImagePicker from './imagePicker/ImagePicker';
import FileInput from './fileInput/FileInput';
import { detailsValidation } from './detailsModalValidation';

const DetailsModal = ({ show, onClose }) => {
  const [preferences, setPreferences] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    portada: '',
    videoUrl: '',
  });
  const [errors, setErrors] = useState({
    isValid: true,
  });
  const [categorias, setCategorias] = useState([]);
  const [reportFile, setReportFile] = useState(null);
  const [infographic, setInfographic] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getPreferencesService().then((res) => {
      setPreferences(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCoverChange = async (file) => {
    setFormData({ ...formData, portada: file });
  };

  const handleAddCategory = (newItem) => {
    setCategorias((items) => [...items, newItem]);
  };

  const handleDeleteCategory = (removedItem) => {
    setCategorias((items) => items.filter((item) => item !== removedItem));
  };

  useEffect(() => {
    if (submitted) {
      const errorObj = detailsValidation(formData, categorias, reportFile, infographic);
      setErrors(errorObj);
    }
  }, [formData, categorias, reportFile, infographic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errorObj = detailsValidation(formData, categorias, reportFile, infographic);
    if (!errorObj.isValid) {
      setErrors(errorObj);
    }
  };

  const {
    titulo, descripcion, portada, videoUrl,
  } = formData;

  return (
    <div>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        centered
        size="lg"
        contentClassName={styles.modalContainer}
      >
        <Modal.Body>
          <h3 className="title">Detalles de la publicación</h3>
          <Row>
            <Col md={6}>
              <span className="d-block subtitle">Imagen de portada</span>
              <ImagePicker
                image={portada}
                setImage={handleCoverChange}
              />
              <span className="text-sm text--theme-error">{errors.portada}</span>
            </Col>
            <Col md={6}>
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
              <label className="d-block subtitle">Categoría(s) a la que pertenece</label>
              <CategorySelector
                data={preferences}
                placeholder="Selecciona las categorías"
                initialSelectedItems={categorias}
                addCategory={handleAddCategory}
                deleteCategory={handleDeleteCategory}
              />
              <span className="text-sm text--theme-error">{errors.categorias}</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <h3 className="title mb-3">Otras opciones de visualización</h3>
            <Col md={3}>
              <span className="subtitle">Reporte</span>
              <FileInput
                id="report"
                file={reportFile}
                setFile={setReportFile}
                setErrors={setErrors}
              />
              <span className="text-sm text--theme-error">{errors.reporte}</span>
            </Col>
            <Col md={3}>
              <span className="subtitle">Infografía</span>
              <FileInput
                id="infographic"
                file={infographic}
                setFile={setInfographic}
              />
            </Col>
            <Col md={6}>
              <label className="subtitle" htmlFor="videoUrl">Video</label>
              <input
                type="url"
                name="videoUrl"
                id="videoUrl"
                className="input"
                placeholder="URL"
                value={videoUrl}
                onChange={handleChange}
              />
              <span className="text-sm text--theme-error">{errors.videoUrl}</span>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <button className="button button--theme-secondary" onClick={onClose}>
            Cancelar
          </button>
          <div>
            <button className="button button--theme-success me-3">
              <span className="button__icon text--theme-light">I</span> Guardar borrador
            </button>
            <button className="button button--theme-primary" onClick={handleSubmit}>
              <span className="button__icon text--theme-light">H</span> Publicar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default DetailsModal;
