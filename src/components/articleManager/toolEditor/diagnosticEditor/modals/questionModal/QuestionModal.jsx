import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToolContext } from '@/helpers/contexts/toolContext';
import styles from './questionModal.module.css';
import { validateQuestionModal } from '../diagnosticModalsValidation';

const QuestionModal = ({ show, onClose }) => {
  const { handleAddNewQuestion } = useContext(ToolContext);

  const [formData, setFormData] = useState({
    pregunta: '',
    tipo: '',
  });
  const [errors, setErrors] = useState({ isValid: true });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      pregunta: '',
      tipo: '',
    });
    setErrors({ isValid: true });
    setSubmitted(false);
  };

  useEffect(() => {
    if (submitted) {
      const formErrors = validateQuestionModal(formData);
      setErrors(formErrors);
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateQuestionModal(formData);
    if (!formErrors.isValid) {
      setErrors(formErrors);
    } else {
      handleAddNewQuestion(formData);
      onClose();
      resetForm();
    }
  };

  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  const { pregunta, tipo } = formData;

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
            <h2 className="title text-center">Nueva pregunta</h2>
            <label htmlFor="title" className="d-block subtitle">
              Título
              <textarea
                id="title"
                name="pregunta"
                className={`input ${styles.description}`}
                value={pregunta}
                onChange={handleChange}
              />
            </label>
            <small className="text-sm text--theme-error">{errors.pregunta}</small>
            <label htmlFor="questionType" className="subtitle w-100">Tipo de pregunta
              <div className="select-arrow">
                <select
                  id="questionType"
                  name="tipo"
                  placeholder="Selecciona uno"
                  className="select"
                  value={tipo}
                  onChange={handleChange}
                >
                  <option value="">Selecciona uno</option>
                  <option value="unica">Única</option>
                  <option value="multiple">Múltiple</option>
                </select>
              </div>
            </label>
            <small className="text-sm text--theme-error">{errors.tipo}</small>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <button className="button button--theme-secondary" onClick={handleCloseModal} type="button">
              Descartar
            </button>
            <div>
              <button className="button button--theme-primary" type="submit">
                Insertar
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default QuestionModal;
