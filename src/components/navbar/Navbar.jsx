import { signout, useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import Script from 'next/script';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetch as fetchProfile } from '@/reducers/profile';
import styles from './navbar.module.css';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';
import UserNavbarComponent from './UserNavbar';

const NavbarComponent = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const { data, fetched } = useSelector((state) => state.profile);
  const [expanded, setExpanded] = useState(false);
  const navigateToProfile = () => {
    router.push('/profile/about-me');
  };

  const logOut = async () => {
    await signout({ callbackUrl: `${window.location.origin}/login` });
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.length >= 4) {
      router.push({
        pathname: '/trending-topics',
        query: { search: searchText },
      }, null, { shallow: true });
      setExpanded(false);
    }
  };

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
              <div className={styles.logo}>
                <Image
                  src="/images/logos/Marca.png"
                  alt="Logo"
                  layout="fill"
                />
              </div>
            </Navbar.Brand>
          </Link>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.linksContainer}>
              <div className={styles.divNavItemStyle}>
                <Link href="/nosotros" passHref>
                  <Nav.Link className="text-md text--theme-light">Acerca de</Nav.Link>
                </Link>
                <Link href="/trending-topics" passHref>
                  <Nav.Link className="text-md text--theme-light">Trending Topics</Nav.Link>
                </Link>
                <Link href="/think-tools" passHref>
                  <Nav.Link className="text-md text--theme-light">Think tools</Nav.Link>
                </Link>
                <Link href="/think-team" passHref>
                  <Nav.Link className="text-md text--theme-light">Think team</Nav.Link>
                </Link>
              </div>

              <div className={styles.divNavItemStyle}>
                <form onSubmit={handleSearch} className="container-fluid">
                  <div className="input-container w-75">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="input"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="icon input__icon" type="button" onClick={handleSearch}>
                      7
                    </button>
                  </div>
                </form>
              </div>
              {
                loading ? (
                  <LoadingIndicator />
                ) : (
                  <div className={styles.divNavItemStyle}>
                    <Link href="/" passHref>
                      <button className="button button--theme-warning me-2 button_discover" onClick={handleSearch}>
                        <span className="button__icon-left text--theme-warning">9</span>{' '}Descubrir
                      </button>
                    </Link>
                    {
                      session ? (
                        <UserNavbarComponent
                          picture={data && data.picture}
                          name={data && data.name}
                          apellidos={data && data.apellidos}
                        />
                      ) : (
                        <>
                          <Link href="/login" passHref>
                            <Nav.Link className="text-md text--theme-light">Iniciar sesión</Nav.Link>
                          </Link>
                          <Link href="/create-account" passHref>
                            <button className="button button--theme-primary">
                              Registrarse
                            </button>
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
      <Navbar
        className={styles.navbarMobile}
        expanded={expanded}
        id="navbarMobile"
        expand="lg"
        fixed="top"
      >
        <Container fluid className={expanded === 'expanded' ? styles.containerFluidExpanded : styles.containerFluid}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className={expanded === 'expanded' ? styles.iconToggleExpanded : styles.iconToggle} onClick={() => setExpanded(!expanded)} />
          <Navbar.Brand>
            <Link href="/" passHref>
              <div className={styles.logo}>
                <Image
                  src="/images/logos/Marca.png"
                  alt="Logo"
                  layout="fill"
                />
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            {
              loading ? (
                <LoadingIndicator />
              ) : (
                <div className={styles.divNavItemStyle}>
                  {
                    session ? (
                      <div className={`${styles.navDropDownImage} col-12`}>
                        <Image height="35" width="35" objectFit="contain" src={data.picture === 'string' || !data.picture ? '/images/profile/no-profile-img.png' : data.picture} />
                      </div>
                    ) : (
                      <>
                        <Link href="/login" passHref>
                          <Nav.Link className="text-sm text--theme-light">Iniciar sesión</Nav.Link>
                        </Link>
                      </>
                    )
                  }
                </div>
              )
            }
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className={`${styles.expandenMenuMobile} mt-4`}>
            <Nav className={styles.linksContainer}>
              <div className="row">
                <div className="col-12">
                  <form onSubmit={handleSearch}>
                    <div className="input-container w-100">
                      <input
                        type="text"
                        placeholder="Buscar..."
                        className="input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      <button className="input__icon" type="button">
                        <span className="icon icon--theme-secondary">7</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className={`${styles.divNavItemStyle} mt-4`}>
                <Link href="/nosotros" passHref>
                  <button className="button button--theme-warning">
                    <span className="button__icon-left text--theme-warning">9</span>{' '}Descubrir
                  </button>
                </Link>
                <Link href="/nosotros" passHref>
                  <Nav.Link className="text-md text--theme-light mt-4">Acerca de</Nav.Link>
                </Link>
                <Link href="/trending-topics" passHref>
                  <Nav.Link className="text-md text--theme-light">Trending Topics</Nav.Link>
                </Link>
                <Link href="/think-tools" passHref>
                  <Nav.Link className="text-md text--theme-light">Think tools</Nav.Link>
                </Link>
                <Link href="/think-team" passHref>
                  <Nav.Link className="text-md text--theme-light">Think team</Nav.Link>
                </Link>
                {
                  /** data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg> */
                }
                {
                  loading ? (
                    <LoadingIndicator />
                  ) : (
                    <div className={styles.divNavItemStyle}>
                      {
                        session ? (
                          <div className={`${styles.buttonRegisterContent} mt-4`}>
                            <Nav.Link className="text-md text--theme-light" onClick={navigateToProfile}>Perfil</Nav.Link>
                            <Nav.Link className="text-md text--theme-light">Ajustes</Nav.Link>
                            <Nav.Link className="text-md text--theme-light" onClick={() => logOut()}>Cerrar sesión</Nav.Link>
                          </div>
                        ) : (
                          <div className={`${styles.buttonRegisterContent} mt-4`}>
                            <Link href="/create-account" passHref>
                              <button className="button button--theme-primary">
                                Registrarse
                              </button>
                            </Link>
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
