/* eslint-disable react/no-danger */
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { ToolContext } from '@/helpers/contexts/toolContext';
import { BUCKET_URL } from '@/global/constants';
import TooltipContainer from '../editorComponents/tooltipContainer/TooltipContainer';
import styles from '../editor.module.css';

const ToolPreview = ({ setPreview, preview }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const {
    formData,
    definition,
    usage,
  } = useContext(ToolContext);
  const { portada, url_imagen } = formData;

  const handleCoverPreview = (file) => {
    setPreviewUrl('');
    if (file.type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
    }
  };

  useEffect(() => {
    if (portada) {
      handleCoverPreview(portada);
    }
  }, [portada]);

  useEffect(() => {
    if (url_imagen) {
      setPreviewUrl(`${BUCKET_URL}${url_imagen}`);
    }
  }, [url_imagen]);

  return (
    <div className={styles.editor}>
      <Container fluid>
        <Row>
          <Col md={12} lg={2} />
          <Col md={12} lg={8}>
            <div className={styles.editorContentP}>
              <div align="center">
                <Container className={styles.content_tool}>
                  <div className={styles.centered}>
                    {formData.categoria ? (
                      <div>
                        <h5 className={`title ${styles.content_title}`}>
                          <span className={`icon ${styles.doots}`}>h</span>
                          {formData.categoria}
                          <span className={`icon ${styles.doots}`}>j</span>
                        </h5>
                        <p className="text-md">{formData.objetivo}</p>
                        <Link href="/think-tools" passHref>
                          <a>
                            <button className="button button--theme-warning">
                              <span className="button__icon-left text--theme-warning">
                                9
                              </span>
                              Explorar más herramientas
                            </button>
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </Container>
              </div>
              {formData.nombre ? (
                <div align="center">
                  <div className={styles.previewMargin} />
                  <p className="title-xl">{formData.nombre}</p>
                </div>
              ) : (
                <div />
              )}
              {previewUrl ? (
                <div className={styles.previewContentImg} align="center">
                  <img
                    className={styles.imgPreview}
                    src={previewUrl}
                    alt="preview"
                  />
                </div>
              ) : (
                <div />
              )}
              {definition.html.length > 0 ? (
                <div className={styles.previewMargin}>
                  <h5 className="title-xl">¿Qué es y cómo se usa?</h5>
                </div>
              ) : (
                <div />
              )}
              {definition.html.length > 0 ? (
                definition.html.map((index, i) => {
                  return i === 0 ? (
                    <div key={`preview-0-${[i]}`}>
                      <div
                        className="text-md"
                        // align="center"
                        dangerouslySetInnerHTML={{
                          __html: definition.html[i].tag,
                        }}
                      />
                      <div className={styles.previewMargin} />
                    </div>
                  ) : (
                    <div key={`preview-1-${[i]}`}>
                      <div
                        className="text-md"
                        dangerouslySetInnerHTML={{
                          __html: definition.html[i].tag,
                        }}
                      />
                      <div className={styles.previewMargin} />
                    </div>
                  );
                })
              ) : (
                <div />
              )}
              {usage.html.length > 0 ? (
                <div className={styles.previewMargin}>
                  <h5 className="title">¿Cómo se usa?</h5>
                </div>
              ) : (
                <div />
              )}
              {usage.html.length > 0 ? (
                usage.html.map((index, i) => {
                  return (
                    <div key={`preview-2-${[i]}`}>
                      <div
                        className="text-md"
                        dangerouslySetInnerHTML={{
                          __html: usage.html[i].tag,
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <div />
              )}
            </div>
          </Col>
          <Col md={12} lg={2} />
        </Row>
      </Container>
      <div className={styles.optionsContainer}>
        {
          preview ? (
            <TooltipContainer tooltipText="Volver" placement="left">
              <div
                onClick={() => setPreview()}
                className={`icon-button icon-button--secondary ${styles.optionsItem}`}
              >
                a
              </div>
            </TooltipContainer>
          ) : (
            <TooltipContainer tooltipText="Vista previa" placement="left">
              <div
                onClick={() => setPreview()}
                className={`icon-button icon-button--secondary ${styles.optionsItem}`}
              >
                C
              </div>
            </TooltipContainer>
          )
        }
      </div>
    </div>
  );
};

export default ToolPreview;
