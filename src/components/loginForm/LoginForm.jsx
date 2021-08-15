import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './loginForm.module.css';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordType, setPasswordType] = useState('password');
  const [error, setError] = useState('');

  const { email, password } = formData;

  const handlePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      callbackUrl: `${window.location.origin}/articulos`,
      redirect: false,
    });

    if (res?.error) {
      setError('Dirección de correo electrónico y/o contraseña incorrectos');
    }
    if (res.url) {
      router.push('/articulos');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="title mb-3">Inicio de sesión</h1>
      <span className="text-md d-block mb-4">
        ¿Aún no eres miembro? <Link href="/create-account" passHref><a className={styles.link}>Regístrate ahora</a></Link>
      </span>
      <form onSubmit={handleSubmit}>
        <label className="d-block subtitle mb-4" htmlFor="email">Correo electrónico
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="input"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="d-block subtitle mb-4" htmlFor="passwd">Contraseña
          <Link href="#" passHref>
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
              required
            />
            <button className="input__icon" onClick={handlePasswordType} type="button">
              <span className="icon icon--theme-secondary">{passwordType === 'password' ? 'B' : 'C'}</span>
            </button>
          </div>
        </label>
        {error && <span className={`text-sm ${styles.error}`}>{error}</span>}
        <div className={styles.submit}>
          <button className="button button--theme-primary" type="submit">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
