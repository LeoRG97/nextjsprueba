import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToolContext } from '@/helpers/contexts/toolContext';
import styles from '../diagnosticModals.module.css';
import { validateAnswerForm } from '../diagnosticModalsValidation';

const AnswerModal = ({ show, onClose }) => {
  const { handleAddNewAnswer, answerEdit, handleUpdateAnswer } = useContext(ToolContext);

  const [formData, setFormData] = useState({
    valor: '',
    puntaje: 0,
  });
  const [errors, setErrors] = useState({ isValid: true });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      valor: '',
      puntaje: 0,
    });
    setErrors({ isValid: true });
    setSubmitted(false);
  };

  useEffect(() => {
    if (submitted) {
      const formErrors = validateAnswerForm(formData);
      setErrors(formErrors);
    }
  }, [formData]);

  useEffect(() => {
    if (answerEdit) {
      setFormData(answerEdit);
    }
  }, [answerEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const formErrors = validateAnswerForm(formData);
    if (!formErrors.isValid) {
      setErrors(formErrors);
    } else {
      if (!answerEdit) {
        handleAddNewAnswer(formData);
      } else {
        handleUpdateAnswer(answerEdit._id, formData);
      }
      onClose();
      resetForm();
    }
  };

  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  const { valor, puntaje } = formData;

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
            <h2 className="title text-center">{answerEdit ? 'Actualizar respuesta' : 'Nueva respuesta'}</h2>
            <label htmlFor="textValue" className="d-block subtitle">
              Título
              <textarea
                id="textValue"
                name="valor"
                className={`input ${styles.description}`}
                value={valor}
                onChange={handleChange}
              />
            </label>
            <small className="text-sm text--theme-error">{errors.valor}</small>
            <label htmlFor="score" className="subtitle w-100">Puntaje
              <input
                type="number"
                id="score"
                name="puntaje"
                className="input"
                value={puntaje}
                placeholder="De 0 a 100 puntos"
                onChange={handleChange}
              />
            </label>
            <small className="text-sm text--theme-error">{errors.puntaje}</small>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <button className="button button--theme-secondary" onClick={handleCloseModal} type="button">
              Descartar
            </button>
            <button className="button button--theme-primary" type="submit">
              {answerEdit ? 'Actualizar' : 'Insertar'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AnswerModal;
