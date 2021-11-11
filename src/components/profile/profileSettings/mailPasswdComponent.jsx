import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/client';
import { Row, Col } from 'react-bootstrap';
import { fetch as fetchProfile, update as updateProfile } from '@/reducers/profile';
import { updatePassword, updateEmail } from '@/services/profile';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '@/components/modalsIndicators/SuccesModal';
import styles from './profileS.module.css';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';

const MailPasswdComponent = () => {
  const [formMail, setFormMail] = useState('');
  const [errorMailInput, setErrorFormMail] = useState(false);
  const [formPass, setFormPass] = useState({
    oldPass: '',
    newPass: '',
  });
  const [passwordError, setPasswordError] = useState({
    errorOldPass: false,
    errorNewPass: false,
  });
  const [errorMail, setErrorMail] = useState(false);

  const { oldPass, newPass } = formPass;
  const { errorOldPass, errorNewPass } = passwordError;

  const [session] = useSession();
  const dispatch = useDispatch();
  const { fetched, data } = useSelector((state) => state.profile);

  const [loadModal, setLoadModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({
    show: false,
    title: '',
    message: '',
  });

  const [loadingModal] = useState({
    title: 'Actualizando información...',
    message: 'Esta operación podría tardar unos minutos, por favor espere.',
  });

  const [successInfo, setSuccessInfo] = useState({
    title: '',
    message: '',
  });

  const handleChangeMail = (e) => {
    setErrorMail(false);
    setFormMail(e.target.value);
  };

  const handleChangePass = (e) => {
    setFormPass({ ...formPass, [e.target.name]: e.target.value });
  };

  const submitFormMail = (e) => {
    e.preventDefault();
    if (formMail === '') {
      setErrorFormMail(true);
    } else {
      setErrorFormMail(false);
      setLoadModal(true);
      const updateData = {
        idUser: session.user.id,
        email: formMail,
      };
      updateEmail(updateData).then((resp) => {
        setLoadModal(false);
        if (resp.ok) {
          const setSuccess = {
            title: 'Información actualizada',
            message: 'Su correo ha sido actualizado correctamente.',
          };
          setSuccessModal(true);
          setSuccessInfo(setSuccess);
          setErrorMail(false);
          dispatch(updateProfile({ email: formMail }));
        } else {
          setErrorMail(true);
          setErrorModal({
            show: true,
            title: 'Ha ocurrido un error',
            message: 'Vuelva a intentarlo más tarde',
          });
        }
      });
    }
  };

  const submitFormPasswd = (e) => {
    e.preventDefault();
    let validateNew = false;
    let validateOld = false;
    if (formPass.oldPass === '') {
      validateOld = true;
    }
    if (formPass.newPass === '') {
      validateNew = true;
    }
    setPasswordError({ ...passwordError, errorOldPass: validateOld, errorNewPass: validateNew });
    if (validateOld || validateNew) {
      return '';
    }
    setLoadModal(true);
    const idUser = session.user.id;
    const updateData = {
      oldPassword: oldPass,
      newPassword: newPass,
    };
    return updatePassword(idUser, updateData, session.accessToken).then((resp) => {
      setLoadModal(false);
      if (resp.ok) {
        setFormPass({
          ...formPass,
          oldPass: '',
          newPass: '',
        });
        const setSuccess = {
          title: 'Información actualizada',
          message: 'Su sontraseña ha sido actualizado correctamente.',
        };
        setSuccessModal(true);
        setSuccessInfo(setSuccess);
      } else {
        setErrorModal({
          show: true,
          title: 'Ha ocurrido un error',
          message: 'Verifique sus datos o intente más tarde',
        });
      }
    });
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
    if (session && formMail === '') {
      setFormMail(data.email);
    }
  }, [session]);

  return (
    <>
      <>
        <h4 className="title">Correo electrónico y contraseña</h4>

        <form className="mb-4" onSubmit={submitFormMail}>
          <div className="mb-3">
            <label className="subtitle">Dirección de correo electrónico*</label>
            <input
              id="mail"
              name="mail"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={formMail}
              className="input"
              placeholder="Correo electrónico"
              onChange={handleChangeMail}
            />
            <span className="text-sm text--theme-error ">{errorMailInput && 'Introduce una dirección de correo válida'}</span>
          </div>
          {
            (errorMail) ? (
              <div className={styles.content_faild}>
                <label>Error al actualizar, intente más tarde.</label>
              </div>
            ) : (<></>)
          }
          <div className="d-flex justify-content-end">
            <button type="submit" className="button button--theme-primary">Actualizar dirección</button>
          </div>
        </form>

        <form onSubmit={submitFormPasswd}>
          <Row className="mb-3">
            <Col xs={12} sm={6}>
              <label className="subtitle">Contraseña actual</label>
              <input
                id="oldPass"
                name="oldPass"
                value={oldPass}
                type="password"
                className="input"
                placeholder=""
                onChange={handleChangePass}
              />
              <span className="text-sm text--theme-error ">{errorOldPass && 'Campo requerido'}</span>
            </Col>
            <Col xs={12} sm={6}>
              <label className="subtitle">Nueva contraseña</label>
              <input
                id="newPass"
                name="newPass"
                value={newPass}
                type="password"
                minLength="6"
                className="input"
                placeholder="6+ caracteres"
                onChange={handleChangePass}
              />
              <span className="text-sm text--theme-error ">{errorNewPass && 'Campo requerido'}</span>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <button type="submit" className="button button--theme-primary">Actualizar contraseña</button>
          </div>
        </form>
      </>
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
      <ErrorIndicatorModal
        show={errorModal.show}
        onClose={() => setErrorModal({ ...errorModal, show: false })}
        textHeader={errorModal.title}
        textBody={errorModal.message}
      />
    </>
  );
};

export default MailPasswdComponent;
