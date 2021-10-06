import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './loginForm.module.css';
import { loginValidation } from './loginFormValidation';

const LoginForm = () => {
  const router = useRouter();
  const [dataInvite, setDataInvite] = useState({
    email: '',
    idInvitation: '',
    role: '',
    invitation: false,
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    isValid: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [submitError, setSubmitError] = useState('');

  const { email, password } = formData;

  const handlePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (submitted) {
      const errorObj = loginValidation(formData);
      setFormErrors(errorObj);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitted(true);
    const errorObj = loginValidation(formData);
    if (!errorObj.isValid) {
      setFormErrors(errorObj);
    } else {
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (res?.error) {
        setSubmitError('Dirección de correo electrónico y/o contraseña incorrectos.');
      }
      if (res.url) {
        if (dataInvite.invitation && (dataInvite.email === formData.email)) {
          router.push('/validate-invitation');
        } else {
          router.push('/trending-topics?user=true');
        }
      }
    }
  };

  useEffect(() => {
    const dataInvitation = localStorage.getItem('dataInvitation');
    if (dataInvitation !== null) {
      const elementsInvitation = JSON.parse(dataInvitation);
      setFormData({ ...formData, email: elementsInvitation.email });
      setDataInvite({ ...elementsInvitation });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1 className="title mb-3">Inicio de sesión</h1>
        <span className="text-md d-block mb-2 mb-sm-4">
          ¿Aún no eres miembro? <Link href="/create-account" passHref><a className={styles.link}>Regístrate ahora</a></Link>
        </span>
        <form onSubmit={handleSubmit}>
          <label className="d-block subtitle" htmlFor="email">Correo electrónico
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className="input"
              value={email}
              onChange={handleChange}
            />
          </label>
          {formErrors.email && <span className="text-sm text--theme-error">{formErrors.email}</span>}
          <label className="d-block subtitle mt-0 mt-sm-4" htmlFor="passwd">Contraseña
            <Link href="/forgot-password" passHref>
              <a className={`text-md ${styles.link} ${styles.floatRight}`}>
                ¿Olvidaste tu contraseña?
              </a>
            </Link>
            <div className="input-container">
              <input
                id="passwd"
                type={passwordType}
                name="password"
                className="input"
                value={password}
                onChange={handleChange}
              />
              <button className="input__icon" onClick={handlePasswordType} type="button">
                <span className="icon icon--theme-secondary">{passwordType === 'password' ? 'B' : 'C'}</span>
              </button>
            </div>
          </label>
          {formErrors.password && <span className="text-sm text--theme-error">{formErrors.password}</span>}
          {submitError && <span className={`text-sm ${styles.error}`}>{submitError}</span>}
          <div className={styles.submit}>
            <button className="button button--theme-primary" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
