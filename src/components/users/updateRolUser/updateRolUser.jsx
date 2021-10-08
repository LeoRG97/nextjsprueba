import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/client';
// import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import { updateUserData } from '@/services/profile';
import { updateInvitationService } from '@/services/invitations';
import styles from './updateRol.module.css';

const UpdateRolUserModal = ({
  show, idUserRol, idUserInvt, showModal, mutate,
}) => {
  // const [session] = useSession();
  const [loading, setLoading] = useState(false);
  const [errorUpdate, setError] = useState(false);
  const [updated, setUpdated] = useState(false);
  // const [modalShow, setModalShow] = useState(false);
  // const [idUserRol, setUser] = useState('');
  const [optionRol, setOptionRol] = useState('admin');

  const handleChange = (e) => {
    e.preventDefault();
    setOptionRol(e.target.value);
  };

  /* const showModal = (idUser) => {
    setUser(idUser);
    setModalShow(!modalShow);
    setUpdated(false);
  }; */

  const updateRoleFunc = async () => {
    setLoading(true);
    const newRol = {
      role: optionRol,
    };

    const respInvt = await updateInvitationService(idUserInvt,
      { rol: optionRol });
    const respUser = await updateUserData(idUserRol, newRol);
    if (respUser && respInvt) {
      mutate();
      setLoading(false);
      setUpdated(true);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setUpdated(false);
    };
  }, [show]);

  return (
    <div>
      {
        /* <button onClick={() => showModal('123')} className="Btn-cancel">Cambiar rol</button> */
      }
      <Modal
        show={show}
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
                        <option value="user-premium">Premium</option>
                        <option value="user">Usuario</option>
                      </select>
                      <span className="text-sm text--theme-error ">&nbsp;{(errorUpdate) ? ('Error al intentar actualizar') : (<></>)}</span>
                    </Modal.Body>

                    <Modal.Footer className={`${styles.modal_rol_backC} ${styles.modal_rol_footer} `}>
                      <button className="button button--theme-secondary" onClick={() => showModal()}>
                        Cancelar
                      </button>
                      <button className="button button--theme-primary" onClick={updateRoleFunc}>Actualizar</button>
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
                <button className="button button--theme-primary" onClick={() => showModal()}>Cerrar</button>
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
