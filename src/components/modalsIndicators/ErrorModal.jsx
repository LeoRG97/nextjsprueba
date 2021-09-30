import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './modalsIndicator.module.css';

const ErrorIndicatorModal = ({
  show,
  onClose,
  textHeader,
  textBody,
}) => {
  return (
    <>
      <Modal show={show} size="md" centered onHide={onClose}>
        <Modal.Body className={styles.container}>
          <div className="d-flex justify-content-center">
            <div className={styles.container_icon_error}>
              <span className="icon icon-modal--error">O</span>
            </div>
          </div>
          <div className="row mt-3">
            <h1 className="title mt-3">{textHeader}</h1>
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-10">
              <p className="text-sm">{textBody}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

ErrorIndicatorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorIndicatorModal;
