import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footer_container}>
        <Row className={styles.footer_container_row}>
          <Col sm="12" lg="auto">
            <img src="/images/logos/NTTBlanco.png" alt="NTT" className={styles.img_NTT} />
          </Col>
          <Col sm="auto" lg="auto">
            <Row className={styles.footer_container_row_links}>
              <Col sm="6" lg="auto" className={`${styles.footer_content} col-6`}>
                <p className="subtitle">Acerca de</p>
                <Link href="/#">
                  <a>Perfil de la empresa</a>
                </Link>
                <Link href="/#">
                  <a>Filosofía</a>
                </Link>
                <Link href="/#">
                  <a>Sobre la plataforma</a>
                </Link>
                <Link href="/#">
                  <a>Propósito</a>
                </Link>
                <Link href="/#">
                  <a>Impacto geográfico</a>
                </Link>
                <Link href="/#">
                  <a>Aliados</a>
                </Link>
              </Col>
              <Col sm="6" lg="auto" className={`${styles.footer_content} col-6`}>
                <p className="subtitle">Trending topics</p>
                <Link href="/#">
                  <a>Sección número 1</a>
                </Link>
                <Link href="/#">
                  <a>Sección número 2</a>
                </Link>
                <Link href="/#">
                  <a>Sección número 3</a>
                </Link>
                <Link href="/#">
                  <a>Sección número 4</a>
                </Link>
                <p> </p>
              </Col>
              <Col sm="6" lg="auto" className={`${styles.footer_content} col-6`}>
                <p className="subtitle">Think tools</p>
                <Link href="/#">
                  <a>Sección número 1</a>
                </Link>
                <Link href="/#">
                  <a>Sección número 2</a>
                </Link>
                <Link href="/#">
                  <a>Sección número 3</a>
                </Link>
                <Link href="/#">
                  <a>Sección número 4</a>
                </Link>
                <p> </p>
              </Col>
              <Col sm="6" lg="auto" className={`${styles.footer_content} col-6`}>
                <p className="subtitle">Ayuda</p>
                <Link href="/#">
                  <a>Soporte técnico</a>
                </Link>
                <Link href="/#">
                  <a>Términos de uso</a>
                </Link>
                <Link href="/#">
                  <a>Política de privacidad</a>
                </Link>
                <p> </p>
                <p> </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles.footer_container_row_copyright}>
          <Col lg="6" sm="auto">
            <Link href="/#">
              <a>© Copyright NTT DATA Corporation</a>
            </Link>
          </Col>
          <Col lg="6" sm="auto" className={styles.foote_mob_top}>
            <Link href="/#">
              <a className={`${styles.link_fr} icon`}> N </a>
            </Link>
            <Link href="/#">
              <a className={`${styles.link_fr} icon`}> M </a>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
