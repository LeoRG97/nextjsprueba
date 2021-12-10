import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './modalsIndicator.module.css';

const DataPoliciesModal = ({ show, onClose, acceptDP }) => {
  const [consentimiento, setConsentimiento] = useState(false);
  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const actualizarState = () => {
    setConsentimiento(!consentimiento);
  };

  const verificarCheck = () => {
    if (consentimiento === true) {
      acceptDP();
      setConsentimiento(false);
    } else {
      setError('Para crear una cuenta, debes marcar la casilla');
      setErrorStatus(true);
    }
  };

  return (
    <>
      <Modal backdrop="static" show={show} size="md" centered>
        <Modal.Body className={styles.container_Policies}>
          <div className="row mt-2">
            <h1 className="title mt-2">
              Información Básica de Privacidad
            </h1>
            <div className="row d-flex justify-content-center mt-2">
              {
                errorStatus ? (
                  <span className={`text-sm ${styles.error}`}>{error}</span>
                ) : (
                  <div />
                )
              }
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-10" align="left">
              <p className="text-sm">
                <b>Responsable: </b>NTT DATA México S. de R.L. de C.V. (“NTT DATA México”)
              </p>
              <p className="text-sm">
                <b>Finalidades: </b>
              </p>
              <div className="text-sm">
                <ul>
                  <li>Gestionar y habilitar su acceso a la plataforma y al contenido de la misma
                  </li>
                  <li>
                    Enviarle comunicaciones / newsletters sobre noticias,
                    cursos, productos y servicios relacionados con las
                    actividades desarrolladas por NTT DATA México
                  </li>
                  <li>
                    Transferir sus datos personales a la sociedad del Grupo NTT
                    DATA en LATAM según el país al que pertenezca, en su caso.
                  </li>
                </ul>
              </div>
              <p className="text-sm">
                <b>Ejercicio de Derechos: </b>tiene el derecho de ejercer en
                cualquier momento sus derechos de acceso, rectificación,
                cancelación y oposición (los `&quot;`Derechos ARCO`&quot;`) de su información.
              </p>
              <p className="text-sm">
                <b>Información adicional: </b>consulte nuestro{' '}
                <Link href="/policies/privacy" passHref><a target="_blank" rel="noopener noreferrer"> Aviso de privacidad </a></Link>
              </p>
              <div className={styles.check}>
                <button className={styles.buttonChek} onClick={actualizarState} type="button">
                  <span className={`icon ${consentimiento ? 'icon--theme-highlight' : 'icon--theme-secondary'}`}>
                    {consentimiento ? 'A' : '5'}
                  </span>
                </button>
                <span className="text-sm d-block mb-2 ms-1">
                  Consiento que mis datos personales sean tratados para las
                  finalidades antes descritas.
                </span>
              </div>
              <br />
              <p className="text-sm">
                Al hacer clic en Crear Cuenta, reconozco que he leído y aceptado
                las <Link href="/policies/legal" passHref><a target="_blank" rel="noopener noreferrer"> Condiciones de uso </a></Link> y el <Link href="/policies/privacy" passHref><a target="_blank" rel="noopener noreferrer"> Aviso de privacidad </a></Link>
              </p>
            </div>
            <div className="row d-flex justify-content-center mt-2">
              {
                errorStatus ? (
                  <span className={`text-sm ${styles.error}`}>{error}</span>
                ) : (
                  <div />
                )
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => onClose()}
            className="button button button--theme-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={() => verificarCheck()}
            className="button button button--theme-primary"
          >Crear cuenta
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DataPoliciesModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  acceptDP: PropTypes.func.isRequired,
};

export default DataPoliciesModal;
