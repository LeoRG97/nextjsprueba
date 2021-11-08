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
          <Col xs="12" md="4" className={`${styles.footer_content}`}>
            <img src="/images/logos/Marca.png" alt="NTT" className={styles.img_NTT} />
            <Link href="/about" passHref>
              <a className="text-regular">Acerca de</a>
            </Link>
            <Link href="/trending-topics" passHref>
              <a className="text-regular">Trending Topics</a>
            </Link>
            <Link href="/think-tools" passHref>
              <a className="text-regular">Think Tools</a>
            </Link>
            <a href="https://www.nttdata.com/global/en/" target="_blank" className="text-regular" rel="noreferrer">
              NTT DATA GLOBAL
            </a>
          </Col>
          <Col xs="12" md="4" className={`${styles.footer_content}`}>
            <p className="subtitle">Ayuda</p>
            <Link href="/experts">
              <a>Nuestros Expertos</a>
            </Link>
            <Link href="/#">
              <a>Soporte Técnico</a>
            </Link>
            <Link href="/#">
              <a>Términos de Uso</a>
            </Link>
            <a href="mailto:sofia.gutierrez.vallejo@nttdata.com">Contacto</a>
          </Col>
          <Col xs="12" md="4" className={`${styles.footer_content}`}>
            <p className="subtitle">Políticas</p>

            <Link href="/policies/privacy">
              <a>Política de Privacidad</a>
            </Link>
            <Link href="/policies/cookies">
              <a>Política de Cookies</a>
            </Link>
            <Link href="/policies/legal">
              <a>Aviso Legal</a>
            </Link>

            <p> </p>
            <p> </p>
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
