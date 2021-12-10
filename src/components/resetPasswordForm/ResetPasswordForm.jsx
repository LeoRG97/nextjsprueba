/* eslint-disable import/extensions */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import { updatePassword } from '@/services/password';
import styles from './resetPassword.module.css';

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const handlePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tokenp1, tokenp2, tokenp3 } = router.query;
    const authToken = `${tokenp1}.${tokenp2}.${tokenp3}`;
    if (password.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres.');
      setStatus('error');
    } else {
      setStatus('loading');
      const res = await updatePassword(password, authToken);
      if (res.ok) {
        setStatus('success');
      } else if (res.message.includes('token')) {
        setStatus('error');
        setError('El enlace para reestablecer la contraseña ha expirado.');
      } else {
        setStatus('error');
        setError('Ha ocurrido un error. Vuelva a intentarlo más tarde.');
      }
    }
  };

  if (status === 'loading') {
    return (
      <div className={`${styles.container} centered-content`}>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {status === 'success'
        ? (
          <>
            <h1 className="title mb-3">Contraseña actualizada</h1>
            <p className="text-sm mb-4">
              Tu contraseña ha sido actualizada exitosamente.
              Para acceder a tu cuenta, por favor, inicia sesión.
            </p>
            <div className={styles.submit}>
              <button
                className="button button--theme-primary"
                type="button"
                onClick={() => router.push('/login')}
              >
                Iniciar sesión
              </button>
            </div>
          </>
        )
        : (
          <>
            <h1 className="title mb-3">Reestablece tu contraseña</h1>
            <form onSubmit={handleSubmit}>
              <label className="d-block subtitle mb-2" htmlFor="email">Nueva contraseña
                <div className="input-container">
                  <input
                    id="passwd"
                    type={passwordType}
                    name="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="input__icon" onClick={handlePasswordType} type="button">
                    <span className="icon icon--theme-secondary">{passwordType === 'password' ? 'B' : '8'}</span>
                  </button>
                </div>
              </label>
              <span className={`text-sm ${styles.error}`}>{error}</span>
              <div className={styles.submit}>
                <button className="button button--theme-primary" type="submit">
                  Reestablecer contraseña
                </button>
              </div>
            </form>
          </>
        )}
    </div>
  );
};

export default ResetPassword;
