/* eslint-disable import/extensions */
import React from 'react';
import { useRouter } from 'next/router';
import styles from './userInvitation.module.css';

const ConfirmationUser = () => {
  const router = useRouter();

  const toLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className="title  mb-4">
          ¡Bienvenido al equipo!
        </h1>
        <span className="text-sm d-block mb-4">
          Ahora eres un Colaborador. Por favor inicia sesión para ingresar a tu cuenta.
        </span>
        <div className={styles.button}>
          <button className="button button--theme-primary" type="button" onClick={toLogin}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationUser;
