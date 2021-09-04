/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Row,
  Form,
} from 'react-bootstrap';
import { ProfileNavComponent } from '@/components';
import styles from './profileS.module.css';

const ProfileSettingsComponent = ({
  id,
  nameU,
  lastName,
  userBio,
  pictureU,
  updateDU,
}) => {
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

  // EVENTO IMAGEN
  const _handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      saveProfile({
        ...profile,
        [e.target.name]: `https://ilovet-app.s3.us-east-2.amazonaws.com/${id}/resources/${file.name}`,
      });
      previewImg({
        fileU: file,
        imgP: reader.result,
      });
    };
    reader.readAsDataURL(file);
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
      updateDU(profile, preImg);
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
    <div className={styles.profileSettingsContainer}>
      <Container>
        <Row>
          <Col className={`title-xl ${styles.profileSettingsTitle}`} md={12}>
            Ajustes de la cuenta
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={4}>
            <ProfileNavComponent />
          </Col>
          <Col md={12} lg={6} align="left">
            <div className={`title ${styles.general}`}>General</div>
            <Form noValidate validated={validated} onSubmit={submitForm}>
              <div>
                <div className="text-md">Imagen de perfil</div>
                <div className={styles.profileSettingsImg}>
                  <div className={styles.profilImg}>
                    {picture ? (
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
                  value={biography}
                  onChange={updateState}
                  maxLength="200"
                />
                <Form.Control.Feedback type="invalid">
                  Introduce la biografía.
                </Form.Control.Feedback>
                <div className="text-sm"> <span id="contador">{userBio.length}</span>/120</div>
              </Form.Group>
              <div align="right">
                <button className="button button--theme-primary">
                  Actualizar perfil
                </button>
              </div>
            </Form>
            <span id="mensaje-final" className={`text-md ${styles.mensajeFinal}`}>Datos Actualizados</span>
          </Col>
          <Col md={12} lg={2} align="left" />
        </Row>
      </Container>
    </div>
  );
};

export default ProfileSettingsComponent;
