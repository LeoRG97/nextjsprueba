import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import styles from './modalsIndicator.module.css';

const LoadingIndicatorModal = ({
  show,
  onClose,
  textHeader,
  textBody,
}) => {
  return (
    <>
      <Modal show={show} size="md" centered onHide={() => onClose()}>
        <Modal.Body className={styles.container}>
          <div className="row d-flex justify-content-center">
            <LoadingIndicator />
          </div>
          <div className="row mt-3">
            <h1 className="title mt-3">{textHeader}</h1>
          </div>
          <div className="row justify-content-md-center mt-2">
            <div className="col-10">
              <p className="text-sm">{textBody}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

LoadingIndicatorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoadingIndicatorModal;
