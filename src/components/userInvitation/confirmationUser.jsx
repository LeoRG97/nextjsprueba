/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import { activateUserEmail } from '@/services/user';
import styles from './userInvitation.module.css';

const ConfirmationUser = ({
  type, idInvitation, email, role,
}) => {
  const router = useRouter();
  const [session] = useSession();

  const model = {
    invitation: true,
    idInvitation,
    email,
    role,
  };

  useEffect(() => {
    localStorage.setItem('dataInvitation', JSON.stringify(model));
  }, []);

  const logOut = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  const toLogin = async () => {
    const res = await activateUserEmail({
      correo: model.email,
    });
    if (res.data) {
      if (session) {
        logOut();
      } else {
        router.push('/login');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className="title  mb-4">
          ¡Bienvenido al equipo!
        </h1>
        <span className="text-sm d-block mb-4">
          Ahora eres un {type}. Por favor inicia sesión para ingresar a tu cuenta.
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

ConfirmationUser.propTypes = {
  type: PropTypes.string,
  idInvitation: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

ConfirmationUser.defaultProps = {
  type: '',
};

export default ConfirmationUser;
