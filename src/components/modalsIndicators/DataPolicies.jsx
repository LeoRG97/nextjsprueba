import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './modalsIndicator.module.css';

const DataPoliciesModal = ({ show, onClose, acceptDP }) => {
  const [checkM, setCheckM] = useState({
    check1: '',
    check2: '',
    check3: '',
  });

  const actualizarState = (e) => {
    setCheckM({
      ...checkM,
      [e.target.name]: e.target.checked,
    });
  };

  const verificarCheck = () => {
    if (
      checkM.check1 === true
      && checkM.check2 === true
      && checkM.check3 === true
    ) {
      acceptDP();
      setCheckM({ check1: false });
      setCheckM({ check2: false });
      setCheckM({ check3: false });
    }
  };

  return (
    <>
      <Modal backdrop="static" show={show} size="md" centered>
        <Modal.Body className={styles.container_Policies}>
          <div className="row d-flex justify-content-center">
            {/* <LoadingIndicator /> */}
          </div>
          <div className="row mt-3">
            <h1 className="title mt-3">
              Información Básica de Protección de Datos
            </h1>
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-10" align="left">
              <p className="text-sm">
                <b>Responsable: </b>EVERIS SPAIN, S.L.U (everis)
              </p>
              <p className="text-sm">
                <b>Finalidad: </b>gestionar las peticiones recibidas
                (solicitudes de contacto o información), y el envio de
                comunicaciones/newsletters sobre noticias, cursos, productos y
                servicios relacionados con las actividades desarrolladas por
                everis y/o su Grupo.
              </p>
              <p className="text-sm">
                <b>Ejercicio de Derechos: </b>Tiene derecho a acceder,
                rectificar y suprimir los datos, así como otros derechos, como
                se explica en la información adicional.
              </p>
              <p className="text-sm">
                <b>Información adicional: </b>consulte nuestra{' '}
                <Link href="/policies/privacy" passHref><a target="_blank" rel="noopener noreferrer"> politica de privacidad </a></Link>
              </p>
              <div className="text-sm">
                <input
                  type="checkbox"
                  id=""
                  className="micheckbox"
                  value="true"
                  name="check1"
                  onChange={actualizarState}
                />{' '}
                He leído y entendido la politica de privacidad
              </div>
              <div className="text-sm">
                <input
                  type="checkbox"
                  id=""
                  className="micheckbox"
                  value="true"
                  name="check2"
                  onChange={actualizarState}
                />{' '}
                Consiento el envío de comunicaciones comerciales o newsletters
                sobre noticias, cursos, actividades, eventos propios o de
                terceros, productos, productos, servicios, ofertas, promociones,
                relacionados con las actividades desarrolladas por everis
              </div>
              <div className="text-sm">
                <input
                  type="checkbox"
                  id=""
                  className="micheckbox"
                  value="true"
                  name="check3"
                  onChange={actualizarState}
                />{' '}
                Consiento la comunicación de mis dato a ñas empresas del Grupo
                everis para recibir comunicaciones comerciales o newsletters
                relacionados con las actividades desarrolladas por las empresas
                del Grupo everis
              </div>
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
          {
            checkM.check1 === true && checkM.check2 === true && checkM.check3 === true ? (
              <button
                onClick={() => verificarCheck()}
                className="button button button--theme-primary"
              >Crear cuenta
              </button>
            ) : (
              <button
                disabled
                onClick={() => verificarCheck()}
                className="button button button--theme-primary"
              >Crear cuenta
              </button>
            )
          }
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
