import React, { useState } from 'react';
import { Modal, Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './modalsIndicator.module.css';

const SocialShareModal = ({
  show,
  onClose,
  currentUrl,
  title,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopySuccess(true);
  };
  // eslint-disable-next-line no-console

  const urlTwitter = currentUrl.slice(8);

  return (
    <>
      <Modal show={show} size="md" centered onHide={onClose}>
        <Modal.Body className={styles.container}>
          <div className="row justify-content-md-center">
            <div className="col-auto">
              <h1 className="title">Compartir en...</h1>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <Toast onClose={() => setCopySuccess(false)} show={copySuccess} delay={3000} bg="Copied" autohide>
              <Toast.Body>URL copiada en el portapapeles</Toast.Body>
            </Toast>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-auto">
              <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} rel="noreferrer"> <span className="icon icon--theme-highlight icon-modal--md">k</span></a>
            </div>
            <div className="col-auto">
              <a target="_blank" href={`https://twitter.com/intent/tweet?text=${urlTwitter}`} rel="noreferrer"> <span className="icon icon--theme-highlight icon-modal--md">X</span></a>
            </div>
            <div className="col-auto">
              <a target="_blank" href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${title}&summary=&source=${currentUrl}`} rel="noreferrer"> <span className="icon icon--theme-highlight icon--theme-secondary icon-modal--md">M</span></a>
            </div>
            <div className="col-auto">
              <span className="icon icon-modal icon--theme-highlight icon-modal--md portapapeles" onClick={copyToClipboard}>l</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

SocialShareModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SocialShareModal;
