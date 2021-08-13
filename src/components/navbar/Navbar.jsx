import Script from 'next/script';
import Image from 'next/image';
import React from 'react';
import {
  Container, Navbar, Nav, InputGroup,
  Form,
} from 'react-bootstrap';
import styles from './navbar.module.css';

const NavbarComponent = () => {
  return (
    <div className={styles.navC}>
      <>
        <Script strategy="lazyOnload">
          {`
                 if (window.matchMedia("(max-width: 999px)").matches === false) {
                 window.onscroll = () => {
                  // Obtenemos la posicion del scroll en pantall
                  const scroll = document.documentElement.scrollTop || document.body.scrollTop;
                  // Realizamos alguna accion cuando el scroll este entre la posicion 300 y 400
                   if (scroll >= 100) {
                    document.getElementById('navbar').style.transition = '0.5s';
                    document.getElementById('navbar').style.top = '-200px';
                   } else {
                    document.getElementById('navbar').style.top = '0';
                  }
                }
              }
           `}
        </Script>
      </>
      <Navbar
        className={styles.navbar}
        id="navbar"
        bg="light"
        expand="lg"
        fixed="top"
      >
        <Container fluid className={styles.navContentStyle}>
          <Navbar.Brand class={styles.a} href="#home">
            <Image
              src="/images/logos/NTT-Data-Logo.png"
              alt="Logo"
              width={130}
              height={20}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.linksContainer}>
              <div className={styles.divNavItemStyle}>
                <Nav.Link className="text-sm" href="#home">Acerca de</Nav.Link>
                <Nav.Link className="text-sm" href="#link">Trending Topics</Nav.Link>
                <Nav.Link className="text-sm" href="#link">Think tools</Nav.Link>
              </div>

              <div className={styles.divNavItemStyle}>
                <InputGroup className={styles.inputGroupStyle}>
                  <Form.Control
                    type="text"
                    placeholder="Buscar..."
                    className={styles.navInputStyle}
                  />
                  <InputGroup.Text className="icon" id="inputGroupPrepend">7</InputGroup.Text>
                </InputGroup>
              </div>

              <div className={styles.divNavItemStyle}>
                <Nav.Link className="text-sm" href="#link">Iniciar sesión</Nav.Link>
                <Nav.Link className="text-sm button button--theme-primary" href="#link">
                  Regístrate
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
