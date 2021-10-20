// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from './premium.module.css';

const PremiumModal = ({ show, setModal }) => {
  const { data } = useSelector((state) => state.profile);
  // const [show, setModal] = useState(false);

  /* useEffect(() => {

  }, []); */

  return (
    <div>
      <div>
        <Modal
          show={show}
          onHide={() => setModal(false)}
          keyboard={false}
          centered
          className={styles.modal_Subs}
          id="modalSubs"
        >
          <Modal.Header className={styles.modal_header}>
            <Modal.Title className={styles.modal_title_cont}>
              <img src="/images/resourses/HuellaDigital.png" alt="Unete" className={styles.modal_img} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modal_body_cont}>
            <div className={styles.modal_container}>
              <h1 className="title ">Este es un contenido premium</h1>
              <p className="text-sm ">Comunicate con uno de nuestros administradores si quieres ser premium.</p>
              {
                data.role ? (
                  <div />
                ) : (
                  <Link href="/create-account" className="button button--theme-primary me-2">
                    <a>
                      <button className="button button--theme-primary me-2">Crear una cuenta</button>
                    </a>
                  </Link>
                )
              }
            </div>
          </Modal.Body>
          <Modal.Footer className={styles.modal_footer_cont}>
            {
              data.role ? (
                <div />
              ) : (
                <div>
                  <label className="text-md ">¿Ya eres miembro?</label>{' '}
                  <Link href="/login">
                    <a>
                      <label className="text-link-dark ">Inicia sesión</label>
                    </a>
                  </Link>
                </div>
              )
            }
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

// SubscriptionModal.propTypes = {};

// SubscriptionModal.defaultProps = {};

export default PremiumModal;
