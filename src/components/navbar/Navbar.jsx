import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import Script from 'next/script';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import styles from './navbar.module.css';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';
import { fetch as fetchProfile } from '@/reducers/profile';
import UserNavbarComponent from './UserNavbar';

const NavbarComponent = () => {
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const { data, fetched } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, []);

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
                   if (document.getElementById('navbar')) {
                    if (scroll >= 100) {
                      document.getElementById('navbar').style.transition = '0.5s';
                      document.getElementById('navbar').style.top = '-200px';
                    } else {
                      document.getElementById('navbar').style.top = '0';
                    }
                  }
                }
              }
           `}
        </Script>
      </>
      <Navbar
        className={styles.navbar}
        id="navbar"
        expand="lg"
        fixed="top"
      >
        <Container fluid className={styles.navContentStyle}>
          <Link href="/" passHref>
            <Navbar.Brand className={styles.a}>
              <Image
                src="/images/logos/NTTBlanco.png"
                alt="Logo"
                width={130}
                height={20}
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.linksContainer}>
              <div className={styles.divNavItemStyle}>
                <Link href="/nosotros" passHref>
                  <Nav.Link className="text-md text--theme-light">Acerca de</Nav.Link>
                </Link>
                <Link href="/trending-topics" passHref>
                  <Nav.Link className="text-md text--theme-light">Trending Topics</Nav.Link>
                </Link>
                <Link href="#" passHref>
                  <Nav.Link className="text-md text--theme-light">Think tools</Nav.Link>
                </Link>
              </div>

              <div className={styles.divNavItemStyle}>
                <div className="input-container w-75">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="input"
                    required
                  />
                  <button className="input__icon" type="button">
                    <span className="icon icon--theme-secondary">7</span>
                  </button>
                </div>
              </div>
              {
                loading ? (
                  <LoadingIndicator />
                ) : (
                  <div className={styles.divNavItemStyle}>
                    {
                      session ? (
                        <UserNavbarComponent
                          picture={data && data.picture}
                          name={data && data.name}
                        />
                      ) : (
                        <>
                          <Link href="/login" passHref>
                            <Nav.Link className="text-md text--theme-light">Iniciar sesión</Nav.Link>
                          </Link>
                          <Link href="/create-account" passHref>
                            <Nav.Link className="button button--theme-primary" href="#link">
                              Regístrate
                            </Nav.Link>
                          </Link>
                        </>
                      )
                    }
                  </div>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
