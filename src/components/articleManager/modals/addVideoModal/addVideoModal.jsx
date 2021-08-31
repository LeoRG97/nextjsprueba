import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';

import styles from './modaVideo.module.css';

const ModalVideo = (props) => {
  const {
    addVideo, showModal, show, updateEvent, editInfo, updateFunctionEvent,
  } = props;

  const [inputLink, setData] = useState('');
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
      }

      if (iframeContentStart) {
        setEmbed(true);
      } else {
        setEmbed(false);
      }
    } else if (validURL(e.target.value)) {
      setEmbed(false);
      setDisable(false);
      setInvalid(false);
    }
  };

  const callsFunctions = (e) => {
    handleChange(e);
  };

  const callsFunctVideo = () => {
    addVideo(inputLink, embedIframe);
    setData('');
    setEmbed(false);
    setInvalid(false);
  };

  const callsUpdateFunctVideo = () => {
    updateFunctionEvent(inputLink, editInfo.idContent, embedIframe);
    setData('');
    setEmbed(false);
    setInvalid(false);
  };

  useEffect(() => {
    if (updateEvent) {
      setDisable(false);
      if (editInfo.type) {
        setEmbed(true);
      } else {
        setEmbed(false);
      }
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
        className={styles.modal_video}
        id="modalVideo"
      >
        <Modal.Header className={`${styles.modal_video_backC} ${styles.modal_video_title} `}>
          <Modal.Title>
            <h1 className="title ">Incrustar video</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${styles.modal_video_backC} ${styles.modal_video_body} `}>
          <label className="subtitle text--theme-light">Enlace</label>
          <input
            className="input"
            type="url"
            pattern="https://.*"
            placeholder="Link del video o código de incrustación"
            required
            onChange={callsFunctions}
            value={inputLink}
          />
          {
            (invalidLink)
              ? (<label className="text-sm text--theme-error">URL &oacute; IFRAME invalido</label>) : (<> </>)
          }
          <label className="text-sm">Puedes incrustar videos desde: YouTube o Vimeo.</label>
        </Modal.Body>
        <Modal.Footer className={`${styles.modal_video_backC} ${styles.modal_video_footer} `}>
          <button className="Btn-cancel" onClick={() => showModal()}>
            cancelar
          </button>
          {
            (updateEvent) ? (
              <button className="Btn-add" onClick={callsUpdateFunctVideo} disabled={disable}>Actualizar</button>
            ) : (<button className="Btn-add" onClick={callsFunctVideo} disabled={disable}>Incrustar</button>)
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalVideo.propTypes = {
  show: PropTypes.bool.isRequired,
  updateEvent: PropTypes.bool,
  showModal: PropTypes.func.isRequired,
  addVideo: PropTypes.func.isRequired,
  updateFunctionEvent: PropTypes.func.isRequired,
  editInfo: PropTypes.shape({
    idContent: PropTypes.string,
    tagEdit: PropTypes.string,
    type: PropTypes.string,
  }),
};

ModalVideo.defaultProps = {
  editInfo: { idContent: '', tagEdit: '' },
  updateEvent: false,
};

export default ModalVideo;
