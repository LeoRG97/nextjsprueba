import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/client';
import styles from './detailsCourseModal.module.css';
import { FileInput, Switch } from '@/components';
import { getPreferencesService } from '@/services/preferences';
import ImagePicker from '@/components/formComponents/imagePicker/ImagePicker';
import { CourseContext } from '@/helpers/contexts/CourseContext';
import { validateCourseData } from './courseValidation';
import { remove, upload } from '@/services/aws';
import { BUCKET_URL } from '@/global/constants';
import { stringToSlug } from '@/helpers/slugs';

const ModalDetailsCourse = ({ show, onClose, onSubmit }) => {
  const [session] = useSession();
  const [preferences, setPreferences] = useState([]);
  const { course, setCourse } = useContext(CourseContext);
  const [errors, setErrors] = useState({ isValid: true });
  const [submitted, setSubmitted] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  useEffect(() => {
    getPreferencesService().then((res) => {
      setPreferences(res.data);
    });
  }, []);

  useEffect(() => {
    if (submitted) {
      const errorObj = validateCourseData(course);
      setErrors(errorObj);
    }
  }, [course]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleCoverImage = (file) => {
    setCourse({ ...course, archivoPortada: file });
  };

  const handleCategory = (e) => {
    const { value } = e.target;
    setCourse({ ...course, [e.target.name]: value ? [value] : [] });
  };

  const handleSwitch = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.checked });
  };

  const handleSaveFile = async (file) => {
    if (file.type !== 'application/pdf') {
      return setErrors({ ...errors, certificado: 'El tipo del archivo no está permitido' });
    }
    setErrors({ ...errors, certificado: '' });
    setFileLoading(true);
    if (course.certificado) {
      await remove(`${BUCKET_URL}${course.certificado}`);
    }
    const res = await upload(`${session.user.id}/courses/certificates`, file,
      `certificado-${course.titulo ? stringToSlug(course.titulo) : Date.now()}.${file.type.split('/')[1]}`);
    setFileLoading(false);
    if (res.ok) {
      setCourse({ ...course, certificado: res.file.split('.com/')[1] });
    } else {
      setErrors({ ...errors, certificado: 'No ha sido posible subir el archivo' });
    }
    return '';
  };

  const handleDeleteFile = () => {
    setCourse({ ...course, certificado: '', deletedFile: course.certificado });
  };

  const handleEraseFile = async () => {
    if (course.deletedFile) {
      await remove(`${BUCKET_URL}${course.deletedFile}`);
    }
  };

  const handlePublishCourse = async () => {
    setSubmitted(true);
    handleEraseFile();
    const errorObj = validateCourseData(course);
    if (!errorObj.isValid) {
      setErrors(errorObj);
    } else {
      onSubmit('publicado');
    }
  };

  const handleSaveDraft = () => {
    handleEraseFile();
    onSubmit('borrador');
  };

  const {
    titulo,
    url_presentacion,
    categorias,
    duracion,
    objetivo,
    descripcion,
    exclusivo,
    portada,
    archivoPortada,
    certificado,
  } = course;

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
                <ImagePicker
                  image={archivoPortada}
                  setImage={handleCoverImage}
                  prevUrl={portada}
                />
              </div>
              <small className="text-sm text--theme-error">{errors.portada}</small>
              <label className="d-block subtitle" htmlFor="title">Título del curso
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
              <small className="text-sm text--theme-error">{errors.titulo}</small>
              <label className="d-block subtitle" htmlFor="url">Video de presentación
                <input
                  type="text"
                  name="url_presentacion"
                  id="url"
                  className="input"
                  placeholder="Código de incrustación"
                  value={url_presentacion}
                  onChange={handleChange}
                />
              </label>
              <small className="text-sm text--theme-error">{errors.url_presentacion}</small>
              <label className="d-block subtitle" htmlFor="duration">Duración aproximada del curso
                <input
                  type="text"
                  name="duracion"
                  id="duration"
                  className="input"
                  placeholder="Ejemplo: 4 horas"
                  value={duracion}
                  onChange={handleChange}
                />
              </label>
            </Col>
            <Col md={6}>

              <h3 className="title mb-3">Visibilidad</h3>
              <div className={styles.switchContainer}>
                <label className="subtitle">Contenido exclusivo</label>
                <Switch
                  name="exclusivo"
                  checked={exclusivo}
                  onChange={handleSwitch}
                />
              </div>

              <label className="d-block subtitle">Categoría a la que pertenece</label>
              <div className="select-arrow">
                <select
                  id="rol"
                  name="categorias"
                  placeholder="Selecciona uno"
                  className="select"
                  value={categorias[0]}
                  onChange={handleCategory}
                >
                  <option value="">Selecciona uno</option>
                  {preferences && preferences.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <small className="text-sm text--theme-error">{errors.categorias}</small>
              <label className="d-block subtitle" htmlFor="certificado">Certificado</label>
              <FileInput
                inputId="certificado"
                fileName={fileLoading ? 'Cargando...' : certificado.split('certificates/')[1]}
                onSave={handleSaveFile}
                onDelete={handleDeleteFile}
                accept="application/pdf"
              />
              <label className="d-block subtitle" htmlFor="objective">Objetivo del curso
                <input
                  type="text"
                  name="objetivo"
                  id="objective"
                  className="input"
                  placeholder="Objetivo"
                  value={objetivo}
                  onChange={handleChange}
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
                  value={descripcion}
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
            <button className="button button--theme-success me-3" onClick={handleSaveDraft} disabled={fileLoading}>
              <span className="button__icon-left text--theme-light">I</span>{' '}Guardar borrador
            </button>
            <button className="button button--theme-primary" onClick={handlePublishCourse} disabled={fileLoading}>
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
