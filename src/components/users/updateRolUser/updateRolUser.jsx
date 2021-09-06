import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
// import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import { updateUserData } from '@/services/profile';
import styles from './updateRol.module.css';

const UpdateRolUserModal = (/* props */) => {
  /* const {
    show, idUser, showModal,
  } = props; */
  const [session] = useSession();
  const [loading, setLoading] = useState(false);
  const [errorUpdate, setError] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [idUserRol, setUser] = useState('');
  const [optionRol, setOptionRol] = useState('admin');

  const handleChange = (e) => {
    e.preventDefault();
    setOptionRol(e.target.value);
  };

  const showModal = (idUser) => {
    setUser(idUser);
    setModalShow(!modalShow);
    setUpdated(false);
  };

  const updateRoleFunc = () => {
    setLoading(true);
    const newRol = {
      role: optionRol,
    };
    updateUserData(idUserRol, newRol).then((resp) => {
      if (resp) {
        setLoading(false);
        setUpdated(true);
      } else {
        setError(true);
        setLoading(false);
      }
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  };

  useEffect(() => {
  }, [session]);

  return (
    <div>
      <button onClick={() => showModal('123')} className="Btn-cancel">Cambiar rol</button>
      <Modal
        show={modalShow}
        onHide={() => showModal}
        backdrop="static"
        keyboard={false}
        centered
        className={styles.modal_video}
        id="modalRol"
      >
        {
          (!updated) ? (
            <>
              {
                (loading) ? (
                  <Modal.Body className={`${styles.modal_loading} ${styles.modal_rol_footer} `}>
                    <LoadingIndicator />
                  </Modal.Body>
                ) : (
                  <>
                    <Modal.Header className={`${styles.modal_rol_backC} ${styles.modal_rol_title} `}>
                      <Modal.Title>
                        <h1 className="title ">Actualizar rol</h1>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={`${styles.modal_rol_backC} ${styles.modal_rol_body} `}>
                      <label className="subtitle text--theme-light">Rol de usuario</label>
                      <select name="roles" id="rolesUser" onChange={handleChange} className="input">
                        <option value="admin">Admin</option>
                        <option value="user-author">Colaborador</option>
                        <option value="user-reviewer">Curador</option>
                        <option value="usuario">Usuario</option>
                      </select>
                      <span className="text-sm text--theme-error ">&nbsp;{(errorUpdate) ? ('Error al intentar actualizar') : (<></>)}</span>
                    </Modal.Body>

                    <Modal.Footer className={`${styles.modal_rol_backC} ${styles.modal_rol_footer} `}>
                      <button className="Btn-cancel" onClick={() => showModal()}>
                        cancelar
                      </button>
                      <button className="Btn-add" onClick={updateRoleFunc}>Actualizar</button>
                    </Modal.Footer>
                  </>
                )
              }
            </>
          ) : (
            <>
              <Modal.Header className={`${styles.modal_rol_backC} ${styles.modal_rol_title} `}>
                <Modal.Title>
                  <h1 className="title ">Rol actualizado</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className={`${styles.modal_rol_backC} ${styles.modal_rol_body} `}>
                <p className="text-md text--theme-secondary">El rol del usuario ha sido actualizado exitosamente y con ello, las acciones que puede realizar</p>
              </Modal.Body>
              <Modal.Footer className={`${styles.modal_rol_backC} ${styles.modal_rol_footer} `}>
                <button className="Btn-add" onClick={() => showModal()}>Cerrar</button>
              </Modal.Footer>
            </>
          )
        }
      </Modal>
    </div>
  );
};
/*
UpdateRolUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  idUser: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};

UpdateRolUserModal.defaultProps = {};
*/
export default UpdateRolUserModal;
