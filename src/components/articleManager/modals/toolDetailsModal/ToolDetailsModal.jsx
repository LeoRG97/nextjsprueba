import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'react-bootstrap';
import useSWR from 'swr';
import styles from '../detailsModal/detailsModal.module.css';
import ImagePicker from '../../../formComponents/imagePicker/ImagePicker';
import Switch from '@/components/switch/Switch';
import { ToolContext } from '@/helpers/contexts/toolContext';
import { toolValidation } from './toolValidation';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';

const ToolDetailsModal = ({
  show, onClose, onPublish, contentType,
}) => {
  const {
    formData, setFormData, errors, setErrors,
  } = useContext(ToolContext);
  const [submitted, setSubmitted] = useState(false);

  const { data: toolsCategories } = useSWR(ApiRoutes.ToolsCategories, fetchData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    let currentCategory = '';
    if (e.target.value) {
      currentCategory = toolsCategories.data.find((cat) => cat._id === e.target.value);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      categoria: currentCategory.nombre,
    });
  };

  const handleSwitch = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleCoverChange = async (file) => {
    setFormData({ ...formData, portada: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errorObj = toolValidation(formData);
    if (!errorObj.isValid) {
      setErrors(errorObj);
    } else {
      onPublish();
    }
  };

  useEffect(() => {
    if (submitted) {
      setErrors(toolValidation(formData));
    }
  }, [formData]);

  useEffect(() => {
    // en caso de que la herramienta sea un "diagnóstico", se asignará automáticamente
    // la siguiente categoría a los datos del formulario
    if (toolsCategories && contentType === 'diagnostic') {
      const category = toolsCategories.data.find((cat) => cat.nombre === 'Diagnosticar');
      setFormData({
        ...formData,
        categoria_id: category._id,
        categoria: category.nombre,
      });
    }
  }, [contentType, toolsCategories]);

  const {
    nombre,
    creditos,
    portada,
    categoria_id,
    objetivo,
    premium,
    url_imagen,
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
              <h6 className="d-block subtitle">Imagen de portada</h6>
              <div className={styles.imageInput}>
                <ImagePicker
                  image={portada}
                  setImage={handleCoverChange}
                  prevUrl={url_imagen}
                  resizeType="large"
                />
              </div>
              <span className="text-sm text--theme-error">{errors.portada}</span>
              <label className="d-block subtitle" htmlFor="name">Nombre
                <input
                  type="text"
                  name="nombre"
                  id="name"
                  className="input"
                  placeholder="Nombre de la herramienta utilizada"
                  value={nombre}
                  onChange={handleChange}
                />
              </label>
              <span className="text-sm text--theme-error">{errors.nombre}</span>
            </Col>
            <Col md={6}>

              <h3 className="title mb-3">Visibilidad</h3>
              <div className={styles.switchContainer}>
                <label className="subtitle">Contenido exclusivo</label>
                <Switch
                  name="premium"
                  checked={premium}
                  onChange={handleSwitch}
                />
              </div>
              <label className="subtitle w-100">Propósito
                <select
                  id="rol"
                  name="categoria_id"
                  placeholder="Selecciona uno"
                  className="select"
                  value={categoria_id}
                  onChange={handleSelect}
                >
                  {/* <option value="">Selecciona uno</option> */}
                  {toolsCategories && toolsCategories.data.map((item) => {
                    if (contentType === 'diagnostic' && item.nombre !== 'Diagnosticar') {
                      return null;
                    }
                    if (contentType === 'tool' && item.nombre === 'Diagnosticar') {
                      return null;
                    }
                    return (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    );
                  })}
                </select>
              </label>
              <span className="text-sm text--theme-error">{errors.categoria}</span>

              <label className="d-block subtitle" htmlFor="achieve">Forma de lograrlo
                <input
                  type="text"
                  name="objetivo"
                  id="achieve"
                  className="input"
                  placeholder="Ejemplo: Aprendiendo de mis experiencias"
                  value={objetivo}
                  onChange={handleChange}
                />
              </label>
              <span className="text-sm text--theme-error">{errors.objetivo}</span>
              <label className="d-block subtitle" htmlFor="credits">Créditos
                <input
                  type="text"
                  name="creditos"
                  id="credits"
                  className="input"
                  placeholder="Inspirado en..."
                  value={creditos}
                  onChange={handleChange}
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
            <button className="button button--theme-primary" onClick={handleSubmit}>
              <span className="button__icon-left text--theme-light">H</span>{' '}Publicar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ToolDetailsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
};

export default ToolDetailsModal;
