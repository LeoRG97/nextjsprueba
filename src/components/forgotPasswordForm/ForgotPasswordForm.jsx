import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { validateEmail } from '@/helpers/validateEmail';
import { forgotPasswordService } from '@/services/password';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';
import styles from './forgotPassword.module.css';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Introduce una dirección de correo válida.');
      setStatus('error');
    } else {
      setError('');
      setStatus('loading');
      const res = await forgotPasswordService(email);
      if (res.ok) {
        setStatus('success');
      } else if (res.message.includes('email')) {
        setStatus('error');
        setError('El correo electrónico no está registrado.');
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
            <h1 className="title mb-3">Solicitud enviada</h1>
            <p className="text-sm mb-4">
              Hemos enviado, a la dirección de correo electrónico proporcionada,
              las instrucciones para reestablecer tu contraseña. Por favor,
              revisa tu bandeja de entrada.
            </p>
            <div className={styles.submit}>
              <button
                className="button button--theme-primary"
                type="button"
                onClick={() => router.push('/login')}
              >
                Finalizar
              </button>
            </div>
          </>
        )
        : (
          <>
            <h1 className="title mb-3">Olvidé mi contraseña</h1>
            <p className="text-sm mb-4">
              Ingresa la dirección de correo electrónico que utilizas
              para acceder a tu cuenta, a ella te enviaremos las instrucciones
              necesarias para reestablecer tu contraseña.
            </p>
            <form onSubmit={handleSubmit}>
              <label className="d-block subtitle mb-2" htmlFor="email">Correo electrónico
                <input
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              {status === 'error' && <span className={`text-sm ${styles.error}`}>{error}</span>}
              <div className={styles.submit}>
                <button className="button button--theme-primary" type="submit">
                  Enviar instrucciones
                </button>
              </div>
            </form>
          </>
        )}
    </div>
  );
};

export default ForgotPassword;
