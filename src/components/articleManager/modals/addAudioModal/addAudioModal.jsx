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

  const validURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  };

  const handleChange = (e) => {
    e.persist();
    setData(e.target.value);
    if (e.target.value !== '' && e.target.value !== undefined && e.target.value.length !== 0) {
      setDisable(false);
    } else {
      setDisable(true);
      setInvalid(true);
    }

    if (!validURL(e.target.value)) {
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
    } else if (validURL(e.target.value)) {
      const htmlAudio = `<iframe title="audio" frameborder="0" allowtransparency="true" allow="encrypted-media" src="${e.target.value}"></iframe>`;
      setDataOut(htmlAudio);
      setEmbed(false);
      setDisable(false);
      setInvalid(false);
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
          <label className="subtitle text--theme-light">Enlace</label>
          <input
            className="input"
            type="url"
            pattern="https://.*"
            placeholder="Link del audio o código de incrustación"
            required
            onChange={callsFunctions}
            value={inputLink}
          />
          {
            (invalidLink)
              ? (<label className="text-sm text--theme-error">URL &oacute; IFRAME invalido</label>) : (<> </>)
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
