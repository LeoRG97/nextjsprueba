/* eslint-disable import/extensions */
import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Script from 'next/script';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import styles from './createAccountForm.module.css';
import { registerService } from '@/services/register';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';

const CreateAccountForm = ({ preferences }) => {
  const [nextStep, setNextStep] = useState(false);
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

  const [yearValue, setYearValue] = useState('');
  const [mounthValue, setMounthValue] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [errorBirthDay, setErrorBirthDay] = useState(
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

  const [preferencesState, setPreferencesState] = useState(preferences);
  const [newsLetter, setNewsletterState] = useState(false);
  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(false);
  const [status, setStatus] = useState('idle');
  /* const [submited, setSubmited] = useState('idle'); */

  const router = useRouter();

  const validate = (value, type) => {
    // setSubmited(false);
    if (type === 'name') {
      if (!value || value === '') {
        setErrorFirstName({
          status: true,
          text: 'Introduce el nombre.',
        });
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
      if (!value || value === '') {
        setErrorEmail({
          status: true,
          text: 'Introduce un correo válido.',
        });
        setErrorGeneral(true);
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrorEmail({
          status: true,
          text: 'Introduce un correo válido.',
        });
        setErrorGeneral(true);
      } else {
        setErrorEmail({
          status: false,
          text: '',
        });
        setEmail(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'password') {
      if (!value || value === '') {
        setErrorPassword({
          status: true,
          text: 'Introduce una contraseña.',
        });
        setErrorGeneral(true);
      } else if (value.length < 6) {
        setErrorPassword({
          status: true,
          text: 'Introduce por lo menos 6 dígitos.',
        });
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
          status: true,
          text: 'Introduce un número de telefono.',
        });
        setErrorGeneral(true);
      } else if (value.length !== 10) {
        setErrorTel({
          status: true,
          text: 'Introduce solo 10 dígitos.',
        });
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
          text: 'Selecciona un país.',
        });
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
          text: 'Selecciona la región administrativa.',
        });
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

    if (type === 'yearValue') {
      if (!value || value === '' || value === 'Año') {
        setErrorBirthDay({
          status: true,
          text: 'Selecciona una fecha válida.',
        });
        setErrorGeneral(true);
      } else if (mounthValue !== '' && dayValue !== '' && mounthValue !== 'Mes' && dayValue !== 'Día') {
        setErrorBirthDay({
          status: false,
          text: '',
        });
        setYearValue(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'mounthValue') {
      if (!value || value === '' || value === 'Mes') {
        setErrorBirthDay({
          status: true,
          text: 'Selecciona una fecha válida.',
        });
        setErrorGeneral(true);
      } else if (yearValue !== '' && dayValue !== '' && yearValue !== 'Año' && dayValue !== 'Día') {
        setErrorBirthDay({
          status: false,
          text: '',
        });
        setMounthValue(value);
        setErrorGeneral(false);
      }
    }
    if (type === 'dayValue') {
      if (!value || value === '' || value === 'Día') {
        setErrorBirthDay({
          status: true,
          text: 'Selecciona una fecha válida.',
        });
        setErrorGeneral(true);
      } else if (mounthValue !== '' && yearValue !== '' && mounthValue !== 'Mes' && yearValue !== 'Año') {
        setErrorBirthDay({
          status: false,
          text: '',
        });
        setDayValue(value);
        setErrorGeneral(false);
      }
    }
  };

  const handleChangeName = (value, type) => {
    if (type === 'firstName') {
      setFirstName(value);
    } else if (type === 'lastName') {
      setLastName(value);
    }
  };

  const handleCheck = () => {
    setNewsletterState(!newsLetter);
  };

  const handleFirstForm = async (e) => {
    e.preventDefault();

    if (firstName === ''
      || lastName === ''
      || email === ''
      || password === ''
      || company === ''
      || position === ''
      || tel === ''
      || city === ''
      || country === ''
      || state === ''
      || yearValue === '' || yearValue === 'Año'
      || mounthValue === '' || mounthValue === 'Mes'
      || dayValue === '' || dayValue === 'Día') {
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
      validate(yearValue, 'yearValue');
      validate(mounthValue, 'mounthValue');
      validate(dayValue, 'dayValue');
    } else {
      const yyyy = yearValue;
      let mm = 0;
      let dd = 0;
      if (yearValue !== '' && mounthValue !== '' && dayValue !== '') {
        if (mounthValue < 9) {
          mm = (`0${(Number(mounthValue) + 1)}`);
        } else {
          mm = (Number(mounthValue) + 1);
        }
        if (dayValue < 10) {
          dd = (`0${(Number(dayValue))}`);
        } else {
          dd = dayValue;
        }
        setBirthDay(`${yyyy}-${mm}-${dd}`);
      }
      if (!errorGeneral) {
        setError('');
        setErrorStatus(false);
        setNextStep(true);
      }
    }

    /* if (tel.length !== 10) {
      setError('El número de telefóno debe contener solo 10 digitos');
      setErrorStatus(true);
    } */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = document.getElementById('preferences').selectedOptions;
    const values = Array.from(options).map(({ value }) => value);
    setPreferencesState(values);
    const model = {
      email,
      password,
      name: `${firstName} ${lastName}`,
      position,
      company,
      tel,
      city,
      country,
      state,
      newsLetter,
      birthDay,
      preferences: values,
    };

    if (values.length < 3) {
      setError('Por favor, selecciona por lo menos 3 preferencias');
      setErrorStatus(true);
    } else {
      setError('');
      setErrorStatus(false);
      setStatus('loading');
      const res = await registerService(model);
      if (res.token) {
        setStatus('success');
        const resSignIn = await signIn('credentials', {
          email: model.email,
          password: model.password,
          redirect: false,
        });

        if (resSignIn?.error) {
          setError('Dirección de correo electrónico y/o contraseña incorrectos.');
        }
        if (resSignIn.url) {
          router.push('/trending-topics?user=true');
        }
      } else {
        setStatus('error');
        setError('Algo ha salido mal, revisa tus datos y vuelve a intentarlo más tarde');
      }
    }
  };

  return (
    <div>
      {
        !nextStep ? (
          <div className={styles.containerCreate}>
            <div>
              <h1 className="title">
                Crear una cuenta
              </h1>
              <span className="text-md d-block mb-4">
                ¿Ya eres miembro? <Link href="/login" passHref><a className={styles.link}> Inicia sesión</a></Link>
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
                  <div className="col-6">
                    <label className="d-block subtitle mb-2" htmlFor="name">Nombre*
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        className="input"
                        value={firstName}
                        onChange={(event) => handleChangeName(event.target.value, 'firstName')}
                        required
                      />
                      {errorFirstName.status && <span className={`text-sm ${styles.error}`}>{errorFirstName.text}</span>}
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
                        value={lastName}
                        onChange={(event) => handleChangeName(event.target.value, 'lastName')}
                        required
                      />
                      {errorLastName.status && <span className={`text-sm ${styles.error}`}>{errorLastName.text}</span>}
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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  {errorEmail.status && <span className={`text-sm ${styles.error}`}>{errorEmail.text}</span>}
                </label>
                <label className="d-block subtitle mb-2" htmlFor="password">Contraseña*
                  <input
                    id="password"
                    name="password"
                    type="password"
                    minLength={6}
                    placeholder="6+ caracteres"
                    className="input"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  {errorPassword.status && <span className={`text-sm ${styles.error}`}>{errorPassword.text}</span>}
                </label>
                <div className="row">
                  <div className="col-6">
                    <label className="d-block subtitle mb-2" htmlFor="company">Empresa*
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Nombre de la empresa"
                        className="input"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        required
                      />
                      {errorCompany.status && <span className={`text-sm ${styles.error}`}>{errorCompany.text}</span>}
                    </label>
                  </div>
                  <div className="col-6">
                    <label className="d-block subtitle mb-2" htmlFor="position">Cargo*
                      <input
                        id="position"
                        name="position"
                        type="text"
                        placeholder="Puesto que ocupa"
                        className="input"
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                        required
                      />
                      {errorPosition.status && <span className={`text-sm ${styles.error}`}>{errorPosition.text}</span>}
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
                    value={tel}
                    onChange={(event) => setTel(event.target.value)}
                    required
                  />
                  {errorTel.status && <span className={`text-sm ${styles.error}`}>{errorTel.text}</span>}
                </label>
                <div className="row mb-2">
                  <div className="d-block subtitle">Fecha de nacimiento* </div>
                  <div className="col-4 flechita">
                    <DayPicker
                      defaultValue="Día"
                      year={yearValue}
                      month={mounthValue}
                      endYearGiven
                      required
                      value={dayValue}
                      onChange={(day) => {
                        setDayValue(day);
                      }}
                      id="day"
                      name="day"
                      classes="classes select"
                      optionClasses="option classes"
                    />
                  </div>
                  <div className="col-4">
                    <MonthPicker
                      defaultValue="Mes"
                      numeric // to get months as numbers
                      endYearGiven // mandatory if end={} is given in YearPicker
                      year={yearValue} // mandatory
                      required // default is false
                      value={mounthValue} // mandatory
                      onChange={(month) => { // mandatory
                        setMounthValue(month);
                      }}
                      id="month"
                      name="month"
                      classes="classes select"
                      optionClasses="option classes"
                    />
                  </div>
                  <div className="col-4">
                    <YearPicker
                      defaultValue="Año"
                      start={1921} // default is 1900
                      end={2021} // default is current year
                      reverse // default is ASCENDING
                      required // default is false
                      value={yearValue} // mandatory
                      onChange={(year) => { // mandatory
                        setYearValue(year);
                      }}
                      id="year"
                      name="year"
                      classes="classes select"
                      optionClasses="option classes"
                    />
                  </div>
                  {errorBirthDay.status && <span className={`text-sm ${styles.error}`}>{errorBirthDay.text}</span>}
                </div>
                <div className="row">
                  <div className="col-6">
                    <label className="d-block subtitle mb-2" htmlFor="country">País o región*
                      <CountryDropdown
                        required
                        id="country"
                        name="country"
                        defaultOptionLabel="País"
                        className="select"
                        value={country}
                        onChange={(val) => setCountry(val)}
                      />
                      {errorCountry.status && <span className={`text-sm ${styles.error}`}>{errorCountry.text}</span>}
                    </label>
                  </div>
                  <div className="col-6">
                    <label className="d-block subtitle mb-2" htmlFor="state">Provincia o estado*
                      <RegionDropdown
                        id="state"
                        name="state"
                        defaultOptionLabel="Estado"
                        className="select"
                        country={country}
                        value={state}
                        onChange={(val) => setState(val)}
                        required
                      />
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
                    onChange={(event) => setCity(event.target.value)}
                    required
                  />
                  {errorCity.status && <span className={`text-sm ${styles.error}`}>{errorCity.text}</span>}
                </label>
                <div className={styles.check}>
                  <button className={styles.buttonChek} onClick={handleCheck} type="button">
                    <span className="icon icon--theme-secondary">{newsLetter ? 'A' : '5'}</span>
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
                {
                  errorStatus ? (
                    <span className={`text-sm ${styles.error}`}>{error}</span>
                  ) : (
                    <div />
                  )
                }
                <div className={styles.buttonContinue}>
                  <button className="button button--theme-primary" onClick={handleFirstForm} type="submit">
                    Crear cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div>
              <h1 className="title mb-3">
                ¡Ya casi está listo!
              </h1>
              <span className="text-sm d-block mb-5">
                Antes de continuar, es necesario que elijas al menos tres categorías de tu
                preferencia, de esta manera, podremos mostrarte contenido que sea relevante
                para ti.
                Recuerda que siempre podrás modificarlas o añadir más ingresando a la opción
                Editar perfil.
              </span>
              <form onSubmit={handleSubmit} className="mt-3">
                {
                  errorStatus || status === 'error' ? (
                    <p className={`text-sm ${styles.error}`}>{error}</p>
                  ) : (
                    <p />
                  )
                }
                <span className="d-block subtitle mb-2">Me interesa el contenido relacionado con</span>
                <select id="preferences" defaultValue={preferencesState} multiple data-placeholder="+3 categorías">
                  {
                    preferences.length > 0 ? (
                      preferences.map((preference) => (
                        <option
                          key={preference._id}
                          value={preference._id}
                        >
                          {preference.nombre}
                        </option>
                      ))
                    ) : (
                      <option value="0">No se encontraron resultados</option>
                    )
                  }
                </select>
                <div className={styles.buttonContinue}>
                  {
                    status === 'loading' ? (
                      <LoadingIndicator />
                    ) : (
                      <button id="btnPreferences" className="button button--theme-primary" type="submit">
                        Finalizar
                      </button>
                    )
                  }
                </div>
              </form>
            </div>
            <Script
              dangerouslySetInnerHTML={{
                __html: `
                  $(document).ready(function() {

                    var select = $('#preferences');
                    var options = select.find('option');

                    var div = $('<div />').addClass('selectMultiple');
                    var active = $('<div />');
                    var list = $('<ul />');
                    var placeholder = select.data('placeholder');
                    var selectedOptions = [];

                    var span = $('<span />').text(placeholder).appendTo(active);

                    options.each(function() {
                        var text = $(this).text();
                        var valueSelect = $(this).val();

                        if($(this).is(':selected')) {
                            active.append($('<a />').html('<em>' + text + '</em><i></i>'));
                            span.addClass('hide');
                        } else {
                            list.append(
                              $("<li>", {
                                text: text,
                                attr: {
                                  ["data-valueOption"]: valueSelect
                                }
                              })
                            );
                        }
                    });

                    active.append($('<div />').addClass('arrow'));
                    div.append(active).append(list);

                    select.wrap(div);

                    $(document).on('click', '.selectMultiple ul li', function(e) {
                        var select = $(this).parent().parent();
                        var li = $(this);
                        var valueOption = li.attr('data-valueOption');
                        if(!select.hasClass('clicked')) {
                            select.addClass('clicked');
                            li.prev().addClass('beforeRemove');
                            li.next().addClass('afterRemove');
                            li.addClass('remove');
                            selectedOptions.push(li.attr('data-valueOption'))
                            var a = $('<a />').attr( "data-valueOption", valueOption ).addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'))
                            ;
                            a.slideDown(400, function() {
                                setTimeout(function() {
                                    a.addClass('shown');
                                    select.children('div').children('span').addClass('hide');
                                    select.find('option:contains(' + li.text() + ')').prop('selected', true);
                                }, 500);
                            });
                            setTimeout(function() {
                                if(li.prev().is(':last-child')) {
                                    li.prev().removeClass('beforeRemove');
                                }
                                if(li.next().is(':first-child')) {
                                    li.next().removeClass('afterRemove');
                                }
                                setTimeout(function() {
                                    li.prev().removeClass('beforeRemove');
                                    li.next().removeClass('afterRemove');
                                }, 200);

                                li.slideUp(400, function() {
                                    li.remove();
                                    select.removeClass('clicked');
                                });
                            }, 600);
                        }
                    });

                    $(document).on('click', '.selectMultiple > div a', function(e) {
                        var removeItemFromArr = ( arr, item ) => {
                          var i = arr.indexOf( item );
                          i !== -1 && arr.splice( i, 1 );
                        };
                        var select = $(this).parent().parent();
                        var self = $(this);
                        self.removeClass().addClass('remove');
                        removeItemFromArr( selectedOptions, self.attr('data-valueOption') );
                        select.addClass('open');
                        setTimeout(function() {
                            self.addClass('disappear');
                            setTimeout(function() {
                                self.animate({
                                    width: 0,
                                    height: 0,
                                    padding: 0,
                                    margin: 0
                                }, 300, function() {
                                    var li = $('<li />').attr( "data-valueOption", self.attr('data-valueOption') ).text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                                    li.slideDown(400, function() {
                                        li.addClass('show');
                                        setTimeout(function() {
                                            select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                                            if(!select.find('option:selected').length) {
                                                select.children('div').children('span').removeClass('hide');
                                            }
                                            li.removeClass();
                                        }, 400);
                                    });
                                    self.remove();
                                })
                            }, 300);
                        }, 400);
                    });

                    $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function(e) {
                        $(this).parent().parent().toggleClass('open');
                    });

                });
                    `,
              }}
            />
          </div>
        )
      }
    </div>
  );
};

CreateAccountForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  preferences: PropTypes.array.isRequired,
};

export default CreateAccountForm;
