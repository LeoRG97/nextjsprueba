import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToolContext } from '@/helpers/contexts/toolContext';
import styles from '../diagnosticModals.module.css';
import { validateEmail } from '@/helpers/validateEmail';

const EmailModal = ({
  show, onClose, onSubmit, saveMode,
}) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ isValid: true });
  const [submitted, setSubmitted] = useState(false);

  const { formData, setFormData } = useContext(ToolContext);

  const resetForm = () => {
    setErrors({ isValid: true });
    setSubmitted(false);
  };

  useEffect(() => {
    // inicializar formulario con email que se almacenó en BD
    setEmail(formData.emailDestinatario);
  }, [formData.emailDestinatario]);

  useEffect(() => {
    if (submitted) {
      const isValid = validateEmail(email);
      setErrors({
        isValid,
        email: !isValid ? 'Introduce una dirección de correo válida' : '',
      });
    }
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (saveMode === 'publish') {
      setSubmitted(true);
      if (!validateEmail(email)) {
        setErrors({ isValid: false, email: 'Introduce una dirección de correo válida' });
      } else {
        onSubmit(email);
      }
    } else {
      setFormData({ ...formData, emailDestinatario: email });
      onClose();
    }
  };

  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        size="md"
        backdrop="static"
        centered
        contentClassName={styles.modalContainer}
      >
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <h2 className="title text-center">Enviar resultados de los usuarios a...</h2>
            <label htmlFor="score" className="subtitle w-100">Correo electrónico
              <input
                type="email"
                id="score"
                name="puntaje"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <small className="text-sm text--theme-error">{errors.email}</small>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <button className="button button--theme-secondary" onClick={handleCloseModal} type="button">
              Descartar
            </button>
            <button className="button button--theme-primary" type="submit">
              {saveMode === 'submit' ? 'Finalizar' : 'Guardar cambios'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EmailModal;
