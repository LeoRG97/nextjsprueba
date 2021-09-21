import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './profileMembersAndInvitations.module.css';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import { SuccessIndicatorModal } from '@/components';
import { sendInvitationService } from '@/services/email';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';

const InviteMemberForm = () => {
  const router = useRouter();
  useEffect(() => {

  }, [router]);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [rol, setRol] = useState('');
  const [errorRol, setErrorRol] = useState(
    {
      text: '',
      status: false,
    },
  );

  const [errorGeneral, setErrorGeneral] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(false);

  const validate = (type, value) => {
    if (type === 'email') {
      if (!value || value === '') {
        setErrorEmail({
          status: true,
          text: 'Introduce un correo válido.',
        });
        setEmail(value);
        setErrorGeneral(true);
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrorEmail({
          status: true,
          text: 'Introduce un correo válido.',
        });
        setEmail(value);
        setErrorGeneral(true);
      } else {
        setErrorEmail({
          status: false,
          text: '',
        });
        setEmail(value);
        setErrorGeneral(false);
      }
    } else if (type === 'rol') {
      if (!value || value === '') {
        setErrorRol({
          status: true,
          text: 'Selecciona un rol.',
        });
        setRol(value);
        setErrorGeneral(true);
      } else {
        setErrorRol({
          status: false,
          text: '',
        });
        setRol(value);
        setErrorGeneral(false);
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const model = {
      mailSend: email,
      role: rol,
    };
    setModalLoading(true);
    setModalSucces(false);
    setModalError(false);
    const res = await sendInvitationService(model.mailSend, model.role);
    if (res.ok) {
      setModalLoading(false);
      setModalError(false);
      setModalSucces(true);
      setEmail('');
      setRol('');
      setErrorEmail({
        status: false,
        text: '',
      });
      setErrorRol({
        status: false,
        text: '',
      });
    } else if (res._id) {
      setModalLoading(false);
      setModalError(false);
      setModalSucces(true);
      setEmail('');
      setRol('');
      setErrorEmail({
        status: false,
        text: '',
      });
      setErrorRol({
        status: false,
        text: '',
      });
    } else {
      setModalLoading(false);
      setModalSucces(false);
      setModalError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || rol === '') {
      validate('email', email);
      validate('rol', rol);
    } else if (!errorGeneral) {
      submit(e);
    }
  };

  return (
    <div>
      <h1 className="title">Invitar miembro</h1>
      <form className="mt-3" onSubmit={handleSubmit}>
        <label className="d-block subtitle mb-2" htmlFor="company">Correo electrónico
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Dirección de correo"
            className="input"
            value={email}
            onChange={(event) => validate('email', event.target.value)}
            required
          />
          {errorEmail.status && <span className={`text-sm ${styles.error}`}>{errorEmail.text}</span>}
        </label>
        <label className="d-block subtitle mb-2" htmlFor="company">Rol de usuario
          <select
            id="rol"
            name="rol"
            placeholder="Selecciona uno"
            className="select"
            value={rol}
            onChange={(event) => validate('rol', event.target.value)}
            required
          >
            <option value="">Selecciona uno</option>
            <option value="admin">Administrador</option>
            <option value="user-author">Colaborador</option>
            <option value="user-reviewer">Curador</option>
            <option value="user-premium">Premium</option>
          </select>
          {errorRol.status && <span className={`text-sm ${styles.error}`}>{errorRol.text}</span>}
        </label>
        <div className="row justify-content-end">
          <div className="col-auto mt-3">
            <button className="button button--theme-primary" onClick={handleSubmit} type="submit">
              Enviar invitación
            </button>
          </div>
        </div>
      </form>
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => setModalLoading(false)}
        textHeader="Enviando invitación..."
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={modalSucces}
        onClose={() => setModalSucces(false)}
        textHeader="Invitación enviada"
        textBody="La invitación ha sido enviada correctamente."
      />
      <ErrorIndicatorModal
        show={modalError}
        onClose={() => setModalError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Algo ha salido mal, revisa tus datos y vuelve a intentarlo más tarde. Es probable que ya se enviará una invitación a este correo."
      />
    </div>
  );
};

export default InviteMemberForm;
