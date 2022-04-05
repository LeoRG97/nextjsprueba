/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-danger */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import styles from '../editor.module.css';
import { BUCKET_URL } from '@/global/constants';
import { getProfile } from '@/services/profile';

const EditorPreviewComponent = ({ initialData, initialContent }) => {
  const [autor, setAutor] = useState({});
  const target = useRef(null);
  const [session] = useSession();
  const authorInfo = async (idAutor) => {
    const res = await getProfile(idAutor);
    if (res._id) {
      setAutor({
        nombre: `${res.name} ${res.apellidos}`,
        picture: res.picture,
      });
    } else {
      setAutor({
        nombre: session && session.user ? session.user.name : 'Nombre del autor',
        picture: '/images/profile/no-profile-img.png',
      });
    }
  };
  useEffect(() => {
    if (initialData && initialData.usuario_id) {
      authorInfo(initialData.usuario_id);
    }
  }, [initialData]);

  const dateNow = new Date();

  const converDate = (date) => {
    const dateFormat = new Date(date);
    let formattedDate = Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(dateFormat);
    formattedDate = formattedDate.toString();
    formattedDate = formattedDate.replace('January', 'Enero');
    formattedDate = formattedDate.replace('February', 'Febrero');
    formattedDate = formattedDate.replace('March', 'Marzo');
    formattedDate = formattedDate.replace('April', 'Abril');
    formattedDate = formattedDate.replace('May', 'Mayo');
    formattedDate = formattedDate.replace('June', 'Junio');
    formattedDate = formattedDate.replace('July', 'Julio');
    formattedDate = formattedDate.replace('August', 'Agosto');
    formattedDate = formattedDate.replace('September', 'Septiembre');
    formattedDate = formattedDate.replace('October', 'Octubre');
    formattedDate = formattedDate.replace('November', 'Noviembre');
    formattedDate = formattedDate.replace('December', 'Diciembre');
    return formattedDate;
  };

  const renderCode = (item) => {
    if (item.type === 'linkVideo') {
      return (
        <div className="content-video">
          <iframe src={item.tag} title="video" />
        </div>
      );
    }
    if (item.type === 'image' || item.type === 'iframeAudio' || item.type === 'iframeVideo') {
      return (<div className="article-content-center" dangerouslySetInnerHTML={{ __html: item.tag }} />);
    }
    return (
      <div>
        <div className="select-area" dangerouslySetInnerHTML={{ __html: item.tag }} ref={target} />
      </div>
    );
  };
  return (
    <>
      <div className={styles.editorContent}>
        <Container className={styles.editorContentPreview}>
          <h3 className="title-editor-xl">{initialData && initialData.portada && initialData.portada.titulo ? initialData.portada.titulo : 'Título'}</h3>
          <p className="subtitle-editor">{initialData && initialData.portada && initialData.portada.descripcion ? initialData.portada.descripcion : 'Descripción'}</p>
          {
            initialData && initialData.usuario_id ? (
              <Row className="m-0">
                <Col className="col-12" xl="12" lg="12">
                  <Row>
                    <Image
                      width="45"
                      height="45"
                      layout="fixed"
                      src={autor && autor.picture ? autor.picture : '/images/profile/no-profile-img.png'}
                      className={styles.author_pict}
                    />
                    <Col>
                      <h3 className="text-md">{autor && autor.nombre ? autor.nombre : 'Nombre del autor'}</h3>
                      <label className="text-sm">{initialData && initialData.createdAt ? converDate(initialData.createdAt) : converDate(dateNow)}</label>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Row className="m-0">
                <Col className="col-12" xl="12" lg="12">
                  <Row>
                    <Image
                      width="45"
                      height="45"
                      layout="fixed"
                      src={session && session.user && session.user.picture ? session.user.picture : '/images/profile/no-profile-img.png'}
                      className={styles.author_pict}
                    />
                    <Col>
                      <h3 className="text-md">{session && session.user && session.user.name ? session.user.name : 'Nombre del autor'}</h3>
                      <label className="text-sm">{converDate(dateNow)}</label>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }

          {initialData && initialData.portada && initialData.portada.ruta_imagen && (
            <div className={`${styles.cover_gradient} mt-2`}>
              <Image
                src={`${BUCKET_URL}${initialData.portada.ruta_imagen}`}
                alt={initialData.portada.titulo}
                layout="responsive"
                objectFit="cover"
                width={720}
                height={480}
              />
            </div>
          )}
          <div className="article-content article-preview-content mt-2 pt-0">
            {
              (initialContent.html && initialContent.html.length !== 0)
                ? (initialContent.html.map((item) => {
                  return (
                    <div key={item.id}>
                      {renderCode(item)}
                    </div>
                  );
                })) : (<></>)
            }
          </div>
        </Container>
      </div>
    </>
  );
};

export default EditorPreviewComponent;
