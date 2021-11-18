/* eslint-disable react/no-danger */
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BUCKET_URL } from '@/global/constants';
import styles from './tools.module.css';
import TooltipContainer from '../articleManager/editorComponents/tooltipContainer/TooltipContainer';

const ToolsContent = ({ toolsInfo, toolsCode }) => {
  const [viewButton, setViewButton] = useState(true);

  const setImage = (url) => {
    let stylleImg = null;
    if (url.includes(BUCKET_URL)) {
      stylleImg = url;
    } else {
      stylleImg = `${BUCKET_URL}${url}`;
    }
    return stylleImg;
  };

  const checkscroll = () => {
    const elm = document.querySelector('footer');
    if (elm) {
      const domRect = elm.getBoundingClientRect();
      if (domRect) {
        if (domRect.top < 450) {
          setViewButton(false);
        } else {
          setViewButton(true);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkscroll);
    return () => {
      window.removeEventListener('scroll', checkscroll);
    };
  }, []);

  return (
    <div className="texture-top">
      <Container fluid className="content-n-p">
        <div>
          <Container className={styles.content_tool}>
            <div className={styles.centered}>
              <h5 className={`title ${styles.content_title}`}>
                {/* <span className={`icon ${styles.doots}`}>h</span> */}
                {toolsInfo.categoria}
                {/* <span className={`icon ${styles.doots}`}>j</span> */}
              </h5>
              <p className="text-md text-bold">{toolsInfo.objetivo}</p>
              <Link href="/think-tools" passHref>
                <a>
                  <button className="button button--theme-warning"><span className="button__icon-left text--theme-warning">9</span>Explorar más herramientas</button>
                </a>
              </Link>
            </div>
          </Container>
        </div>
        <Container className={`${styles.content_tool} ${styles.no_top}`}>
          <Row>
            <Col lg="2" className="col-1"> </Col>
            <Col lg="8" className="col-12">
              <div className={`${styles.centered} ${styles.content_tool_title}`}>
                <h1 className="title-xl">{toolsInfo.nombre}</h1>
                <Image
                  src={setImage(toolsInfo.url_imagen)}
                  alt={toolsInfo.nombre}
                  layout="responsive"
                  objectFit="contain"
                  width={720}
                  height={460}
                />
              </div>
              <Row className={styles.content_inspired}>
                <Col className="col-6">
                  {toolsInfo.creditos && (
                    <>
                      <p className="text-md">Inspirado en:</p>
                      <p className="text-sm ">{toolsInfo.creditos}</p>
                    </>
                  )}
                </Col>
                <Col className={`col-6 ${styles.right}`}>
                  {toolsInfo.recursos && toolsInfo.recursos.length > 0 && (
                    <a href={`${BUCKET_URL}${toolsInfo.recursos[0].ruta}`} target="_blank" rel="noreferrer">
                      <button className="button button--theme-primary">Descargar</button>
                    </a>
                  )}
                </Col>
              </Row>
              <Row className={styles.content_info_tool}>
                <Col>
                  {toolsCode.definition.html && toolsCode.definition.html.length > 0 && <h5 className="title-xl">¿Qué es?</h5>}
                  {
                    toolsCode && toolsCode.definition && (
                      toolsCode.definition.html.map((item) => {
                        return (
                          <div key={item.id}>
                            <div dangerouslySetInnerHTML={{ __html: item.tag }} />
                          </div>
                        );
                      })
                    )
                  }
                  {
                    toolsCode && toolsCode.justification && toolsCode.justification.html
                    && toolsCode.justification.html.length > 0 && <h5 className={`title ${styles.content_title_use}`}>¿Por qué debería de usarlo?</h5>
                  }
                  {
                    toolsCode && toolsCode.justification && toolsCode.justification.html
                    && toolsCode.justification.html.length > 0 && (
                      toolsCode.justification.html.map((item) => {
                        return (
                          <div key={item.id}>
                            <div dangerouslySetInnerHTML={{ __html: item.tag }} />
                          </div>
                        );
                      })
                    )
                  }
                  {
                    toolsCode && toolsCode.usage && toolsCode.usage.html
                    && toolsCode.usage.html.length > 0 && <h5 className={`title ${styles.content_title_use}`}>¿Cómo se usa?</h5>
                  }
                  {
                    toolsCode && toolsCode.usage && (
                      toolsCode.usage.html.map((item) => {
                        return (
                          <div key={item.id}>
                            <div dangerouslySetInnerHTML={{ __html: item.tag }} />
                          </div>
                        );
                      })
                    )
                  }
                </Col>
              </Row>

            </Col>
            <Col lg="2" className="col-1">
              <div className={`content-fixed rigth ${styles.floatingContent}`}>
                {viewButton && toolsInfo.recursos.length > 0 && (
                  <a href={`${BUCKET_URL}${toolsInfo.recursos[0].ruta}`} target="_blank" rel="noreferrer">
                    <TooltipContainer placement="left" tooltipText="Descargar">
                      <button
                        onClick={() => {}}
                        className="icon-button icon-button--primary m-2"
                      >
                        i
                      </button>
                    </TooltipContainer>
                  </a>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default ToolsContent;
