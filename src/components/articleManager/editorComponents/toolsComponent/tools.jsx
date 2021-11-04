/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import TooltipContainer from '../tooltipContainer/TooltipContainer';
import styles from './tools.module.css';

const ToolsComponent = ({
  option,
  addTextFunct,
  setModalShowVideo,
  setModalShow,
  addedVideo,
  addedAudio,
  addImage,
  setModalShowLink,
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
                <TooltipContainer placement="top" tooltipText="Texto">
                  <div className="dropdown-select">
                    <span id="select-span" className="text-sm">T<small>T</small></span>
                    <i className="icon">1</i>
                  </div>
                </TooltipContainer>
                <input type="hidden" name="option" />
                <div className="select-dropdown">
                  <div className="drop-item text-sm" id="h1" onClick={() => addTextFunct('h1')}>
                    Cabecera
                  </div>
                  <div className="drop-item text-sm" id="h3" onClick={() => addTextFunct('h3')}>
                    Subcabecera
                  </div>
                  <div className="drop-item text-sm" id="p" onClick={() => addTextFunct('p')}>
                    Párrafo
                  </div>
                  <div className="drop-item text-sm" id="small" onClick={() => addTextFunct('small')}>
                    Pie de texto
                  </div>
                </div>
              </div>
              <TooltipContainer placement="top" tooltipText="Imagen">
                <span className={styles.tools_img_content}>
                  <label htmlFor="imagenAdd" id="labelInput">
                    <div className={`icon ${styles.tools_media}`}>E</div>
                  </label>
                  <input className={styles.tools_img} accept="image/png,image/jpeg,image/jpeg" id="imagenAdd" size="60" type="file" placeholder="Imagen" autoComplete="off" name="imagenAdd" required="required" onChange={(event) => addImage(event)} />
                </span>

              </TooltipContainer>

              <TooltipContainer placement="top" tooltipText="Video">
                <div
                  className={`icon ${styles.tools_media}`}
                  onClick={() => setModalShowVideo(true)}
                >F
                </div>
              </TooltipContainer>

              <TooltipContainer placement="top" tooltipText="Audio">
                <div
                  onClick={() => setModalShow(true)}
                  className={`icon ${styles.tools_media}`}
                >
                  G
                </div>
              </TooltipContainer>

              <TooltipContainer placement="top" tooltipText="Link">
                <div
                  onClick={() => setModalShowLink(true)}
                  className={`icon ${styles.tools_media}`}
                >
                  l
                </div>
              </TooltipContainer>
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
                    <TooltipContainer placement="top" tooltipText="Video">
                      <div
                        className={`icon ${styles.tools_media}`}
                        onClick={() => setModalShowVideo(true)}
                      >F
                      </div>
                    </TooltipContainer>
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
                  <TooltipContainer placement="top" tooltipText="Texto">
                    <div className="dropdown-select">
                      <span id="select-span" className="text-sm">T<small>T</small></span>
                      <i className="icon">1</i>
                    </div>
                  </TooltipContainer>
                  <input type="hidden" name="option" />
                  <ul className="select-dropdown">
                    <li className="drop-item text-sm" id="h1" onClick={() => addTextFunct('h1')}>
                      Cabecera
                    </li>
                    <li className="drop-item text-sm" id="h3" onClick={() => addTextFunct('h3')}>
                      Subcabecera
                    </li>
                    <li className="drop-item text-sm" id="p" onClick={() => addTextFunct('p')}>
                      Párrafo
                    </li>
                    <li className="drop-item text-sm" id="small" onClick={() => addTextFunct('small')}>
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
                    <TooltipContainer placement="top" tooltipText="Audio">
                      <div
                        onClick={() => setModalShow(true)}
                        className={`icon ${styles.tools_media}`}
                      >
                        G
                      </div>
                    </TooltipContainer>
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
                  <TooltipContainer placement="top" tooltipText="Texto">
                    <div className="dropdown-select">
                      <span id="select-span" className="text-sm">T<small>T</small></span>
                      <i className="icon">1</i>
                    </div>
                  </TooltipContainer>
                  <input type="hidden" name="option" />
                  <ul className="select-dropdown">
                    <li className="drop-item text-sm" id="h1" onClick={() => addTextFunct('h1')}>
                      Cabecera
                    </li>
                    <li className="drop-item text-sm" id="h3" onClick={() => addTextFunct('h3')}>
                      Subcabecera
                    </li>
                    <li className="drop-item text-sm" id="p" onClick={() => addTextFunct('p')}>
                      Párrafo
                    </li>
                    <li className="drop-item text-sm" id="small" onClick={() => addTextFunct('small')}>
                      Pie de texto
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </>
        );
      case 'tool':
        return (
          <>
            {
              (!enableVideo) ? (
                <div className={styles.tools}>
                  <section>
                    <div className={`${styles.files} text-md`}>Insertar</div>
                  </section>
                  <section className={`${styles.tools_select} `}>
                    <TooltipContainer placement="top" tooltipText="Video">
                      <div
                        className={`icon ${styles.tools_media}`}
                        onClick={() => setModalShowVideo(true)}
                      >F
                      </div>
                    </TooltipContainer>
                  </section>
                </div>
              ) : (<></>)
            }
            <div className={styles.tools}>
              <section>
                <div className={`${styles.files} text-md`}>Insertar</div>
              </section>
              <section className={`${styles.tools_select} `}>
                <TooltipContainer placement="top" tooltipText="Párrafo">
                  <div
                    className={`icon ${styles.tools_media}`}
                    onClick={() => addTextFunct('p')}
                  >D
                  </div>
                </TooltipContainer>
              </section>
            </div>
          </>
        );
      case 'toolDescription':
        return (
          <div className={styles.tools}>
            <section>
              <div className={`${styles.files} text-md`}>Insertar</div>
            </section>
            <section className={`${styles.tools_select} `}>
              <TooltipContainer placement="top" tooltipText="Párrafo">
                <div
                  className={`icon ${styles.tools_media}`}
                  onClick={() => addTextFunct('p')}
                >D
                </div>
              </TooltipContainer>
            </section>
          </div>
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
  addTextFunct: PropTypes.func,
  setModalShowVideo: PropTypes.func,
  setModalShow: PropTypes.func,
  addImage: PropTypes.func,
  setModalShowLink: PropTypes.func,
};

ToolsComponent.defaultProps = {
  option: '',
  addedVideo: false,
  addedAudio: false,
  addImage: () => {},
  setModalShow: () => {},
  setModalShowVideo: () => {},
  addTextFunct: () => {},
  setModalShowLink: () => {},
};

export default ToolsComponent;
