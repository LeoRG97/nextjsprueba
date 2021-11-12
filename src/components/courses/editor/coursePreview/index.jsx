/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import styles from '../courseEditor.module.css';
import { getProfile } from '@/services/profile';

const CoursePreviewComponent = ({
  initialData, initialContent,
}) => {
  const [autor, setAutor] = useState({});
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
    if (initialData && initialData.autor) {
      authorInfo(initialData.autor);
    }
  }, [initialData]);

  return (
    <>
      <Container className={styles.editorContentPreview}>
        <div className={styles.container}>
          <Row>
            <Col xs={12}>
              <div className={styles.centered}>
                <Row>
                  <Col xs={12}>
                    <h1 className="title-xl">{initialData && initialData.titulo ? initialData.titulo : 'Titulo'}</h1>
                  </Col>
                  <Col xs={12} className="text-sm">
                    <p>
                      {
                        initialData && initialData.lecciones && initialData.lecciones.length > 1 ? (`${initialData.lecciones.length} lecciones (${initialData.duracion || ''})`)
                          : (initialData && initialData.lecciones && initialData.lecciones.length > 0 && `${initialData.lecciones.length} lección (${initialData.duracion || ''})`)
                      }
                    </p>
                  </Col>
                  <Col xs={12}>
                    <div className="mt-2 mb-3">
                      {
                        initialData && initialData.url_presentacion ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: initialData.url_presentacion }}
                            className={styles.video}
                          />
                        ) : (
                          <div className={`${styles.video} ${styles.empty}`} />
                        )
                      }
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            {
              initialData && initialData.autor ? (
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
                        <label className="text-sm">Un curso de</label>
                        <h3 className="text-md">{autor && autor.nombre ? autor.nombre : 'Nombre del autor'}</h3>
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
                        <label className="text-sm">Un curso de</label>
                        <h3 className="text-md">{session && session.user && session.user.name ? session.user.name : 'Nombre del autor'}</h3>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )
            }
            <Col xs={12}>
              <div className="mt-5">
                <h1 className="title">{initialData && initialData.objetivo ? initialData.objetivo : 'Objetivo del curso'}</h1>
                <p className="text-md mt-3">{initialData && initialData.descripcion ? initialData.descripcion : 'Descripción del curso'}</p>
              </div>
            </Col>
            <Col xs={12}>
              <Container className="content-n-p content-blog-autor mt-5">
                <div className={styles.centered}>
                  <Row>
                    <Col xs={12}>
                      <h1 className="title">¿Qué encontrarás en el curso?</h1>
                      {
                        initialContent.map((unit) => {
                          return (
                            <Row className="mt-3" key={unit._id}>
                              <Col xs={6}>
                                <div className="d-flex align-items-center mb-4">
                                  <div className={styles.unitIndex}>
                                    <span className="text-regular text--theme-light">U{unit.numero}</span>
                                  </div>
                                  <h2 className="text-md mb-0">{unit.titulo}</h2>
                                </div>
                              </Col>
                              <Col xs={6}>
                                {
                                  unit.lessons && unit.lessons.map((lesson) => {
                                    return (
                                      <div className="d-flex align-items-center justify-content-between mb-2" key={lesson._id}>
                                        <div className="d-flex align-items-center">
                                          <span className="icon icon--theme-primary">F</span>
                                          <span className="px-2 text-regular text--theme-light">{lesson.nombre}</span>
                                        </div>
                                      </div>
                                    );
                                  })
                                }
                              </Col>
                              <hr className="bg-light" />
                            </Row>
                          );
                        })
                      }
                    </Col>
                  </Row>
                </div>
              </Container>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default CoursePreviewComponent;
