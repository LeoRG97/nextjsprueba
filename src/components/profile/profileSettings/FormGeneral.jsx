/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateUserData, uploadImgProfile } from '@/services/profile';
import { fetch as fetchProfile } from '@/reducers/profile';
import styles from './profileS.module.css';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '@/components/modalsIndicators/SuccesModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';

const FormGeneral = ({
  id,
  nameU,
  lastName,
  userBio,
  pictureU,
}) => {
  const dispatch = useDispatch();
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [profile, saveProfile] = useState({
    name: nameU,
    apellidos: lastName,
    biography: userBio,
    picture: pictureU,
  });
  const [preImg, previewImg] = useState({
    fileU: '',
    imgP: '',
  });

  useEffect(() => {
  }, []);

  const updateState = (e) => {
    if (e.target.value.length <= 120) {
      saveProfile({
        ...profile,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === 'biography') {
      document.getElementById('contador').innerHTML = e.target.value.length;
    }
  };

  const updateDataUser = async (userData) => {
    setModalLoading(true);
    setModalSucces(false);
    const res = await updateUserData(id, userData);
    if (res._id) {
      dispatch(fetchProfile());
      setModalLoading(false);
      setModalSucces(true);
    }
  };

  // EVENTO IMAGEN
  const _handleImageChange = async (e) => {
    e.preventDefault();

    const path = `${id}/resources`;
    const reader = new FileReader();
    const file = e.target.files[0];

    const res = await uploadImgProfile(path, file, file.name);

    if (res.ok) {
      saveProfile({
        ...profile,
        picture: res.file,
      });
      reader.onloadend = () => {
        previewImg({
          fileU: file,
          imgP: reader.result,
        });
      };
      reader.readAsDataURL(file);
      updateDataUser({ picture: res.file });
    } else {
      setModalError(true);
    }
  };

  // EVENTO SUBMIT FORM
  const submitForm = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (form.checkValidity() === true) {
      updateDataUser(profile);
    }

    setValidated(true);
  };

  const {
    name,
    apellidos,
    biography,
    picture,
  } = profile;

  const {
    imgP,
  } = preImg;

  return (
    <div>
      <h1 className="title">General</h1>
      <Form>
        <div>
          <div className="text-md">Imagen de perfil</div>
          <div className={styles.profileSettingsImg}>
            <div className={styles.profilImg}>
              {picture && picture !== 'string' ? (
                <div className={styles.imgContent}>
                  <img id="img-preview" src={imgP !== '' ? imgP : picture} alt="" />
                </div>
              ) : (
                <div className={styles.imgContent}>
                  <img
                    id="img-preview"
                    src="/images/profile/no-profile-img.png"
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className={styles.profilSettingsFile}>
              <Form.Group controlId="formFileSm">
                <Form.Label
                  className={`button button--theme-secondary ${styles.fileLabel}`}
                >
                  Cambiar foto de perfil
                </Form.Label>
                <Form.Control
                  accept="image/png,image/jpeg,image/jpeg"
                  type="file"
                  size="sm"
                  name="picture"
                  onChange={_handleImageChange}
                  className={styles.fileInputName}
                />
              </Form.Group>
            </div>
          </div>
        </div>
      </Form>
      <Form noValidate validated={validated} onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="IpuntName">
          <Form.Label className="text-md">Nombre(s)*</Form.Label>
          <input
            className="input"
            type="text"
            placeholder="Nombre o nombres"
            required
            name="name"
            value={name}
            onChange={updateState}
          />
          <Form.Control.Feedback type="invalid">
            Introduce el nombre.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="IpuntNameLastName">
          <Form.Label className="text-md">Apellidos*</Form.Label>
          <input
            className="input"
            type="text"
            placeholder="Apellidos"
            required
            name="apellidos"
            value={apellidos}
            onChange={updateState}
          />
          <Form.Control.Feedback type="invalid">
            Introduce el apellido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="TextareaBiografy">
          <Form.Label className="text-md">Biografía</Form.Label>
          <textarea
            id="text-area"
            className={styles.settingsTextare}
            rows={3}
            placeholder="Biografía"
            required
            name="biography"
            value={biography || ''}
            onChange={updateState}
            maxLength="200"
          />
          <Form.Control.Feedback type="invalid">
            Introduce la biografía.
          </Form.Control.Feedback>
          <div className="text-sm"> <span id="contador">{userBio ? userBio.length : 0}</span>/120</div>
        </Form.Group>
        <div align="right">
          <button className="button button--theme-primary">
            Actualizar perfil
          </button>
        </div>
      </Form>
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => setModalLoading(false)}
        textHeader="Actualizando información..."
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={modalSucces}
        onClose={() => setModalSucces(false)}
        textHeader="Información actualizada"
        textBody="La información de su perfil ha sido actualizada correctamente."
      />
      <ErrorIndicatorModal
        show={modalError}
        onClose={() => setModalError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Algo ha salido mal, intente con una imagen mas pequeña."
      />
    </div>
  );
};

export default FormGeneral;
