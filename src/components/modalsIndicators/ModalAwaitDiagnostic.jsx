// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import styles from '../premiumModal/premium.module.css';

const ModalAwaitDiagnostic = ({ show, onClose }) => {
  return (
    <>
      <Modal
        show={show}
        keyboard={false}
        centered
        className={styles.modal_Subs}
        id="modalSubs"
      >
        <Modal.Header className={styles.modal_header}>
          <Modal.Title className={styles.modal_title_cont}>
            <img src="/images/resourses/Candado.png" alt="Unete" className={styles.modal_img} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body_cont}>
          <div className={styles.modal_container}>
            <h1 className="title ">Parece que recientemente has realizado este diagnóstico</h1>
            <p className="text-sm ">Antes de realizarlo una ves más, es necesario que hayan transcurrido por lo menos 30 días desde tu último intento. Vuelve cuando el periodo de espera haya terminado.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modal_footer_cont}>
          <button className="button button--theme-primary me-2" onClick={() => onClose(false)}>Cerrar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAwaitDiagnostic;
