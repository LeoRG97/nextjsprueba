import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import { BUCKET_URL } from '@/global/constants';
import styles from '@/global/styles/Home.module.css';
import { NoArticles } from './NoArticles';

const HomePage = ({ articulos }) => {
  const [optionSelect, setData] = useState(1);
  const [imgBackg, setImg] = useState('');
  const [showFade, setFade] = useState(true);

  const setBackgroundImage = () => {
    let urlImg = '';
    let indx = 1;
    articulos.forEach((element) => {
      if (indx === optionSelect) {
        urlImg = element.portada.ruta_imagen;
      }
      indx += 1;
    });
    if (urlImg !== '') {
      urlImg = `${BUCKET_URL}${urlImg}`;
    } else {
      urlImg = '/images/home/Background-featured.jpeg';
    }
    setImg(urlImg);
  };

  const handleBefore = () => {
    setFade(false);
    let counter = optionSelect - 1;
    if (counter <= 0) {
      counter = articulos.length;
    }
    window.setTimeout(() => {
      setData(counter);
      setFade(true);
    }, 500);
  };

  const handleAfter = () => {
    setFade(false);
    let counter = optionSelect + 1;
    if (counter > articulos.length) {
      counter = 1;
    }
    window.setTimeout(() => {
      setData(counter);
      setFade(true);
    }, 500);
  };

  useEffect(() => {
    setBackgroundImage();
  }, [optionSelect]);

  const checkActiveOption = (option) => {
    if (optionSelect !== option) {
      return styles.non;
    }
    return styles.active;
  };

  return (
    <Container fluid className={styles.content_no_padd}>
      <Container
        fluid
        className={styles.content_title}
      >
        <>
          <Image
            src={imgBackg || '/images/home/Background-featured.jpeg'}
            alt=""
            layout="fill"
            objectFit="cover"
          />
          <Container className={styles.content_title_section}>
            <div className={`${styles.content_left}`}>
              {
                articulos.map((item, index) => {
                  const indx = index + 1;
                  return (
                    <i key={`${item._id}numb`} className={`text-md ${styles.number_option} ${checkActiveOption(indx)} mx-2`}>0{indx}</i>
                  );
                })
              }
            </div>
            {
              articulos.length > 0
                ? articulos.map((item, index) => {
                  const indx = index + 1;
                  return (
                    (indx === optionSelect) ? (
                      <Row key={item._id}>
                        <Fade opposite cascade when={showFade}>
                          <div>
                            <Row>
                              <Col xs="6" lg="6" sm="12" className={`${styles.content_left} col-12`}>
                                <p className="title-xl">{item.portada.titulo}</p>
                              </Col>
                              <Col xs="6" lg="6" sm="12" className={`${styles.content_goto} col-12`}>
                                <div>
                                  <Link href={`/trending-topics/${item.usuario_id[0].slug}/${item.slug}`}>
                                    <a>
                                      <button className="button button--theme-light">Ir a la publicación</button>
                                    </a>
                                  </Link>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Fade>
                      </Row>
                    ) : (null)
                  );
                })
                : (
                  <NoArticles />
                )
            }
            {
              articulos.length > 0 && (
                <>
                  <Row className="my-4">
                    <div className={`${styles.content_left} ${styles.margin_movil_y}`}>
                      <span className="icon-button icon-button--secondary me-3" onClick={handleBefore}>a</span>
                      <span className="icon-button icon-button--secondary" onClick={handleAfter}>b</span>
                    </div>
                  </Row>
                  <Row>
                    <div className={`${styles.content_centered} ${styles.content_more} `}>
                      <p className="title">Descubre más publicaciones</p>
                      <Link href="/trending-topics" passHref>
                        <a>
                          <button className="button button--theme-secondary">Ver más</button>
                        </a>
                      </Link>
                    </div>
                  </Row>
                </>
              )
            }

          </Container>
        </>
      </Container>
      <Container>
        <Row>
          <div className={`${styles.content_centered} ${styles.content_margin}`}>
            <p className="text-md text--theme-secondary">Bienvenido al observatorio</p>
            <h2 className="title-xl">Hay más de una forma <br />en la que podemos ayudarte</h2>
            <Link href="/about" passHref>
              <a>
                <button className="button button--theme-secondary">Acerca de nosotros</button>
              </a>
            </Link>
          </div>
        </Row>
        <Row className={styles.content_margin}>
          <Col xl="4" lg="4" sm="12">
            <div className={`${styles.content_centered} mb-4`}>
              <div className={`${styles.iconOutline} ${styles.faintOutlineSuccess}`}>
                <span className={`icon icon--theme-success ${styles.largeIcon}`}>f</span>
              </div>
              <p className="title">Aumenta<br />tu conocimiento</p>
              <Link href="/trending-topics" passHref>
                <a className="button button--theme-primary">Trending topics</a>
              </Link>
            </div>
          </Col>
          <Col xl="4" lg="4" sm="12">
            <div className={`${styles.content_centered} mb-4`}>
              <div className={`${styles.iconOutline} ${styles.faintOutlineYellow}`}>
                <span className={`icon icon--theme-warning ${styles.largeIcon}`}>e</span>
              </div>
              <p className="title">Desarrolla<br />nuevas habilidades</p>
              <Link href="/think-tools" passHref>
                <a className="button button--theme-primary">Think tools</a>
              </Link>
            </div>
          </Col>
          <Col xl="4" lg="4" sm="12">
            <div className={`${styles.content_centered} mb-4`}>
              <div className={`${styles.iconOutline} ${styles.faintOutlinePrimary}`}>
                <span className={`icon icon--theme-accent ${styles.largeIcon}`}>d</span>
              </div>
              <p className="title">Comparte<br />tu opinión</p>
              <Link href="/think-team" passHref>
                <a className="button button--theme-primary">Think team</a>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className={`${styles.content_margin} d-flex align-items-center`}>
          <Col xl="6" lg="6" sm="12" className={styles.margin_movil_y}>
            <small className="text-md text--theme-secondary">Expertos</small>
            <h2 className="title-xl">Conoce a <br />nuestros expertos</h2>
            <p className="text-md mt-4 mb-4">Más de 300 colaboradores creando y compartiendo publicaciones de
              relevancia, especialmente diseñados para mentes visionarias,
              como tú.
            </p>
            <Link href="/experts" passHref>
              <a className="button button--theme-primary">Buscar expertos</a>
            </Link>
          </Col>
          <Col xl="6" lg="6" sm="12">
            <div className={styles.expert_img}>
              <img src="/images/home/Rompecabezas.png" alt="" />
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className={styles.content_margin}> </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
