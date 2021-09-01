import { useState } from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/global/styles/Home.module.css';

const HomePage = () => {
  const [optionSelect, setData] = useState(1);
  const [showFade, setFade] = useState(true);

  const handleBefore = () => {
    setFade(false);
    let counter = optionSelect - 1;
    if (counter <= 0) {
      counter = 3;
    }
    window.setTimeout(() => {
      setData(counter);
      setFade(true);
    }, 500);
  };

  const handleAfter = () => {
    setFade(false);
    let counter = optionSelect + 1;
    if (counter >= 4) {
      counter = 1;
    }
    window.setTimeout(() => {
      setData(counter);
      setFade(true);
    }, 500);
  };

  const renderOption = () => {
    switch (optionSelect) {
      case 1:
        return (
          <Row>
            <Fade opposite cascade when={showFade}>
              <div>
                <Row>
                  <Col xs="6" lg="6" sm="12" className={`${styles.content_left} col-12`}>
                    <p className="title-xl">Emprender, la clave es el enfoque</p>
                  </Col>
                  <Col xs="6" lg="6" sm="12" className={`${styles.content_goto} col-12`}>
                    <div>
                      <button className="Btn-outline-light">Ir a la publicación</button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Fade>
          </Row>
        );
      case 2:
        return (
          <Row>
            <Fade opposite cascade when={showFade}>
              <div>
                <Row>
                  <Col xs="6" lg="6" sm="12" className={`${styles.content_left} col-12`}>
                    <p className="title-xl">Emprender, la clave es el enfoque2</p>
                  </Col>
                  <Col xs="6" lg="6" sm="12" className={`${styles.content_goto} col-12`}>
                    <div>
                      <button className="Btn-outline-light">Ir a la publicación</button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Fade>
          </Row>
        );
      case 3:
        return (
          <Row>
            <Fade opposite cascade when={showFade}>
              <div>
                <Row>
                  <Col xs="6" lg="6" sm="12" className={`${styles.content_left} col-12`}>
                    <p className="title-xl">Emprender, la clave es el enfoque3</p>
                  </Col>
                  <Col xs="6" lg="6" sm="12" className={`${styles.content_goto} col-12`}>
                    <div>
                      <button className="Btn-outline-light">Ir a la publicación</button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Fade>
          </Row>
        );
      default:
        return (<> </>);
    }
  };

  const checkActiveOption = (option) => {
    if (optionSelect !== option) {
      return styles.non;
    }
    return styles.active;
  };

  return (
    <Container fluid className={styles.content_no_padd}>
      <Container fluid className={styles.content_title}>
        <Container className={styles.content_title_section}>
          <Row>
            <div className={`${styles.content_left}`}>
              <i className={`text-md ${styles.number_option} ${checkActiveOption(1)} `}>01</i>
              <i className={`text-md ${styles.number_option} ${checkActiveOption(2)} `}>02</i>
              <i className={`text-md ${styles.number_option} ${checkActiveOption(3)} `}>03</i>
            </div>
          </Row>
          {renderOption()}
          <Row>
            <div className={`${styles.content_left}`}>
              <span className={`${styles.buton_m} icon Btn-round-light`} onClick={handleBefore}>1</span>
              <span className={`${styles.buton_m} icon Btn-round-light`} onClick={handleAfter}>2</span>
            </div>
          </Row>
          <Row>
            <div className={`${styles.content_centered} ${styles.content_more} `}>
              <p className="title">Descubre más publicaciones</p>
              <button className="Btn-outline-light faint">Ver más</button>
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
          <Col xl="4" lg="4" sm="6">
            <div className={styles.content_centered}>
              <img src="/images/imgpr2.jpg" alt="" className={styles.help_img} />
              <p className="title">Aumenta<br />tu conocimiento</p>
              <button className="button button--theme-primary">Trending topics</button>
            </div>
          </Col>
          <Col xl="4" lg="4" sm="6">
            <div className={styles.content_centered}>
              <img src="/images/imgpr2.jpg" alt="" className={styles.help_img} />
              <p className="title">Desarrolla<br />nuevas habilidades</p>
              <button className="button button--theme-primary">Think tools</button>
            </div>
          </Col>
          <Col xl="4" lg="4" sm="6">
            <div className={styles.content_centered}>
              <img src="/images/imgpr2.jpg" alt="" className={styles.help_img} />
              <p className="title">Comparte<br />tu opinión</p>
              <button className="button button--theme-primary">Think team</button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className={styles.content_margin}>
          <Col xl="6" lg="6" sm="12">
            <small className="text-md text--theme-secondary">Expertos</small>
            <h2 className="title-xl">Conoce a <br />nuestros expertos</h2>
            <p className="text-md">Más de 300 colaboradores creando y compartiendo publicaciones de
              relevancia, especialmente diseñados para mentes visionarias,
              como tú.
            </p>
            <button className="button button--theme-primary">Buscar expertos</button>
          </Col>
          <Col xl="6" lg="6" sm="12">
            <div className={styles.expert_img}>
              <img src="/images/imgpr2.jpg" alt="" />
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

HomePage.propTypes = {
};

HomePage.defaultProps = {
};

export default HomePage;
