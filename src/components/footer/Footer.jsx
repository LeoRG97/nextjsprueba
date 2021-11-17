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
              <a className="text-md text--theme-light">About Us</a>
            </Link>
            <Link href="/trending-topics" passHref>
              <a className="text-md text--theme-light">Trending Topics</a>
            </Link>
            <Link href="/think-tools" passHref>
              <a className="text-md text--theme-light">Think Tools</a>
            </Link>
          </Col>
          <Col xs="12" md="4" className={`${styles.footer_content}`}>
            <p className="subtitle">Ayuda</p>
            <Link href="/experts">
              <a className="text-md text--theme-light">Nuestros Expertos</a>
            </Link>
            <Link href="/#">
              <a className="text-md text--theme-light">Soporte Técnico</a>
            </Link>
            <Link href="/#">
              <a className="text-md text--theme-light">Términos de Uso</a>
            </Link>
            <a className="text-md text--theme-light" href="mailto:sofia.gutierrez.vallejo@nttdata.com">Contacto</a>
          </Col>
          <Col xs="12" md="4" className={`${styles.footer_content}`}>
            <p className="subtitle">Legales</p>

            <Link href="/policies/privacy">
              <a className="text-md text--theme-light">Política de Privacidad</a>
            </Link>
            <Link href="/policies/cookies">
              <a className="text-md text--theme-light">Política de Cookies</a>
            </Link>
            <Link href="/policies/legal">
              <a className="text-md text--theme-light">Aviso Legal</a>
            </Link>

          </Col>
        </Row>
        <Row className={styles.footer_container_row_copyright}>
          <Col sm="12" md="6">
            <a className="text-sm text--theme-light" href="https://mexico.nttdata.com/" target="_blank" rel="noreferrer">
              © Copyright NTT Data EMEAL - Latam
            </a>
          </Col>
          <Col sm="12" md="6" className={styles.foote_mob_top}>
            <a href="https://www.youtube.com/c/NTTDATAEuropeLatam/featured" target="_blank" className={`${styles.link_fr} icon`} rel="noreferrer"> N </a>
            <a href="https://www.linkedin.com/company/ntt-data-europe/?originalSubdomain=mx" target="_blank" className={`${styles.link_fr} icon`} rel="noreferrer"> M </a>
            <a href="https://twitter.com/nttdatalatam/" target="_blank" className={`${styles.link_fr} icon`} rel="noreferrer"> X </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
