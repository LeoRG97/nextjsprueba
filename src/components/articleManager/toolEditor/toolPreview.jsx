/* eslint-disable react/no-danger */
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { ToolContext } from '@/helpers/contexts/toolContext';
import { BUCKET_URL } from '@/global/constants';
import TooltipContainer from '../editorComponents/tooltipContainer/TooltipContainer';
import styles from '../editor.module.css';

const ToolPreview = ({ setPreview, preview }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const {
    formData,
    definition,
    justification,
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
    <>
      <div className={styles.editor}>
        <Container fluid className="d-flex justify-content-center">
          <div className={styles.editorContentP}>
            <div align="center">
              <Container className={styles.content_tool}>
                <div className={styles.centered}>
                  {formData.categoria ? (
                    <div>
                      <h5 className={`title ${styles.content_title}`}>
                        {formData.categoria}
                      </h5>
                      <p className="subtitle">{formData.objetivo}</p>
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
                <Image
                  src={previewUrl}
                  alt="preview"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <div />
            )}
            {definition.html.length > 0 ? (
              <div className={styles.previewMargin}>
                <h1 className="title-xl">¿Qué es?</h1>
              </div>
            ) : (
              <div />
            )}
            {definition.html.length > 0 ? (
              definition.html.map((item, i) => {
                return i === 0 ? (
                  <div key={`preview-0-${[item.id]}`}>
                    <div
                      className="text-md"
                      // align="center"
                      dangerouslySetInnerHTML={{
                        __html: item.tag,
                      }}
                    />
                    <div className={styles.previewMargin} />
                  </div>
                ) : (
                  <div key={`preview-0-${[item.id]}`}>
                    <div
                      className="text-md"
                      // align="center"
                      dangerouslySetInnerHTML={{
                        __html: item.tag,
                      }}
                    />
                    <div className={styles.previewMargin} />
                  </div>
                );
              })
            ) : (
              <div />
            )}
            {justification.html.length > 0
              && (
                <div className={styles.previewMargin}>
                  <h5 className="title">¿Por qué debería usarlo?</h5>
                </div>
              )}
            {justification.html.map((item) => {
              return (
                <div key={`preview-2-${[item.id]}`}>
                  <div
                    className="text-md"
                    dangerouslySetInnerHTML={{
                      __html: item.tag,
                    }}
                  />
                </div>
              );
            })}
            {usage.html.length > 0
              && (
                <div className={styles.previewMargin}>
                  <h5 className="title">¿Cómo lo uso?</h5>
                </div>
              )}
            {usage.html.map((item) => {
              return (
                <div key={`preview-2-${[item.id]}`}>
                  <div
                    className="text-md"
                    dangerouslySetInnerHTML={{
                      __html: item.tag,
                    }}
                  />
                </div>
              );
            })}
          </div>

        </Container>
      </div>
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
    </>
  );
};

export default ToolPreview;
