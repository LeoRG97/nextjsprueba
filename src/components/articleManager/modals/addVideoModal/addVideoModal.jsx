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
    }

    if (iframeContentStart) {
      setEmbed(true);
    } else {
      setEmbed(false);
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
              ? (<p className="text-sm text--theme-error">IFRAME invalido</p>) : (<> </>)
          }
          <label className="text-sm">Puedes incrustar videos desde: YouTube o Vimeo.</label>
        </Modal.Body>
        <Modal.Footer className={`${styles.modal_video_backC} ${styles.modal_video_footer} `}>
          <button className="button button--theme-secondary" onClick={() => showModal()}>
            Cancelar
          </button>
          {
            (updateEvent) ? (
              <button className="button button--theme-primary" onClick={callsUpdateFunctVideo} disabled={disable}>Actualizar</button>
            ) : (<button className="button button--theme-primary" onClick={callsFunctVideo} disabled={disable}>Incrustar</button>)
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
