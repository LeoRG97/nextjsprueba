/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import dynamic from 'next/dynamic';
import styles from './createAccountForm.module.css';
import { registerService } from '@/services/register';
import CategorySelector from '../categorySelector/CategorySelector';
import DataPoliciesModal from '../modalsIndicators/DataPolicies';

const LoadingIndicatorModal = dynamic(() => import('@/components/modalsIndicators/LoadingModal'));
const SuccessIndicatorModal = dynamic(() => import('@/components/modalsIndicators/SuccesModal'));
const ErrorIndicatorModal = dynamic(() => import('@/components/modalsIndicators/ErrorModal'));

const CreateAccountForm = ({ preferences }) => {
  const [nextStep, setNextStep] = useState(false);
  const [dataPoliciesM, acceptDataPoliciesM] = useState(false);
  const [modelData, setModelData] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(
    {
      status: false,
      text: '',
    },
  );
  const [firstName, setFirstName] = useState('');
  const [errorFirstName, setErrorFirstName] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [lastName, setLastName] = useState('');
  const [errorLastName, setErrorLastName] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [company, setCompany] = useState('');
  const [errorCompany, setErrorCompany] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [position, setPosition] = useState('');
  const [errorPosition, setErrorPosition] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [tel, setTel] = useState('');
  const [errorTel, setErrorTel] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [country, setCountry] = useState('');
  const [errorCountry, setErrorCountry] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [state, setState] = useState('');
  const [errorState, setErrorState] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [city, setCity] = useState('');
  const [errorCity, setErrorCity] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [preferencesState, setPreferencesState] = useState([]);

  const newsLetter = true;
  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(false);

  const [dataInvite, setDataInvite] = useState({
    email: '',
    idInvitation: '',
    role: 'user',
    invitation: false,
  });

  const handleAddCategory = (newItem) => {
    const newCategories = [...preferencesState, newItem];
    setPreferencesState(newCategories);
    if (newCategories.length >= 3) {
      setError('');
      setErrorStatus(false);
    }
  };

  const handleDeleteCategory = (removedItem) => {
    const newCategories = preferencesState.filter((item) => item !== removedItem);
    setPreferencesState(newCategories);
    if (newCategories.length < 3) {
      setError('Por favor, selecciona por lo menos 3 preferencias');
      setErrorStatus(true);
    }
  };

  const router = useRouter();

  useEffect(() => {
    const dataInvitation = localStorage.getItem('dataInvitation');
    if (dataInvitation !== null) {
      const elementsInvitation = JSON.parse(dataInvitation);
      setDataInvite({ ...elementsInvitation });
      setEmail(elementsInvitation.email);
    }
  }, []);

  const validate = (value, type) => {
    // setSubmited(false);
    if (type === 'name') {
      if (!value || value === '') {
        setErrorFirstName({
          status: true,
          text: 'Introduce el nombre.',
        });
        setFirstName(value);
        setErrorGeneral(true);
      } else {
        setErrorFirstName({
          status: false,
          text: '',
        });
        setFirstName(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'lastName') {
      if (!value || value === '') {
        setErrorLastName({
          status: true,
          text: 'Introduce el apellido.',
        });
        setLastName(value);
        setErrorGeneral(true);
      } else {
        setErrorLastName({
          status: false,
          text: '',
        });
        setLastName(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'email') {
      if (!value || value === '' || value === undefined) {
        setErrorEmail({
          status: true,
          text: 'Introduce un correo v??lido.',
        });
        setEmail(value);
        setErrorGeneral(true);
      } else if (!/\S+@\S+\.\S+/.test(value.replace(/ /g, ''))) {
        setErrorEmail({
          status: true,
          text: 'Introduce un correo v??lido.',
        });
        setEmail(value);
        setErrorGeneral(true);
      } else {
        setErrorEmail({
          status: false,
          text: '',
        });
        setEmail(value.replace(/ /g, ''));
        setErrorGeneral(false);
      }
    }
    if (type === 'password') {
      if (!value || value === '') {
        setErrorPassword({
          status: true,
          text: 'Introduce una contrase??a.',
        });
        setPassword(value);
        setErrorGeneral(true);
      } else if (value.length < 6) {
        setErrorPassword({
          status: true,
          text: 'Introduce por lo menos 6 d??gitos.',
        });
        setPassword(value);
        setErrorGeneral(true);
      } else {
        setErrorPassword({
          status: false,
          text: '',
        });
        setPassword(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'company') {
      if (!value || value === '') {
        setErrorCompany({
          status: true,
          text: 'Introduce una empresa.',
        });
        setCompany(value);
        setErrorGeneral(true);
      } else {
        setErrorCompany({
          status: false,
          text: '',
        });
        setCompany(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'position') {
      if (!value || value === '') {
        setErrorPosition({
          status: true,
          text: 'Introduce tu puesto.',
        });
        setPosition(value);
        setErrorGeneral(true);
      } else {
        setErrorPosition({
          status: false,
          text: '',
        });
        setPosition(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'tel') {
      if (!value || value === '') {
        setErrorTel({
          status: false,
          text: '',
        });
        setTel(value);
        setErrorGeneral(false);
      } else if (value.length !== 10) {
        setErrorTel({
          status: true,
          text: 'Introduce solo 10 d??gitos.',
        });
        setTel(value);
        setErrorGeneral(true);
      } else {
        setErrorTel({
          status: false,
          text: '',
        });
        setTel(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'city') {
      if (!value || value === '') {
        setErrorCity({
          status: true,
          text: 'Introduce una ciudad.',
        });
        setCity(value);
        setErrorGeneral(true);
      } else {
        setErrorCity({
          status: false,
          text: '',
        });
        setCity(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'country') {
      if (!value || value === '') {
        setErrorCountry({
          status: true,
          text: 'Selecciona un pa??s.',
        });
        setCountry(value);
        setErrorGeneral(true);
      } else {
        setErrorCountry({
          status: false,
          text: '',
        });
        setCountry(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'state') {
      if (!value || value === '') {
        setErrorState({
          status: true,
          text: 'Selecciona la regi??n administrativa.',
        });
        setState(value);
        setErrorGeneral(true);
      } else {
        setErrorState({
          status: false,
          text: '',
        });
        setState(value);
        setErrorGeneral(false);
      }
    }
  };

  const withoutError = () => {
    setFirstName({
      status: false,
      text: '',
    });
    setLastName({
      status: false,
      text: '',
    });
    setEmail({
      status: false,
      text: '',
    });
    setPassword({
      status: false,
      text: '',
    });
    setErrorCompany({
      status: false,
      text: '',
    });
    setErrorPosition({
      status: false,
      text: '',
    });
    setErrorTel({
      status: false,
      text: '',
    });
    setErrorCity({
      status: false,
      text: '',
    });
    setErrorCountry({
      status: false,
      text: '',
    });
    setErrorState({
      status: false,
      text: '',
    });
    setError('');
    setErrorStatus(false);
    setErrorGeneral(false);
  };

  const handleFirstForm = (e) => {
    e.preventDefault();
    if (firstName === ''
      || lastName === ''
      || email === '' || email === undefined
      || password === ''
      || company === ''
      || position === ''
      || (tel.length !== 10 && tel.length > 0)
      || city === ''
      || country === ''
      || state === '') {
      validate(firstName, 'name');
      validate(lastName, 'lastName');
      validate(email, 'email');
      validate(password, 'password');
      validate(company, 'company');
      validate(position, 'position');
      validate(tel, 'tel');
      validate(city, 'city');
      validate(country, 'country');
      validate(state, 'state');
    } else if (!errorGeneral) {
      setError('');
      setErrorStatus(false);
      setNextStep(true);
    }
  };

  const acceptPolicies = async () => {
    acceptDataPoliciesM(false);
    setModalLoading(true);
    const res = await registerService(modelData);
    if (res.token) {
      setModalLoading(false);
      setModalSucces(true);
      setModalError({
        status: false,
        text: '',
      });
      withoutError();
      const resSignIn = await signIn('credentials', {
        email: modelData.email,
        password: modelData.password,
        redirect: false,
      });

      if (resSignIn.ok) {
        localStorage.setItem('rememberme', modelData.email);
      }

      if (resSignIn?.error) {
        setModalLoading(false);
        setModalSucces(false);
        setModalError({
          status: true,
          text: 'Direcci??n de correo electr??nico y/o contrase??a incorrectos.',
        });
        setError('');
      }
      if (resSignIn.url) {
        if (dataInvite.invitation && (dataInvite.email === modelData.email)) {
          router.push('/validate-invitation');
        } else {
          //
          router.push('/trending-topics?user=true');
        }
      }
    } else {
      setModalLoading(false);
      setModalSucces(false);
      setNextStep(false);
      setError('');
      setErrorStatus(false);
      setModalError({
        status: true,
        text: 'Algo ha salido mal, revisa tus datos y vuelve a intentarlo m??s tarde, es posible que ya este registrado un usuario con el mismo correo',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let model = {
      email,
      password,
      name: firstName,
      apellidos: lastName,
      position,
      company,
      city,
      country,
      state,
      newsLetter,
      preferences: preferencesState,
      role: dataInvite ? dataInvite.role : 'user',
    };
    if (tel !== '') {
      model = { ...model, tel };
    }
    if (preferencesState.length < 3) {
      setError('Por favor, selecciona por lo menos 3 preferencias');
      setErrorStatus(true);
    } else {
      setModelData(model);
      setError('');
      setErrorStatus(false);
      setModalSucces(false);
      setModalError({
        status: false,
        text: '',
      });
      acceptDataPoliciesM(true);
      setModalLoading(false);
    }
  };

  return (
    <>
      {
        !nextStep ? (
          <div className={styles.containerCreate}>
            <div>
              <h1 className="title">
                Crear una cuenta
              </h1>
              <span className="text-md d-block mb-4">
                ??Ya eres miembro? <Link href="/login" passHref><a className={styles.link}> Inicia sesi??n</a></Link>
              </span>
              <form onSubmit={handleFirstForm}>
                {
                  errorStatus ? (
                    <span className={`text-sm ${styles.error}`}>{error}</span>
                  ) : (
                    <div />
                  )
                }
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label className="d-block subtitle mb-2" htmlFor="name">Nombre*
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        className="input"
                        value={firstName}
                        onChange={(event) => validate(event.target.value, 'name')}
                        required
                      />
                      {errorFirstName.status && <span className={`text-sm ${styles.error}`}>{errorFirstName.text}</span>}
                    </label>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="d-block subtitle mb-2" htmlFor="lastName">Apellidos*
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Apellidos"
                        className="input"
                        value={lastName}
                        onChange={(event) => validate(event.target.value, 'lastName')}
                        required
                      />
                      {errorLastName.status && <span className={`text-sm ${styles.error}`}>{errorLastName.text}</span>}
                    </label>
                  </div>
                </div>
                <label className="d-block subtitle mb-2" htmlFor="email">Direcci??n de correo electr??nico*
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Direcci??n de correo electr??nico"
                    className="input"
                    value={email}
                    onChange={(event) => validate(event.target.value, 'email')}
                    required
                  />
                  {errorEmail.status && <span className={`text-sm ${styles.error}`}>{errorEmail.text}</span>}
                </label>
                <label className="d-block subtitle mb-2" htmlFor="password">Contrase??a*
                  <input
                    id="password"
                    name="password"
                    type="password"
                    minLength={6}
                    placeholder="6+ caracteres"
                    className="input"
                    value={password}
                    onChange={(event) => validate(event.target.value, 'password')}
                    required
                  />
                  {errorPassword.status && <span className={`text-sm ${styles.error}`}>{errorPassword.text}</span>}
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label className="d-block subtitle mb-2" htmlFor="company">Empresa*
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Nombre de la empresa"
                        className="input"
                        value={company}
                        onChange={(event) => validate(event.target.value, 'company')}
                        required
                      />
                      {errorCompany.status && <span className={`text-sm ${styles.error}`}>{errorCompany.text}</span>}
                    </label>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="d-block subtitle mb-2" htmlFor="position">Cargo*
                      <input
                        id="position"
                        name="position"
                        type="text"
                        placeholder="Puesto que ocupa"
                        className="input"
                        value={position}
                        onChange={(event) => validate(event.target.value, 'position')}
                        required
                      />
                      {errorPosition.status && <span className={`text-sm ${styles.error}`}>{errorPosition.text}</span>}
                    </label>
                  </div>
                </div>
                <label className="d-block subtitle mb-2" htmlFor="tel">Tel??fono
                  <input
                    id="tel"
                    name="tel"
                    type="number"
                    placeholder="N??mero de tel??fono"
                    className="input"
                    value={tel}
                    onChange={(event) => validate(event.target.value, 'tel')}
                  />
                  {errorTel.status && <span className={`text-sm ${styles.error}`}>{errorTel.text}</span>}
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label className="d-block subtitle mb-2" htmlFor="country">Pa??s o regi??n*
                      <div className="select-arrow">
                        <CountryDropdown
                          required
                          id="country"
                          name="country"
                          defaultOptionLabel="Pa??s"
                          className="select"
                          value={country}
                          onChange={(val) => validate(val, 'country')}
                        />
                      </div>
                      {errorCountry.status && <span className={`text-sm ${styles.error}`}>{errorCountry.text}</span>}
                    </label>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="d-block subtitle mb-2" htmlFor="state">Provincia o estado*
                      <div className="select-arrow">
                        <RegionDropdown
                          id="state"
                          name="state"
                          defaultOptionLabel="Estado"
                          className="select"
                          country={country}
                          value={state}
                          onChange={(val) => validate(val, 'state')}
                          required
                        />
                      </div>
                      {errorState.status && <span className={`text-sm ${styles.error}`}>{errorState.text}</span>}
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
                    value={city}
                    onChange={(event) => validate(event.target.value, 'city')}
                    required
                  />
                  {errorCity.status && <span className={`text-sm ${styles.error}`}>{errorCity.text}</span>}
                </label>
                {
                  errorStatus ? (
                    <span className={`text-sm ${styles.error}`}>{error}</span>
                  ) : (
                    <div />
                  )
                }
                <div className={styles.buttonContinue}>
                  <button className="button button--theme-primary" onClick={handleFirstForm} type="submit">
                    Siguiente
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div>
              <h1 className="title mb-3">
                ??Ya casi est?? listo!
              </h1>
              <span className="text-sm d-block mb-4">
                Antes de continuar, es necesario que elijas al menos tres categor??as de tu
                preferencia, de esta manera, podremos mostrarte contenido que sea relevante
                para ti.
                Recuerda que siempre podr??s modificarlas o a??adir m??s ingresando a la opci??n
                Editar perfil.
              </span>
              <form onSubmit={handleSubmit} className="mb-2">
                <span className="d-block subtitle mb-2">Me interesa el contenido relacionado con</span>
                {
                  preferences.length > 0 ? (
                    <>
                      <CategorySelector
                        data={preferences}
                        initialSelectedItems={preferencesState}
                        placeholder="+3 categor??as"
                        addCategory={handleAddCategory}
                        deleteCategory={handleDeleteCategory}
                      />
                    </>
                  ) : (
                    <option value="0">No se encontraron resultados</option>
                  )
                }
                {
                  errorStatus ? (
                    <p className={`text-sm ${styles.error}`}>{error}</p>
                  ) : (
                    <p />
                  )
                }
                <div className={`${styles.buttonContinue} mt-5`}>
                  <button id="btnPreferences" className="button button--theme-primary" type="submit">
                    Finalizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
      <DataPoliciesModal
        show={dataPoliciesM}
        onClose={() => acceptDataPoliciesM(false)}
        acceptDP={() => acceptPolicies()}
      />
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => setModalLoading(false)}
        textHeader="Agregando..."
        textBody="Esta operaci??n podr??a tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={modalSucces}
        onClose={() => setModalSucces(false)}
        textHeader="Agregado"
        textBody="Se ha creado el usuario correctamente. ??Bienvenido!"
      />
      <ErrorIndicatorModal
        show={modalError.status}
        onClose={() => setModalError({
          status: false,
          text: '',
        })}
        textHeader="Ha ocurrido un error"
        textBody={modalError.text}
      />
    </>
  );
};

CreateAccountForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  preferences: PropTypes.array.isRequired,
};

export default CreateAccountForm;
