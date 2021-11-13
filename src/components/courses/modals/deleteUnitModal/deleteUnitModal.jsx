import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Modal,
  Row,
} from 'react-bootstrap';
import styles from './deleteUnit.module.css';
import { CourseContext } from '@/helpers/contexts/CourseContext';

const ModalDeleteCourse = ({ show, onClose }) => {
  const {
    handleCancelDeltlessonModal,
    sumitDeleteUnit,
  } = useContext(CourseContext);

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        centered
        size="sm"
        dialogClassName={styles.modalWidth}
        contentClassName={styles.modalContainer}
      >
        <Modal.Body>
          <Row>
            <Col>
              <h3 className="title">Alerta</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-sm">Estas a punto de eliminar esta unidad, ¿Seguro que desea continuar?</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <Row className={styles.btn_div}>
            <Col>
              <button className="button button--theme-secondary" onClick={handleCancelDeltlessonModal}>Cancelar</button>
            </Col>
            <Col>
              <button className="button button--theme-primary" onClick={sumitDeleteUnit}>Eliminar</button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalDeleteCourse.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalDeleteCourse;
