import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './courseSpecific.module.css';

const ModalInfo = ({
  show,
  onClose,
}) => {
  return (
    <>
      <Modal show={show} size="md" centered>
        <Modal.Body className={styles.containerModal}>
          <div className="row mt-2 mb-3 justify-content-md-center">
            <div className="col-12 col-md-10">
              <h1 className="title text-start mt-3">Alerta</h1>
            </div>
            <div className="col-12 col-md-10">
              <p className="text-sm text-start">Este curso no contiene lecciones para visualizar</p>
            </div>
            <div className="col-12 col-md-10">
              <div className="row justify-content-md-end mt-3">
                <div className="col-6 col-md-auto">
                  <button className="button button--theme-primary" onClick={() => onClose()} type="submit">
                    Aceptar
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

ModalInfo.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalInfo;
