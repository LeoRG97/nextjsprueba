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
          <Col xs="12" lg="3">
            <img src="/images/logos/Marca.png" alt="NTT" className={styles.img_NTT} />
          </Col>
          <Col xs="12" lg="9">
            <Row>
              <Col xs="12" sm="4" lg="3" className={`${styles.footer_content}`}>
                <Link href="/about" passHref>
                  <a className="text-regular">Acerca de</a>
                </Link>
              </Col>
              <Col xs="12" sm="4" lg="3" className={`${styles.footer_content}`}>
                <Link href="/trending-topics" passHref>
                  <a className="text-regular">Trending topics</a>
                </Link>
              </Col>
              <Col xs="12" sm="4" lg="3" className={`${styles.footer_content}`}>
                <Link href="/think-tools" passHref>
                  <a className="text-regular">Think tools</a>
                </Link>
              </Col>
              <Col xs="12" sm="12" lg="3" className={`${styles.footer_content}`}>
                <p className="subtitle">Ayuda</p>
                <Link href="/experts">
                  <a>Nuestos expertos</a>
                </Link>
                <Link href="/#">
                  <a>Soporte técnico</a>
                </Link>
                <Link href="/#">
                  <a>Términos de uso</a>
                </Link>
                <Link href="/policies/privacy">
                  <a>Política de privacidad</a>
                </Link>
                <Link href="/policies/cookies">
                  <a>Política de cookies</a>
                </Link>
                <Link href="/policies/legal">
                  <a>Aviso legal</a>
                </Link>
                <div>
                  <a href="mailto:sofia.gutierrez.vallejo@nttdata.com">Contacto</a>
                </div>
                <p> </p>
                <p> </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles.footer_container_row_copyright}>
          <Col sm="12" md="6">
            <p className="text-sm text--theme-light">
              © Copyright NTT Data Europa & Americas
            </p>
          </Col>
          <Col sm="12" md="6" className={styles.foote_mob_top}>
            <Link href="https://www.youtube.com/c/NTTDATAEuropeLatam/featured">
              <a target="_blank" className={`${styles.link_fr} icon`}> N </a>
            </Link>
            <Link href="https://www.linkedin.com/company/ntt-data-europe/?originalSubdomain=mx">
              <a target="_blank" className={`${styles.link_fr} icon`}> M </a>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
