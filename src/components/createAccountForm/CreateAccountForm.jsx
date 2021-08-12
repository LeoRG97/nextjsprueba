import React, { useState } from 'react';
import Link from 'next/link';

import styles from './createAccountForm.module.css';

const CreateAccountForm = () => {
  const [newsletterState, setNewsletterState] = useState(false);

  const handleCheck = () => {
    setNewsletterState(!newsletterState);
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className="title">
          Crear una cuenta
        </h1>
        <span className="text-md d-block mb-4">
          ¿Ya eres miembro? <Link href="#" passHref><a className={styles.link}> Inicia sesión</a></Link>
        </span>
        <form>
          <div className="row">
            <div className="col-6">
              <label className="d-block subtitle mb-2" htmlFor="name">Nombre*
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  className="input"
                  required
                />
              </label>
            </div>
            <div className="col-6">
              <label className="d-block subtitle mb-2" htmlFor="lastName">Apellidos*
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Apellidos"
                  className="input"
                  required
                />
              </label>
            </div>
          </div>
          <label className="d-block subtitle mb-2" htmlFor="email">Dirección de correo electrónico*
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Dirección de correo electrónico"
              className="input"
              required
            />
          </label>
          <label className="d-block subtitle mb-2" htmlFor="password">Contraseña*
            <input
              id="password"
              name="password"
              type="password"
              placeholder="6+ caracteres"
              className="input"
              required
            />
          </label>
          <div className="row">
            <div className="col-6">
              <label className="d-block subtitle mb-2" htmlFor="corporation">Empresa*
                <input
                  id="corporation"
                  name="corporation"
                  type="text"
                  placeholder="Nombre de la empresa"
                  className="input"
                  required
                />
              </label>
            </div>
            <div className="col-6">
              <label className="d-block subtitle mb-2" htmlFor="position">Cargo
                <input
                  id="position"
                  name="position"
                  type="text"
                  placeholder="Puesto que ocupa"
                  className="input"
                  required
                />
              </label>
            </div>
          </div>
          <label className="d-block subtitle mb-2" htmlFor="tel">Teléfono*
            <input
              id="tel"
              name="tel"
              type="number"
              placeholder="Número de teléfono"
              className="input"
              required
            />
          </label>
          <div className="row mb-2">
            <div className="d-block subtitle">Fecha de nacimiento* </div>
            <div className="col-4">
              <input
                id="day"
                name="day"
                type="number"
                placeholder="Día"
                className="input"
                required
              />
            </div>
            <div className="col-4">
              <input
                id="month"
                name="month"
                type="number"
                placeholder="Mes"
                className="input"
                required
              />
            </div>
            <div className="col-4">
              <input
                id="year"
                name="year"
                type="number"
                placeholder="Año"
                className="input"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="d-block subtitle mb-2" htmlFor="country">País o región*
                <input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="País"
                  className="input"
                  required
                />
              </label>
            </div>
            <div className="col-6">
              <label className="d-block subtitle mb-2" htmlFor="state">Provincia o estado*
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Estado"
                  className="input"
                  required
                />
              </label>
            </div>
          </div>
          <label className="d-block subtitle mb-2" htmlFor="city">Ciudad o localidad*
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Ciudad o localidad"
              className="input"
              required
            />
          </label>
        </form>
        <div className={styles.check}>
          <button className={styles.buttonChek} onClick={handleCheck} type="button">
            <span className="icon icon--theme-secondary">{newsletterState ? 'A' : '5'}</span>
          </button>
          <span className="text-sm d-block mb-2 ms-1">
            Doy mi consentimiento para la comunicación a las filiales y empresas
            asociadas de NTT DATA con el fin de recibir comunicaciones
            comerciales relacionadas con los servicios de XXXX.
          </span>
        </div>
        <span className="text-sm d-block mb-3">
          Al hacer clic en Crear cuenta, reconozco que he leído y aceptado
          las <Link href="#" passHref><a className={styles.link}> Condiciones de uso</a></Link>
          y la <Link href="#" passHref><a className={styles.link}> Política de Privacidada</a></Link>
        </span>
        <div className={styles.buttonContinue}>
          <button className="button button--theme-primary">
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm;
