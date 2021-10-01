import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import { BUCKET_URL } from '@/global/constants';
import styles from '@/global/styles/Home.module.css';

const HomePage = ({ articulos }) => {
  const [optionSelect, setData] = useState(1);
  const [imgBackg, setImg] = useState(1);
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
      urlImg = '/images/imgpr2.jpg';
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
      setBackgroundImage();
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
      setBackgroundImage();
    }, 500);
  };

  const checkActiveOption = (option) => {
    if (optionSelect !== option) {
      return styles.non;
    }
    return styles.active;
  };

  useEffect(() => {
    setBackgroundImage();
  }, []);

  return (
    <Container fluid className={styles.content_no_padd}>
      <Container
        fluid
        className={styles.content_title}
        style={{ backgroundImage: `url(${imgBackg})` }}
      >
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
            articulos.map((item, index) => {
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
                              <Link href={`trending-topics/${item.usuario_id[0].slug}/${item.slug}`}>
                                <a>
                                  <button className="Btn-outline-light">Ir a la publicación</button>
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
          }
          <Row className="my-4">
            <div className={`${styles.content_left} ${styles.margin_movil_y}`}>
              <span className={`${styles.buton_m} icon Btn-round-light`} onClick={handleBefore}>a</span>
              <span className={`${styles.buton_m} icon Btn-round-light`} onClick={handleAfter}>b</span>
            </div>
          </Row>
          <Row>
            <div className={`${styles.content_centered} ${styles.content_more} `}>
              <p className="title">Descubre más publicaciones</p>
              <Link href="trending-topics/" passHref>
                <a>
                  <button className="Btn-outline-light faint">Ver más</button>
                </a>
              </Link>
            </div>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row>
          <div className={`${styles.content_centered} ${styles.content_margin}`}>
            <p className="text-md text--theme-secondary">Bienvenido al observatorio</p>
            <h2 className="title-xl">Hay más de una forma <br />en la que podemos ayudarte</h2>
            <Link href="/nosotros" passHref>
              <a>
                <button className="Btn-outline-light faint">Acerca de nosotros</button>
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
              <button className="button button--theme-primary">Trending topics</button>
            </div>
          </Col>
          <Col xl="4" lg="4" sm="12">
            <div className={`${styles.content_centered} mb-4`}>
              <div className={`${styles.iconOutline} ${styles.faintOutlineYellow}`}>
                <span className={`icon icon--theme-yellow ${styles.largeIcon}`}>e</span>
              </div>
              <p className="title">Desarrolla<br />nuevas habilidades</p>
              <button className="button button--theme-primary">Think tools</button>
            </div>
          </Col>
          <Col xl="4" lg="4" sm="12">
            <div className={`${styles.content_centered} mb-4`}>
              <div className={`${styles.iconOutline} ${styles.faintOutlinePrimary}`}>
                <span className={`icon icon--theme-primary ${styles.largeIcon}`}>d</span>
              </div>
              <p className="title">Comparte<br />tu opinión</p>
              <button className="button button--theme-primary">Think team</button>
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
              <button className="button button--theme-primary">Buscar expertos</button>
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
