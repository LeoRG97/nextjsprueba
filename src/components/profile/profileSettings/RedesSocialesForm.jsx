/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateUserProfile } from '@/services/user';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import { SuccessIndicatorModal } from '@/components';
import styles from './profileS.module.css';

const RedesSocialesForm = ({ data }) => {
  let linkT = '';
  let linkL = '';
  data.socialMedia.forEach((social) => {
    if (social.nombre === 'twitter') {
      linkT = social.link;
    }
    if (social.nombre === 'linkedIn') {
      linkL = social.link;
    }
  });
  const [twitter, setTwitter] = useState(linkT);
  const [errorTwitter, setErrorTwitter] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [linkedIn, setLinkedIn] = useState(linkL);
  const [errorLinkedIn, setErrorLinkedIn] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);

  const validURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  };

  const validate = (value, type) => {
    if (type === 'twitter') {
      if (!validURL(value) && value !== '') {
        setErrorTwitter({
          status: true,
          text: 'Introduce un enlace valido.',
        });
      } else {
        setErrorTwitter({
          status: false,
          text: '',
        });
        setTwitter(value);
      }
    }
    if (type === 'linkedIn') {
      if (!validURL(value) && value !== '') {
        setErrorLinkedIn({
          status: true,
          text: 'Introduce un enlace valido.',
        });
      } else {
        setErrorLinkedIn({
          status: false,
          text: '',
        });
        setLinkedIn(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setErrorStatus(false);
    const socialMediaValues = [];
    if (twitter !== '') {
      socialMediaValues.push({
        nombre: 'twitter',
        link: twitter,
      });
    }
    if (linkedIn !== '') {
      socialMediaValues.push({
        nombre: 'linkedIn',
        link: linkedIn,
      });
    }

    setError('');
    setErrorStatus(false);
    setModalLoading(true);
    setModalSucces(false);
    const model = {
      socialMedia: socialMediaValues,
    };
    const res = await updateUserProfile(data._id, model);
    if (res.ok) {
      setModalLoading(false);
      setModalSucces(true);
    } else {
      setModalLoading(false);
      setModalSucces(false);
      setError('Algo ha salido mal, revisa tus datos y vuelve a intentarlo más tarde');
    }
  };

  const handleFirstForm = async (e) => {
    e.preventDefault();

    if ((!validURL(twitter) && twitter !== '')
      || (!validURL(linkedIn) && linkedIn !== '')) {
      validate(twitter, 'twitter');
      validate(linkedIn, 'linkedIn');
    } else if (twitter === '' || linkedIn === '') {
      setTwitter(twitter);
      setLinkedIn(linkedIn);
      setErrorTwitter({
        status: false,
        text: '',
      });
      setErrorLinkedIn({
        status: false,
        text: '',
      });
      handleSubmit(e);
    } else {
      setTwitter(twitter);
      setLinkedIn(linkedIn);
      setErrorTwitter({
        status: false,
        text: '',
      });
      setErrorLinkedIn({
        status: false,
        text: '',
      });
      handleSubmit(e);
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        Redes Sociales
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
          <div>
            <label className="d-block subtitle mb-2" htmlFor="twitter">Twitter
              <input
                id="twitter"
                name="twitter"
                type="text"
                placeholder="Enlace"
                className="input"
                value={twitter}
                onChange={(event) => setTwitter(event.target.value)}
                required
              />
              {errorTwitter.status && <span className={`text-sm ${styles.error}`}>{errorTwitter.text}</span>}
            </label>
          </div>
        </div>
        <div>
          <label className="d-block subtitle mb-2" htmlFor="linkedIn">LinkedIn
            <input
              id="linkedIn"
              name="linkedIn"
              type="text"
              placeholder="Enlace"
              className="input"
              value={linkedIn}
              onChange={(event) => setLinkedIn(event.target.value)}
              required
            />
            {errorLinkedIn.status && <span className={`text-sm ${styles.error}`}>{errorLinkedIn.text}</span>}
          </label>
        </div>
        <div className="row justify-content-end">
          <div className="col-auto mt-3">
            <button className="button button--theme-primary" onClick={handleFirstForm} type="submit">
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

RedesSocialesForm.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RedesSocialesForm;
