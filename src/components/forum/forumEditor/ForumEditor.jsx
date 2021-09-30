import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import useSWR, { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/client';
import ImagePicker from '@/components/imagePicker/ImagePicker';
import styles from './forumEditor.module.css';
import { saveForum } from '@/services/forums';
import { ApiRoutes } from '@/global/constants';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '@/components/modalsIndicators/SuccesModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import { forumValidation } from './forumValidation';

const ForumModal = ({ show, onClose }) => {
  const { mutate } = useSWRConfig();
  const { data } = useSWR(ApiRoutes.Forums);
  const [session] = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    archivo: '',
    imagen: '',
    titulo: '',
    url: '',
    descripcion: '',
  });
  const [errors, setErrors] = useState({ isValid: true });

  const {
    archivo,
    imagen,
    titulo,
    url,
    descripcion,
  } = formData;

  const handleCoverChange = (file) => {
    setFormData({ ...formData, archivo: file });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (submitted) {
      const errorObj = forumValidation(formData);
      setErrors(errorObj);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errorObj = forumValidation(formData);
    if (!errorObj.isValid) {
      setErrors(errorObj);
    } else {
      setSubmitting(true);
      onClose();
      const res = await saveForum(formData);
      setSubmitting(false);
      if (res.ok) {
        setShowSuccess(true);
        mutate(ApiRoutes.Forums, {
          ...data,
          data: [...data.data, res.data],
        }, false);
        mutate([ApiRoutes.UserTotals, session.user.id]);
        setSubmitted(false);
        setFormData({
          titulo: '',
          descripcion: '',
          url: '',
          archivo: '',
          imagen: '',
        });
      } else {
        setShowError(true);
      }
    }
  };

  return (
    <>
      <Modal
        show={show}
        centered
        className="d-flex justify-content-center"
        contentClassName={styles.container}
        backdrop="static"
      >
        <Modal.Header className="pb-0">
          <h3 className="title">Detalles del foro</h3>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <h6 className="d-block subtitle">Imagen de portada</h6>
          <div className={styles.imageSize}>
            <ImagePicker
              image={archivo}
              setImage={handleCoverChange}
              prevUrl={imagen}
            />
          </div>
          <span className="text-sm text--theme-error">{errors.archivo}</span>
          <label className="d-block subtitle" htmlFor="title">Título del foro
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
          <label className="d-block subtitle" htmlFor="link">Enlace al foro
            <input
              type="text"
              name="url"
              id="link"
              className="input"
              placeholder="URL"
              value={url}
              onChange={handleChange}
            />
          </label>
          <span className="text-sm text--theme-error">{errors.url}</span>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <button className="button button--theme-secondary" onClick={onClose}>Cancelar</button>
          <button className="button button--theme-primary" onClick={handleSubmit}>
            <span className="button__icon-left text--theme-light">H</span>{' '}Publicar
          </button>
        </Modal.Footer>
      </Modal>
      <LoadingIndicatorModal
        show={submitting}
        onClose={() => setSubmitting(false)}
        textHeader="Guardando cambios"
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        textHeader="Publicación finalizada"
        textBody="La información del foro ha sido publicada correctamente"
      />
      <ErrorIndicatorModal
        show={showError}
        onClose={() => setShowError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Vuelva a intentarlo más tarde"
      />
    </>
  );
};

export default ForumModal;
