/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import { useDispatch } from 'react-redux';
import CategorySelector from '@/components/categorySelector/CategorySelector';
import { updateUserProfile } from '@/services/user';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '@/components/modalsIndicators/SuccesModal';
import styles from './profileS.module.css';
import { update as updateProfile } from '@/reducers/profile';

const DataAndPreferencesForm = ({ data, companydta, preferences }) => {
  const dispatch = useDispatch();
  const dateBirthday = new Date(data.birthDay.replace(/-/g, '/').replace(/T.+/, ''));
  const [company, setCompany] = useState(companydta || '');
  const [errorCompany, setErrorCompany] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [position, setPosition] = useState(data ? data.position : '');
  const [errorPosition, setErrorPosition] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [tel, setTel] = useState(data ? data.tel : '');
  const [errorTel, setErrorTel] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [yearValue, setYearValue] = useState(dateBirthday.getUTCFullYear());
  const [mounthValue, setMounthValue] = useState(dateBirthday.getUTCMonth());
  const [dayValue, setDayValue] = useState(dateBirthday.getUTCDate());
  const [birthDay, setBirthDay] = useState(data.birthDay);
  const [errorBirthDay, setErrorBirthDay] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [country, setCountry] = useState(data ? data.country : '');
  const [errorCountry, setErrorCountry] = useState(
    {
      text: '',
      status: false,
    },
  );
  const [state, setState] = useState(data ? data.state : '');
  const [errorState, setErrorState] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [city, setCity] = useState(data ? data.city : '');
  const [errorCity, setErrorCity] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [preferencesState, setPreferencesState] = useState(data.preferences);

  const [errorPreferencesState, setErrorPreferencesState] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(false);
  const [status, setStatus] = useState('idle');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);

  const handleAddCategory = (newItem) => {
    const newCategories = [...preferencesState, newItem];
    setPreferencesState(newCategories);
  };

  const handleDeleteCategory = (removedItem) => {
    const newCategories = preferencesState.filter((item) => item !== removedItem);
    setPreferencesState(newCategories);
  };

  const validate = (value, type) => {
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

  const withoutError = () => {
    setErrorPreferencesState({
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
    setErrorBirthDay({
      status: false,
      text: '',
    });
    setError('');
    setErrorStatus(false);
  };

  const handleSubmit = async (e, bornDay) => {
    e.preventDefault();
    const model = {
      company,
      position,
      country,
      state,
      city,
      tel,
      birthDay: bornDay || birthDay,
      preferences: (preferencesState.map((p) => p._id)),
    };

    if (preferencesState.length < 3) {
      setErrorPreferencesState({
        status: true,
        text: 'Selecciona minimo 3 preferencias.',
      });
    } else {
      withoutError();
      setStatus('loading');
      setModalLoading(true);
      setModalSucces(false);
      const res = await updateUserProfile(data._id, model);
      if (res.ok) {
        setModalLoading(false);
        setModalSucces(true);
        setStatus('success');
        dispatch(updateProfile({ ...model, preferences: preferencesState }));
      } else {
        setModalLoading(false);
        setModalSucces(false);
        setStatus('error');
        setError('Algo ha salido mal, revisa tus datos y vuelve a intentarlo más tarde');
      }
    }
  };

  const handleFirstForm = (e) => {
    e.preventDefault();

    if (company === ''
      || position === ''
      || tel === ''
      || city === ''
      || country === ''
      || state === ''
      || yearValue === '' || yearValue === 'Año'
      || mounthValue === '' || mounthValue === 'Mes'
      || dayValue === '' || dayValue === 'Día') {
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
        setBirthDay(`${yearValue}-${mm}-${dd}`);
      }
      const bornDay = `${yearValue}-${mm}-${dd}`;
      if (!errorGeneral) {
        setError('');
        setErrorStatus(false);
        handleSubmit(e, bornDay);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        Datos y preferencias
      </h1>
      <form onSubmit={handleFirstForm}>
        {
          errorStatus ? (
            <span className={`text-sm ${styles.error}`}>{error}</span>
          ) : (
            <div />
          )
        }
        <div className="row">
          <div className="col-6 full-content-mob">
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
          <div className="col-6 full-content-mob">
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
        <div className="row">
          <div className="col-6 full-content-mob">
            <label className="d-block subtitle mb-2" htmlFor="country">País o región*
              <div className="select-arrow">
                <CountryDropdown
                  required
                  id="country"
                  name="country"
                  defaultOptionLabel="País"
                  className="select"
                  value={country}
                  onChange={(val) => setCountry(val)}
                />
              </div>
              {errorCountry.status && <span className={`text-sm ${styles.error}`}>{errorCountry.text}</span>}
            </label>
          </div>
          <div className="col-6 full-content-mob">
            <label className="d-block subtitle mb-2" htmlFor="state">Provincia o estado*
              <div className="select-arrow">
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
              </div>
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
            <div className="select-arrow">
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
          </div>
          <div className="col-4">
            <div className="select-arrow">
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
          </div>
          <div className="col-4">
            <div className="select-arrow">
              <YearPicker
                defaultValue="Año"
                start={1921} // default is 1900
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
          {errorBirthDay.status && <span className={`text-sm ${styles.error}`}>{errorBirthDay.text}</span>}
        </div>
        <label className="d-block subtitle">Mis preferencias*</label>
        <CategorySelector
          data={preferences}
          initialSelectedItems={preferencesState}
          placeholder="Mis preferencias"
          addCategory={handleAddCategory}
          deleteCategory={handleDeleteCategory}
        />
        {errorPreferencesState.status && <span className={`text-sm ${styles.error}`}>{errorPreferencesState.text}</span>}
        <div className="row justify-content-end">
          <div className="col-auto mt-3">
            <button className="button button--theme-primary" disabled={status === 'loading'} onClick={handleFirstForm} type="submit">
              Actualizar información
            </button>
          </div>
        </div>
      </form>
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => setModalLoading(false)}
        textHeader="Actualizando información..."
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={modalSucces}
        onClose={() => setModalSucces(false)}
        textHeader="Información actualizada"
        textBody="La información de su perfil ha sido actualizada correctamente."
      />
    </div>
  );
};

DataAndPreferencesForm.propTypes = {
  data: PropTypes.object.isRequired,
  companydta: PropTypes.string,
  preferences: PropTypes.array.isRequired,
};

DataAndPreferencesForm.defaultProps = {
  companydta: '',
};

export default DataAndPreferencesForm;
