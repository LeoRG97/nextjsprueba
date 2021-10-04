import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './modalsIndicator.module.css';

const DeleteModal = ({
  show,
  onClose,
  functionDelete,
  btnConfirm,
  btnCancel,
  textHeader,
  textBody,
}) => {
  return (
    <>
      <Modal show={show} size="md" centered onHide={() => onClose()}>
        <Modal.Body className={styles.container}>
          <div className="row mt-2 mb-3 justify-content-md-center">
            <div className="col-12 col-md-10">
              <h1 className="title text-start mt-3">{textHeader}</h1>
            </div>
            <div className="col-12 col-md-10">
              <p className="text-sm text-start">{textBody}</p>
            </div>
            <div className="col-12 col-md-10">
              <div className="row justify-content-md-end mt-3">
                <div className="col-6 col-md-auto">
                  <button className="button button--theme-secondary" onClick={() => onClose()} type="submit">
                    {btnCancel}
                  </button>
                </div>
                <div className="col-6 col-md-auto">
                  <button className="button button--theme-primary" onClick={functionDelete} type="submit">
                    {btnConfirm}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteModal;
