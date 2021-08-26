/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import { OverlayTrigger } from 'react-bootstrap';
import styles from './tools.module.css';

const ToolsComponent = ({
  option, renderTooltip, addTextFunct, setModalShowVideo, setModalShow, addedVideo, addedAudio,
}) => {
  const optionBottons = (optionRender) => {
    const enableVideo = addedVideo;
    const enableAudio = addedAudio;
    switch (optionRender) {
      case '':
        return (
          <div className={styles.tools}>
            <section>
              <div className={`${styles.files} text-md`}>Insertar</div>
            </section>
            <section className={`${styles.tools_select} `}>
              <div className="dropdown">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 200 }}
                  overlay={renderTooltip('Texto')}
                >
                  <div className="dropdown-select">
                    <span id="select-span" className="text-sm">T<small>T</small></span>
                    <i className="icon">1</i>
                  </div>
                </OverlayTrigger>
                <input type="hidden" name="option" />
                <ul className="select-dropdown">
                  <li className="text-sm" id="h1" onClick={() => addTextFunct('h1')}>
                    Cabecera
                  </li>
                  <li className="text-sm" id="h3" onClick={() => addTextFunct('h3')}>
                    Subcabecera
                  </li>
                  <li className="text-sm" id="p" onClick={() => addTextFunct('p')}>
                    Párrafo
                  </li>
                  <li className="text-sm" id="small" onClick={() => addTextFunct('small')}>
                    Pie de texto
                  </li>
                </ul>
              </div>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={renderTooltip('Imagen')}
              >
                <div className={`icon ${styles.tools_media}`}>E</div>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={renderTooltip('Video')}
              >
                <div
                  className={`icon ${styles.tools_media}`}
                  onClick={() => setModalShowVideo(true)}
                >F
                </div>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={renderTooltip('Audio')}
              >
                <div
                  onClick={() => setModalShow(true)}
                  className={`icon ${styles.tools_media}`}
                >
                  G
                </div>
              </OverlayTrigger>
            </section>
          </div>
        );
      case 'onlyVideo':
        return (
          <>
            {
              (!enableVideo) ? (
                <div className={styles.tools}>
                  <section>
                    <div className={`${styles.files} text-md`}>Insertar</div>
                  </section>
                  <section className={`${styles.tools_select} `}>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 200 }}
                      overlay={renderTooltip('Video')}
                    >
                      <div
                        className={`icon ${styles.tools_media}`}
                        onClick={() => setModalShowVideo(true)}
                      >F
                      </div>
                    </OverlayTrigger>
                  </section>
                </div>
              ) : (<></>)
            }
            <div className={styles.tools}>
              <section>
                <div className={`${styles.files} text-md`}>Insertar</div>
              </section>
              <section className={`${styles.tools_select} `}>
                <div className="dropdown no-m">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 200 }}
                    overlay={renderTooltip('Texto')}
                  >
                    <div className="dropdown-select">
                      <span id="select-span" className="text-sm">T<small>T</small></span>
                      <i className="icon">1</i>
                    </div>
                  </OverlayTrigger>
                  <input type="hidden" name="option" />
                  <ul className="select-dropdown">
                    <li className="text-sm" id="h1" onClick={() => addTextFunct('h1')}>
                      Cabecera
                    </li>
                    <li className="text-sm" id="h3" onClick={() => addTextFunct('h3')}>
                      Subcabecera
                    </li>
                    <li className="text-sm" id="p" onClick={() => addTextFunct('p')}>
                      Párrafo
                    </li>
                    <li className="text-sm" id="small" onClick={() => addTextFunct('small')}>
                      Pie de texto
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </>
        );
      case 'onlyAudio':
        return (
          <>
            {
              (!enableAudio) ? (
                <div className={styles.tools}>
                  <section>
                    <div className={`${styles.files} text-md`}>Insertar</div>
                  </section>
                  <section className={`${styles.tools_select} `}>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 200 }}
                      overlay={renderTooltip('Audio')}
                    >
                      <div
                        onClick={() => setModalShow(true)}
                        className={`icon ${styles.tools_media}`}
                      >
                        G
                      </div>
                    </OverlayTrigger>
                  </section>
                </div>
              ) : (<></>)
            }
            <div className={styles.tools}>
              <section>
                <div className={`${styles.files} text-md`}>Insertar</div>
              </section>
              <section className={`${styles.tools_select} `}>
                <div className="dropdown no-m">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 200 }}
                    overlay={renderTooltip('Texto')}
                  >
                    <div className="dropdown-select">
                      <span id="select-span" className="text-sm">T<small>T</small></span>
                      <i className="icon">1</i>
                    </div>
                  </OverlayTrigger>
                  <input type="hidden" name="option" />
                  <ul className="select-dropdown">
                    <li className="text-sm" id="h1" onClick={() => addTextFunct('h1')}>
                      Cabecera
                    </li>
                    <li className="text-sm" id="h3" onClick={() => addTextFunct('h3')}>
                      Subcabecera
                    </li>
                    <li className="text-sm" id="p" onClick={() => addTextFunct('p')}>
                      Párrafo
                    </li>
                    <li className="text-sm" id="small" onClick={() => addTextFunct('small')}>
                      Pie de texto
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </>
        );
      default:
        return (<> </>);
    }
  };

  return (
    <div>
      {optionBottons(option)}
    </div>
  );
};

ToolsComponent.propTypes = {
  option: PropTypes.string,
  addedVideo: PropTypes.bool,
  addedAudio: PropTypes.bool,
  renderTooltip: PropTypes.func.isRequired,
  addTextFunct: PropTypes.func.isRequired,
  setModalShowVideo: PropTypes.func.isRequired,
  setModalShow: PropTypes.func.isRequired,
};

ToolsComponent.defaultProps = {
  option: '',
  addedVideo: false,
  addedAudio: false,
};

export default ToolsComponent;
