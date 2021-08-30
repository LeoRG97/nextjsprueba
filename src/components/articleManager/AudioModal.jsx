import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import styles from './editor.module.css';

const AudioModalComponent = (props) => {
  const { show, onHide, evento } = props;
  return (
    <div>
      <Modal
        onHide={() => onHide}
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Incrustar audio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.modalBodyText}>
            Enlace
          </div>
          <input
            type="text"
            id="modal-input"
            className="input"
            placeholder="Link del audio o código de incrustación"
          />
          <div className={styles.modalBodyText}>
            <span className={styles.modalBodyTextSpan}>
              <small>Puedes incrustar videos desde: Spotify o Tidal.</small>
            </span>
          </div>
          <div className={styles.modalBodyText}>
            <span className={styles.modalBodyTextSpan}>
              <small id="modal-mensaje" className="text-color-error" />
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="button button--theme-secondary" onClick={() => onHide()}>
            Cancelar
          </button>
          <button className="button button--theme-primary" onClick={() => evento()}>Incrustar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

AudioModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  evento: PropTypes.func.isRequired,
};

export default AudioModalComponent;
