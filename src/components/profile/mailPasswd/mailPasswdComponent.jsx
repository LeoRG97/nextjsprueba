import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/client';
import { Container, Row, Col } from 'react-bootstrap';
import { fetch as fetchProfile } from '@/reducers/profile';
import { updatePassword, updateEmail } from '@/services/profile';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '@/components/modalsIndicators/SuccesModal';
import styles from './mailPass.module.css';

const MailPasswdComponent = () => {
  const [formMail, setFormMail] = useState('');
  const [errorMailInput, setErrorFormMail] = useState(false);
  const [formPass, setFormPass] = useState({
    oldPass: '',
    newPass: '',
    errorOldPass: false,
    errorNewPass: false,
  });
  const [okMail, setOkMail] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [okPasswd, setOkPass] = useState(false);
  const [errorPasswd, setErrorPass] = useState(false);

  const {
    oldPass, newPass, errorOldPass, errorNewPass,
  } = formPass;

  const [session] = useSession();
  const dispatch = useDispatch();
  const { fetched } = useSelector((state) => state.profile);

  const [loadModal, setLoadModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [loadingModal] = useState({
    title: 'Actualizando información...',
    message: 'Esta operación podría tardar unos minutos, por favor espere.',
  });

  const [successInfo, setSuccessInfo] = useState({
    title: '',
    message: '',
  });

  const handleChangeMail = (e) => {
    setOkMail(false);
    setErrorMail(false);
    setFormMail(e.target.value);
  };

  const handleChangePass = (e) => {
    setOkPass(false);
    setErrorPass(false);
    setFormPass({ ...formPass, [e.target.name]: e.target.value });
  };

  const submitFormMail = (e) => {
    e.preventDefault();
    setLoadModal(true);
    const data = {
      idUser: session.user.id,
      email: formMail,
    };
    updateEmail(data).then((resp) => {
      setLoadModal(false);
      if (resp.ok) {
        const setSuccess = {
          title: 'Información actualizada',
          message: 'Su correo ha sido actualizado correctamente.',
        };
        setSuccessModal(true);
        setSuccessInfo(setSuccess);
        // setOkMail(true);
        setErrorMail(false);
      } else {
        setOkMail(false);
        setErrorMail(true);
      }
    });
  };

  const submitFormPasswd = (e) => {
    e.preventDefault();
    setLoadModal(true);
    const idUser = session.user.id;
    const data = {
      oldPassword: oldPass,
      newPassword: newPass,
    };
    updatePassword(idUser, data, session.accessToken).then((resp) => {
      setLoadModal(false);
      if (resp.ok) {
        setFormPass({ ...formPass, oldPass: '', newPass: '' });
        // setOkPass(true);
        const setSuccess = {
          title: 'Información actualizada',
          message: 'Su sontraseña ha sido actualizado correctamente.',
        };
        setSuccessModal(true);
        setSuccessInfo(setSuccess);
        setErrorPass(false);
      } else {
        setOkPass(false);
        setErrorPass(true);
      }
    });
  };

  const validateFormMail = () => {
    if (formMail === '') {
      setErrorFormMail(true);
    } else {
      setErrorFormMail(false);
    }
  };

  const validateFormPasswd = () => {
    let validateNew = false;
    let validateOld = false;
    if (formPass.oldPass === '') {
      validateOld = true;
    }
    if (formPass.newPass === '') {
      validateNew = true;
    }
    setFormPass({ ...formPass, errorOldPass: validateOld, errorNewPass: validateNew });
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
    if (session && formMail === '') {
      setFormMail(session.user.email);
    }
  }, [session]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className={styles.content_title}>
              <h4 className="title">Correo y contraseña</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {
                (okMail) ? (
                  <div className={styles.content_success}>
                    <label>Dirección de correo electrónico actualizado</label>
                  </div>
                ) : (<></>)
              }
            </div>
            <form className={styles.full_form} onSubmit={submitFormMail}>
              <div>
                <label className="text-md">Dirección de correo electrónico*</label>
                <input
                  id="mail"
                  name="mail"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  value={formMail}
                  className="input"
                  placeholder="Correo electrónico"
                  onChange={handleChangeMail}
                  required
                />
                <span className="text-sm text--theme-error ">&nbsp;{(errorMailInput) ? ('Campo requerido') : (<></>)}</span>
              </div>
              {
                (errorMail) ? (
                  <div className={styles.content_faild}>
                    <label>Error al actualizar, intente más tarde.</label>
                  </div>
                ) : (<></>)
              }
              <div>
                <button type="submit" className="button button--theme-primary" onClick={validateFormMail}>Actualizar dirección</button>
              </div>
            </form>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {
                (okPasswd) ? (
                  <div className={styles.content_success}>
                    <label>Contraseña actualizada.</label>
                  </div>
                ) : (<></>)
              }
            </div>
            <form className={styles.half_form} onSubmit={submitFormPasswd}>
              <div>
                <label className="text-md">Contraseña actual</label>
                <input
                  id="oldPass"
                  name="oldPass"
                  value={oldPass}
                  type="password"
                  className="input"
                  placeholder=""
                  onChange={handleChangePass}
                  required
                />
                <span className="text-sm text--theme-error ">&nbsp;{(errorOldPass) ? ('Campo requerido') : (<></>)}</span>
              </div>
              <div>
                <label className="text-md">Nueva contraseña</label>
                <input
                  id="newPass"
                  name="newPass"
                  value={newPass}
                  type="password"
                  minLength="6"
                  className="input"
                  placeholder="6+ caracteres"
                  onChange={handleChangePass}
                  required
                />
                <span className="text-sm text--theme-error ">&nbsp;{(errorNewPass) ? ('Campo requerido') : (<></>)}</span>
              </div>
              {
                (errorPasswd) ? (
                  <div className={styles.content_faild}>
                    <label>Error, verifique sus datos ó intente más tarde.</label>
                  </div>
                ) : (<></>)
              }
              <div> </div>
              <div>
                <button type="submit" className="button button--theme-primary" onClick={validateFormPasswd}>Actualizar contraseña</button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <LoadingIndicatorModal
        show={loadModal}
        onClose={() => setLoadModal(false)}
        textHeader={loadingModal.title}
        textBody={loadingModal.message}
      />
      <SuccessIndicatorModal
        show={successModal}
        onClose={() => setSuccessModal(false)}
        textHeader={successInfo.title}
        textBody={successInfo.message}
      />
    </>
  );
};

export default MailPasswdComponent;
