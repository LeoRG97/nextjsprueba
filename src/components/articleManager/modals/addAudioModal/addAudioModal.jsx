import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';

import styles from './modalAudio.module.css';

const ModalAudio = (props) => {
  const {
    addAudio, showModal, show, updateFunctionEvent, editInfo, updateEvent,
  } = props;

  const [inputLink, setData] = useState('');
  const [inputLinkOut, setDataOut] = useState('');
  const [embedIframe, setEmbed] = useState(false);
  const [disable, setDisable] = useState(true);
  const [invalidLink, setInvalid] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setData(e.target.value);
    if (e.target.value !== '' && e.target.value !== undefined && e.target.value.length !== 0) {
      setDisable(false);
    } else {
      setDisable(true);
      setInvalid(true);
    }

    const iframeContentStart = e.target.value.startsWith('<iframe');
    const iframeContentEnd = e.target.value.endsWith('></iframe>');
    if (!iframeContentStart || !iframeContentEnd) {
      setDisable(true);
      setInvalid(true);
    } else {
      setDisable(false);
      setInvalid(false);
      setDataOut(e.target.value);
    }
  };

  const callsFunctions = (e) => {
    handleChange(e);
  };

  const callsFunctAudio = () => {
    addAudio(inputLinkOut, embedIframe);
    setData('');
    setEmbed(false);
    setInvalid(false);
  };

  const callsUpdateFunctAudio = () => {
    updateFunctionEvent(inputLinkOut, editInfo.idContent, editInfo.type);
    setData('');
    setEmbed(false);
    setInvalid(false);
  };

  useEffect(() => {
    if (updateEvent) {
      setDisable(false);
      setData(editInfo.tagEdit);
    }
  }, [editInfo, updateEvent]);

  return (
    <div>
      <Modal
        show={show}
        onHide={() => showModal}
        backdrop="static"
        keyboard={false}
        centered
        className={styles.modal_audio}
        id="modalAudio"
      >
        <Modal.Header className={`${styles.modal_audio_backC} ${styles.modal_audio_title} `}>
          <Modal.Title>
            <h1 className="title ">Incrustar audio</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${styles.modal_audio_backC} ${styles.modal_audio_body} `}>
          <label className="subtitle text--theme-light">Código de incrustación</label>
          <input
            className="input"
            type="url"
            pattern="https://.*"
            placeholder="Código de incrustación"
            required
            onChange={callsFunctions}
            value={inputLink}
          />
          {
            (invalidLink)
              ? (<p className="text-sm text--theme-error">IFRAME invalido </p>) : (<> </>)
          }
          <label className="text-sm">Puedes incrustar audios desde: Spotify o Tidal.</label>
        </Modal.Body>
        <Modal.Footer className={`${styles.modal_audio_backC} ${styles.modal_audio_footer} `}>
          <button className="button button--theme-secondary" onClick={() => showModal()}>
            Cancelar
          </button>
          {
            (updateEvent) ? (
              <button className="button button--theme-primary" onClick={callsUpdateFunctAudio} disabled={disable}>Actualizar</button>
            ) : (<button className="button button--theme-primary" onClick={callsFunctAudio} disabled={disable}>Incrustar</button>)
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalAudio.propTypes = {
  show: PropTypes.bool.isRequired,
  updateEvent: PropTypes.bool,
  showModal: PropTypes.func.isRequired,
  addAudio: PropTypes.func.isRequired,
  updateFunctionEvent: PropTypes.func.isRequired,
  editInfo: PropTypes.shape({
    idContent: PropTypes.string,
    tagEdit: PropTypes.string,
    type: PropTypes.string,
  }),
};

ModalAudio.defaultProps = {
  editInfo: { idContent: '', tagEdit: '' },
  updateEvent: false,
};

export default ModalAudio;
