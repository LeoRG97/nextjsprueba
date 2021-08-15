import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import styles from './createAccountForm.module.css';

const CreateAccountForm = () => {
  const [nextStep, setNextStep] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [tel, setTel] = useState('');
  const [yearValue, setYearValue] = useState('');
  const [mounthValue, setMounthValue] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [newsLetter, setNewsletterState] = useState(false);

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

    setNextStep(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = document.getElementById('preferences').selectedOptions;
    const values = Array.from(options).map(({ value }) => value);
    setPreferences(values);
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
    // eslint-disable-next-line no-console
    console.log(model);
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
                </label>
                <div className="row mb-2">
                  <div className="d-block subtitle">Fecha de nacimiento* </div>
                  <div className="col-4">
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
                <div className={styles.buttonContinue}>
                  <button className="button button--theme-primary" type="submit">
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
                preferencia, de esta manera, podremos mostrarte contenido que sea relevante para ti.
                Recuerda que siempre podrás modificarlas o añadir más ingresando a la opción
                Editar perfil.
              </span>
              <form onSubmit={handleSubmit} className="mt-3">
                <span className="d-block subtitle mb-2">Me interesa el contenido relacionado con</span>
                <select id="preferences" defaultValue={preferences} multiple data-placeholder="+3 categorías">
                  <option value="a">Tecnología</option>
                  <option value="b">Innovación</option>
                  <option value="c">Negocios</option>
                  <option value="d">Finanzas</option>
                  <option value="e">Sutentabilidad</option>
                </select>
                <div className={styles.buttonContinue}>
                  <button id="btnPreferences" className="button button--theme-primary" type="submit">
                    Finalizar
                  </button>
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

export default CreateAccountForm;
