import { signout, useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetch as fetchProfile } from '@/reducers/profile';
import styles from './navbar.module.css';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';
import { showToolsModal } from '@/reducers/alert';

const UserNavbarComponent = dynamic(() => import('./UserNavbar'));

const NavbarComponent = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [searchText, setSearchText] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  const dispatch = useDispatch();
  const { data, fetched } = useSelector((state) => state.profile);
  const [expanded, setExpanded] = useState(false);
  const navigateToProfile = () => {
    router.push('/profile/about-me');
  };

  const navigateToSettings = () => {
    router.push('/profile/edit/general');
  };

  let inputPlaceholder = '';

  const logOut = async () => {
    await signout({ callbackUrl: `${window.location.origin}/login` });
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
    if (router.query.search) {
      setSearchText(router.query.search);
      setOnSearch(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = document.documentElement.scrollTop || document.body.scrollTop;
      // Realizamos alguna accion cuando el scroll este entre la posicion 300 y 400
      if (document.getElementById('navbar')) {
        if (scroll >= 100 && window.matchMedia('(max-width: 999px)').matches === false) {
          document.getElementById('navbar').style.transition = '0.5s';
          document.getElementById('navbar').style.top = '-200px';
        } else {
          document.getElementById('navbar').style.top = '0';
        }
      }
    };
    if (window) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const minLength = router.pathname === '/experts' ? 3 : 4;
    if (searchText.length >= minLength) {
      router.push({
        pathname: router.pathname === '/experts' ? '/experts' : '/trending-topics',
        query: {
          search: searchText,
          type: router.query.type,
        },
      }, null, { shallow: true });
      setExpanded(false);
      setOnSearch(true);
    }
  };

  const handleCancel = () => {
    setSearchText('');
    router.push({
      pathname: router.pathname === '/experts' ? '/experts' : '/trending-topics',
      query: {
        type: router.query.type,
      },
    }, null, { shallow: true });
    setOnSearch(false);
  };

  useEffect(() => {
    if (searchText.length === 0 && onSearch) {
      setOnSearch(false);
      handleCancel();
    }
  }, [searchText]);

  inputPlaceholder = router.pathname === '/experts' ? 'Buscar expertos' : 'Buscar art??culos';

  if (router.query.type === 'Cursos') {
    inputPlaceholder = 'Buscar cursos';
  }

  const handleToolsModal = () => {
    dispatch(showToolsModal());
  };

  return (
    <div className={styles.navC}>
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
                  layout="responsive"
                  width={180}
                  height={60}
                />
              </div>
            </Navbar.Brand>
          </Link>
          <Navbar.Collapse id="basic-navbar-web">
            <Nav className={styles.linksContainer}>
              <div className={styles.divNavItemStyle}>
                <Nav.Item>
                  <Link href="/about" passHref>
                    <Nav.Link className={`text-md text--theme-light ${router && router.pathname && router.pathname === '/about' ? 'active' : ''}`}>About Us</Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link href="/trending-topics" passHref prefetch={false}>
                    <Nav.Link className={`text-md text--theme-light ${router && router.pathname && router.pathname === '/trending-topics' ? 'active' : ''}`}>Trending Topics</Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link href="/think-tools" passHref>
                    <Nav.Link className={`text-md text--theme-light ${router && router.pathname && router.pathname === '/think-tools' ? 'active' : ''}`}>Think tools</Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link href="/think-team" passHref>
                    <Nav.Link className={`text-md text--theme-light ${router && router.pathname && router.pathname === '/think-team' ? 'active' : ''}`}>Think team</Nav.Link>
                  </Link>
                </Nav.Item>
              </div>

              <div className={styles.divNavItemStyle}>
                <form onSubmit={handleSearch} className="container-fluid">
                  <div className="input-container w-75">
                    <input
                      type="text"
                      placeholder={inputPlaceholder}
                      className="input"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    {
                      onSearch ? (
                        <div onClick={handleCancel} className={`input__icon ${styles.cancelIcon}`}>
                          &#x2715;
                        </div>
                      ) : (
                        <button className="icon input__icon" type="button" onClick={handleSearch}>
                          7
                        </button>
                      )
                    }
                  </div>
                </form>
              </div>
              {
                loading ? (
                  <LoadingIndicator />
                ) : (
                  <>
                    {
                      session ? (
                        <div className={styles.divNavItemStyle}>
                          <button className="button button--theme-warning me-2 button_discover" onClick={handleToolsModal}>
                            <span className="button__icon-left text--theme-warning">9</span>{' '}Recursos
                          </button>
                          <UserNavbarComponent
                            picture={data && data.picture}
                            name={data && data.name}
                            apellidos={data && data.apellidos}
                          />
                        </div>
                      ) : (
                        <div className={styles.divNavItemStyle}>
                          <button className="button button--theme-warning me-2 button_discover" onClick={handleToolsModal}>
                            <span className="button__icon-left text--theme-warning">9</span>{' '}Recursos
                          </button>
                          <Link href="/login" passHref>
                            <Nav.Link className="text-md active">Iniciar sesi??n</Nav.Link>
                          </Link>
                          <Link href="/create-account" passHref>
                            <button className="button button--theme-primary">
                              Registrarse
                            </button>
                          </Link>
                        </div>
                      )
                    }
                  </>
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
          <Navbar.Toggle aria-controls="basic-navbar-mobile" className={`${expanded === 'expanded' || expanded ? styles.iconToggleExpanded : styles.iconToggle} ${styles.iconToggleMovil}`} onClick={() => setExpanded(!expanded)} />
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
                <div className={` ${styles.iconToggleMovil}`}>
                  {
                    session ? (
                      <div className={`${styles.navDropDownImage} col-12`}>
                        <Image height="35" width="35" objectFit="cover" src={data.picture === 'string' || !data.picture ? '/images/profile/no-profile-img.png' : data.picture} />
                      </div>
                    ) : (
                      <>
                        <Link href="/login" passHref>
                          <Nav.Link className="text-sm text--theme-light">Iniciar sesi??n</Nav.Link>
                        </Link>
                      </>
                    )
                  }
                </div>
              )
            }
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-mobile" className={`${styles.expandenMenuMobile} mt-4`}>
            <Nav className={styles.linksContainer}>
              <div className="row">
                <div className="col-12">
                  <form onSubmit={handleSearch}>
                    <div className="input-container w-100">
                      <input
                        type="text"
                        placeholder={inputPlaceholder}
                        className="input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      {
                        onSearch ? (
                          <div onClick={handleCancel} className={`input__icon ${styles.cancelIcon}`}>
                            &#x2715;
                          </div>
                        ) : (
                          <button className="input__icon" type="button">
                            <span className="icon icon--theme-secondary">7</span>
                          </button>
                        )
                      }
                    </div>
                  </form>
                </div>
              </div>

              <div className={`${styles.divNavItemStyle} mt-4`}>
                <button className="button button--theme-warning" onClick={handleToolsModal}>
                  <span className="button__icon-left text--theme-warning">9</span>{' '}Recursos
                </button>
                <Nav.Item>
                  <Link href="/about" passHref>
                    <Nav.Link className={`text-md text--theme-light mt-4 ${router && router.pathname && router.pathname === '/about' ? 'active' : ''}`}>About Us</Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link href="/trending-topics" passHref>
                    <Nav.Link className={`text-md text--theme-light ${router && router.pathname && router.pathname === '/trending-topics' ? 'active' : ''}`}>Trending Topics</Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link href="/think-tools" passHref>
                    <Nav.Link className={`text-md text--theme-light ${router && router.pathname && router.pathname === '/think-tools' ? 'active' : ''}`}>Think tools</Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link href="/think-team" passHref>
                    <Nav.Link className={`text-md text--theme-light ${router && router.pathname && router.pathname === '/think-team' ? 'active' : ''}`}>Think team</Nav.Link>
                  </Link>
                </Nav.Item>
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
                            <Nav.Link className={`text-md text--theme-light ${router && router.asPath && router.asPath === '/profile/about-me' ? 'active' : ''}`} onClick={navigateToProfile}>Perfil</Nav.Link>
                            <Nav.Link className={`text-md text--theme-light ${router && router.asPath && router.asPath === '/profile/edit/general' ? 'active' : ''}`} onClick={navigateToSettings}>Ajustes</Nav.Link>
                            <Nav.Link className="text-md text--theme-light" onClick={() => logOut()}>Cerrar sesi??n</Nav.Link>
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
