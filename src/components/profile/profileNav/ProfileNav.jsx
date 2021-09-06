/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './profileNav.module.css';

const ProfileNavComponent = () => {
  return (
    <div className={styles.profileSettingsOptions}>
      <div className={`text-md ${styles.optionsContent}`}> <span className="icon">0</span> General</div>
      <div className={`text-md ${styles.optionsContent}`}> <span className="icon">0</span> Datos y preferencias</div>
      <div className={`text-md ${styles.optionsContent}`}> <span className="icon">0</span> Correo y contraseña</div>
      <div className={`text-md ${styles.optionsContent}`}> <span className="icon">0</span> Redes sociales</div>
    </div>
  );
};

export default ProfileNavComponent;
