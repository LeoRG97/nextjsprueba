import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';

import styles from './modalLink.module.css';

const ModalLink = (props) => {
  const {
    addLink, showModal, show, updateEvent, editInfo, updateLinkFunc,
  } = props;

  const [inputLink, setData] = useState('');
  const [name, setName] = useState('');
  const [embedIframe, setEmbed] = useState(false);
  const [disable, setDisable] = useState(true);
  const [invalidLink, setInvalid] = useState(false);
  const [invalidName, setInvalidName] = useState(false);

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
    if (e.target.value !== '' && e.target.value !== undefined && e.target.value.length !== 0) {
      if (validURL(e.target.value)) {
        setDisable(false);
        setInvalid(false);
        setData(e.target.value);
      } else {
        setData(e.target.value);
        setDisable(true);
        setInvalid(true);
      }
    } else {
      setData(e.target.value);
      setDisable(true);
      setInvalid(true);
    }
  };

  const handleChangeName = (e) => {
    e.persist();
    if (e.target.value !== '' && e.target.value !== undefined && e.target.value.length !== 0) {
      setInvalidName(false);
      setName(e.target.value);
    } else {
      setInvalidName(true);
      setName(e.target.value);
    }
  };

  const callsFunctions = (e, type) => {
    if (type === 'link') {
      handleChange(e);
    } else if (type === 'name') {
      handleChangeName(e);
    }
  };

  const callsFunctLink = () => {
    if (inputLink !== '' && name !== '') {
      const htmlLink = `<a target="_blank" href="${inputLink}">${name || inputLink}</a>`;
      addLink(htmlLink, embedIframe);
      setData('');
      setName('');
      setEmbed(false);
      setDisable(true);
      setInvalid(false);
    }
  };

  useEffect(() => {
    if (updateEvent && show) {
      setDisable(false);
      if (editInfo.type) {
        setEmbed(true);
      } else {
        setEmbed(false);
      }
      const element = new DOMParser().parseFromString(editInfo.tagEdit, 'text/html');
      const link = element.querySelector('a');
      setData(link.href);
      setName(link.innerHTML);
    }
  }, [editInfo, updateEvent, showModal]);

  const handleUpdateLinkFunc = () => {
    updateLinkFunc(editInfo.idContent, { name, inputLink });
    setName('');
    setData('');
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={() => showModal}
        backdrop="static"
        keyboard={false}
        centered
        className={styles.modal_video}
        id="modalLink"
      >
        <Modal.Header className={`${styles.modal_video_backC} ${styles.modal_video_title} `}>
          <Modal.Title>
            <h1 className="title ">Incrustar enlace</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${styles.modal_video_backC} ${styles.modal_video_body} `}>
          <div className="mt-2">
            <label className="subtitle text--theme-light">Enlace</label>
            <input
              className="input"
              type="url"
              pattern="https://.*"
              placeholder="Link"
              required
              onChange={(event) => callsFunctions(event, 'link')}
              value={inputLink}
            />
            {
              (invalidLink)
                ? (<label className="text-sm text--theme-error">URL invalida</label>) : (<> </>)
            }
          </div>
          <div className="mt-2">
            <label className="subtitle text--theme-light mt-3">Nombre del enlace</label>
            <input
              className="input"
              type="text"
              placeholder="Nombre del enlace"
              required
              onChange={(event) => callsFunctions(event, 'name')}
              value={name}
            />
            {
              (invalidName === '')
                ? (<label className="text-sm text--theme-error">Introduce el nombre del link</label>) : (<> </>)
            }
          </div>
        </Modal.Body>
        <Modal.Footer className={`${styles.modal_video_backC} ${styles.modal_video_footer} `}>
          <button className="button button--theme-secondary" onClick={() => showModal()}>
            Cancelar
          </button>
          {
            (updateEvent) ? (
              <button className="button button--theme-primary" onClick={handleUpdateLinkFunc} disabled={disable}>Actualizar</button>
            ) : (<button className="button button--theme-primary" onClick={callsFunctLink} disabled={disable}>Incrustar</button>)
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalLink.propTypes = {
  show: PropTypes.bool.isRequired,
  updateEvent: PropTypes.bool,
  showModal: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
  editInfo: PropTypes.shape({
    idContent: PropTypes.string,
    tagEdit: PropTypes.string,
    type: PropTypes.string,
  }),
};

ModalLink.defaultProps = {
  editInfo: { idContent: '', tagEdit: '' },
  updateEvent: false,
};

export default ModalLink;
