import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'react-bootstrap';
import styles from './detailsModal.module.css';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';
import ModalAddFileLesson from './ModalAddFile';
import { validateLessonData } from './lessonValidation';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import LessonResources from './lessonResource/LessonResources';
import DeleteModal from '@/components/modalsIndicators/DeleteModal';

const ModalDetailsLesson = ({ show, onClose }) => {
  const [modalFileLessonShow, setModalFileLessonShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [typeFile, setTypeFile] = useState('');
  const [resourceEdit, setResourceEdit] = useState({});
  const [deletedResources, setDeletedResources] = useState([]);

  const [formData, setFormData] = useState({
    nombre: '',
    video: '',
    descripcion: '',
  });
  const [resources, setResources] = useState([]);

  const {
    currentUnit,
    currentLesson,
    handleAddLesson,
    handleUpdateLesson,
    setShowLessonModal,
    addDeletedResources,
  } = useContext(CourseContext);

  const showFile = (type) => {
    // abrir modal de archivo para añadir uno nuevo
    setTypeFile(type);
    setModalFileLessonShow(true);
    setShowLessonModal(false);
  };

  const showEditFile = (id) => {
    // abrir modal de archivo para editar un recurso
    const selected = resources.find((r) => r._id === id);
    setResourceEdit(selected);
    setTypeFile(selected.tipo);
    setModalFileLessonShow(true);
    setShowLessonModal(false);
  };

  const hideFile = () => {
    // ocultar el modal de archivo y reiniciar los estados que intervienen
    setModalFileLessonShow(false);
    setShowLessonModal(true);
    setTimeout(() => {
      setResourceEdit({});
      setTypeFile('');
    }, 100);
  };

  const [errors, setErrors] = useState({ isValid: true });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const errorData = validateLessonData(formData);
      setErrors(errorData);
    }
  }, [formData, submitted]);

  const resetForm = () => {
    setSubmitted(false);
    setErrors({ isValid: true });
    setFormData({
      nombre: '',
      video: '',
      descripcion: '',
      _id: '',
    });
    setResources([]);
  };

  useEffect(() => {
    if (currentLesson._id) {
      setFormData({ ...currentLesson });
      setResources([...currentLesson.recursos]);
      setErrors({ isValid: true });
      setSubmitted(false);
    }
  }, [currentLesson]);

  useEffect(() => {
    if (!currentLesson._id) {
      resetForm();
    }
  }, [currentUnit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddResource = (item) => {
    setResources([...resources, item]);
    hideFile();
  };

  const handleUpdateResource = (item) => {
    // actualiza el arreglo de recursos después de modificar un elemento
    const prevItem = resources.find((r) => r._id === item._id);
    if (item.tipo === 'file' && prevItem.ruta !== item.ruta) {
      setDeletedResources([...deletedResources, prevItem.ruta]);
    }
    const updatedArray = resources.map((r) => (r._id === item._id ? item : r));
    setResources([...updatedArray]);
    hideFile();
  };

  const handleAlert = (id) => {
    setShowDeleteModal(true);
    const selected = resources.find((r) => r._id === id);
    setResourceEdit(selected);
  };

  const handleCloseAlert = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteResource = () => {
    // actualiza el arreglo de recursos después de eliminar uno
    const updatedArray = resources.filter((r) => r._id !== resourceEdit._id);
    if (resourceEdit.tipo === 'file') {
      setDeletedResources([...deletedResources, resourceEdit.ruta]);
    }
    setResources([...updatedArray]);
    handleCloseAlert();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const errorData = validateLessonData(formData);
    if (!errorData.isValid) {
      setErrors(errorData);
    } else {
      if (!currentLesson._id) {
        handleAddLesson({ ...formData, recursos: resources }, currentUnit);
      } else {
        handleUpdateLesson({ ...formData, recursos: resources });
      }
      addDeletedResources(deletedResources);
      onClose();
      resetForm();
    }
  };

  const { nombre, video, descripcion } = formData;

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
                      name="nombre"
                      id="title"
                      className="input"
                      placeholder="Título"
                      value={nombre}
                      onChange={handleChange}
                    />
                  </label>
                  <small className="text-sm text--theme-error">{errors.nombre}</small>
                </Col>
                <Col md={6}>
                  <label className="d-block subtitle" htmlFor="linkVideo">Video
                    <input
                      type="text"
                      name="video"
                      id="linkVideo"
                      className="input"
                      placeholder="Código de incrustación (iframe)"
                      value={video}
                      onChange={handleChange}
                    />
                  </label>
                  <small className="text-sm text--theme-error">{errors.video}</small>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={12}>
                  <label className="d-block subtitle" htmlFor="description">Descripción
                    <textarea
                      type="text"
                      name="descripcion"
                      id="description"
                      className={`${styles.textarea} input`}
                      placeholder="Hasta 1000 caracteres"
                      rows={3}
                      maxLength={1000}
                      required
                      value={descripcion}
                      onChange={handleChange}
                    />
                  </label>
                  <small className="text-sm text--theme-error">{errors.descripcion}</small>
                </Col>
              </Row>
            </Col>
            <Col md={12} className="mt-4">
              <h3 className="title mb-3">Recursos adicionales</h3>
            </Col>
            <Col md={12} className="">
              <>
                <LessonResources
                  resources={resources}
                  onEdit={showEditFile}
                  onDelete={handleAlert}
                />
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
              </>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <button className="button button--theme-secondary" onClick={onClose}>
            Cancelar
          </button>
          <div>
            <button className="button button--theme-primary" onClick={handleSubmit}>
              {currentLesson._id ? 'Actualizar lección' : 'Crear lección'}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <ModalAddFileLesson
        show={modalFileLessonShow}
        onClose={hideFile}
        onSubmit={handleAddResource}
        typeFile={typeFile} // si es un enlace o un archivo
        initialData={resourceEdit}
        onUpdate={handleUpdateResource}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={handleCloseAlert}
        functionDelete={handleDeleteResource}
        btnConfirm="Confirmar"
        btnCancel="Cancelar"
        textHeader="Alerta"
        textBody={`¿Estás seguro de eliminar el recurso "${resourceEdit.nombre}"?`}
      />
    </>
  );
};

ModalDetailsLesson.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalDetailsLesson;
