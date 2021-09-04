import React from 'react';
import { Modal } from 'react-bootstrap';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import styles from './loadingModal.module.css';

const LoadingModal = ({ show }) => {
  return (
    <>
      <Modal show={show} size="sm" centered>
        <Modal.Body className={styles.container}>
          <LoadingIndicator />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoadingModal;
