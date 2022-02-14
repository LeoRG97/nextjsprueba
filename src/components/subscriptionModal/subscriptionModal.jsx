// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import styles from './modalSubs.module.css';
import { hideSubscribeAlert } from '@/reducers/alert';

const SubscriptionModal = ({ show, setModal, backdrop }) => {
  const dispatch = useDispatch();
  // const [show, setModal] = useState(false);

  /* useEffect(() => {

  }, []); */

  const handleCloseModal = () => {
    dispatch(hideSubscribeAlert());
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setModal(false)}
        keyboard={false}
        centered
        className={styles.modal_Subs}
        id="modalSubs"
        backdrop={backdrop}
      >
        <Modal.Header className={styles.modal_header}>
          <Modal.Title className={styles.modal_title_cont}>
            <img src="/images/resourses/HuellaDigital.png" alt="Unete" className={styles.modal_img} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body_cont}>
          <div className={styles.modal_container}>
            <h1 className="title ">¡Únete a la comunidad!</h1>
            <p className="text-sm ">Regístrate para acceder a esta y muchas otras herramientas y funcionalidades.</p>
            <Link href="/create-account" className="button button--theme-primary me-2">
              <a onClick={handleCloseModal}>
                <button className="button button--theme-primary me-2">Crear una cuenta</button>
              </a>
            </Link>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modal_footer_cont}>
          <label className="text-md ">¿Ya eres miembro?</label>
          <Link href="/login">
            <a onClick={handleCloseModal}>
              <label className="text-link-dark ">Inicia sesión</label>
            </a>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// SubscriptionModal.propTypes = {};

// SubscriptionModal.defaultProps = {};

export default SubscriptionModal;
