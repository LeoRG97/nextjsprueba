import Head from 'next/head';
import Link from 'next/link';
import { useEmblaCarousel } from 'embla-carousel/react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/global/styles/Us.module.css';
import { Footer, Layout } from '@/components';
import WorldComponent from '../components/world/World';

export default function Home() {
  const [viewportRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  return (
    <Layout>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container fluid className={styles.content_no_padd}>
          <Container fluid className={styles.content_title}>
            <Row>
              <div className={styles.content_title_text}>
                <small className="text-sm text--theme-light">Somos NTT DATA</small>
                <a target="_blank" href="https://www.nttdata.com/global/en/about-us" rel="noopener noreferrer">
                  <h1 className={`title-xl text--theme-light ${styles.cursorPointer}`}>Somos el mejor socio global<br />en innovación</h1>
                </a>
              </div>
            </Row>
            <video id="bgVideo" className={styles.content_title_video} controls preload="true" autoPlay loop muted>
              <source src="/video/world-digital.mp4" />
            </video>
          </Container>
          <Container fluid>
            <Container>
              <Row className={styles.content_mt_sect}>
                <Col xl="6" lg="6" sm="12">
                  <div className={`${styles.content_m_text}`}>
                    <small className="text-sm ">Filosofía</small>
                    <h1 className="title-xl text--theme-light my-5">Hacemos aquello en lo que creemos</h1>
                  </div>
                </Col>
                <Col xl="6" lg="6" sm="12"> </Col>
                <Col xl="6" lg="6" sm="12">
                  <div className={`${styles.content_m_text} `}>
                    <div className={`row d-flex align-items-center my-5 ${styles.movil_text_align}`}>
                      <Col xl="3" lg="3" sm="12" xs="12">
                        <div className={`${styles.content_icon} ${styles.pink_icon} mr-4`}><span className="icon">C</span></div>
                      </Col>
                      <Col xl="9" lg="9" sm="12" xs="12">
                        <h6 className={`${styles.title_disp_text} title`}>Visión de grupo</h6>
                      </Col>
                    </div>
                    {
                      // eslint-disable-next-line max-len
                      <p className="text-md">Hacemos realidad los sueños de nuestros clientes en todo el mundo, a través de relaciones a largo plazo. Desarrollamos ecosistemas con evolución para nuestros clientes empleando tecnologías disruptivas. Potenciamos nuestra creatividad respetando la diversidad.</p>
                    }
                  </div>
                </Col>
                <Col xl="6" lg="6" sm="12">
                  <div className={`${styles.content_m_text} `}>
                    <div className={`row d-flex align-items-center my-5 ${styles.movil_text_align}`}>
                      <Col xl="3" lg="3" sm="12" xs="12">
                        <div className={`${styles.content_icon} ${styles.green_icon}`}><span className="icon">9</span></div>
                      </Col>
                      <Col xl="9" lg="9" sm="12" xs="12">
                        <h6 className={`${styles.title_disp_text} title`}>Declaración de misión</h6>
                      </Col>
                    </div>
                    {
                      // eslint-disable-next-line max-len
                      <p className="text-md">En NTT DATA implementamos tecnologías de la información para crear nuevos paradigmas y valores que contribuyan a una sociedad más próspera.</p>
                    }
                  </div>
                </Col>
              </Row>
              <Row className={styles.content_mt_sect}>
                <div className={styles.content_video}>
                  <div className={styles.content_title_text}>
                    <small className="text-sm text--theme-light">Nuestro propósito</small>
                    <h1 className="title-xl text--theme-light">Guiarte a través <br />de la innovación</h1>
                    <Link href="/think-tools" passHref>
                      <button className="button button--theme-light me-2">
                        <span className="button__icon-left text--theme-light">F</span>Muéstrame cómo
                      </button>
                    </Link>
                  </div>
                </div>
              </Row>
            </Container>
          </Container>
          <Container fluid className={styles.content_observatory}>
            <Container>
              <Row className={`${styles.content_pt_sect} ${styles.content_pb_sect}`}>
                <Col xl="6" lg="6" sm="12">
                  <div className={`${styles.content_m_img} ${styles.image_content} `}>
                    <img src="/images/resourses/vortice.png" alt="" className={styles.image_1} />
                  </div>
                </Col>
                <Col xl="6" lg="6" sm="12" className="p-r">
                  <div className={`${styles.content_v_a_m} `}>
                    <div className={`${styles.content_mr_text} `}>
                      <small className="text-sm ">El observatorio</small>
                    </div>
                    <div className={`${styles.content_mr_text}`}>
                      <h6 className="title-xl text--theme-light my-5">Un espacio para mirar al futuro</h6>
                      { /* eslint-disable max-len */}
                      <>
                        <p className="text-md">Somos un socio en innovación que trasciende fronteras y geografías, que apuesta al desarrollo de espacios como Caleidoscopiocx, un observatorio de experiencia de cliente sin precedentes, que promete mantenerte actualizado frente a las tendencias mundiales y estudios sectoriales. Además, ponemos a tu disposición nuestro “Think tools”, donde encontrarás herramientas útiles para potenciar tu organización.</p>
                        <p className="text-md"> Navega por las diferentes secciones que hemos construido pensando especialmente en las necesidades de tu negocio.</p>
                      </>
                      { /* eslint-enable max-len */}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container fluid className={styles.content_map}>
            <Container className={`${styles.content_pt_sect} `}>
              <div className={` ${styles.content_map_text}`}>
                <div className="text-center">
                  <small className="text-sm">Impacto geográfico</small>
                  <h1 className="title-xl text--theme-dark mb-3">Una empresa <br /> de clase mundial</h1>
                  <WorldComponent />
                  <div className="d-flex justify-content-center">
                    { /* eslint-disable max-len */}
                    <div className={styles.margin_text_mapa}>
                      <p className="text-md text--theme-dark w-100 mt-3">
                        NTT DATA Group está avanzando con su Iniciativa Global One Team combinando
                        la experiencia y los recursos de las empresas del Grupo en Japón y en el extranjero,
                        así como facilitando colaboraciones comerciales entre naciones y empresas que
                        fortalecen el poder de marca mundial de
                        NTT DATA Group como &quot;One NTT DATA&quot;.
                      </p>
                    </div>
                    { /* eslint-enable max-len */}
                  </div>
                </div>
              </div>
            </Container>
          </Container>
          <Container fluid>
            <Container>
              <Col xl="12" lg="12" sm="12">
                <Row>
                  <div className={styles.content_carousel}>
                    <small className="text-sm">Aliados</small>
                    <h1 className="title-xl text--theme-light ">Más relaciones, <br />mejores resultados</h1>
                  </div>
                </Row>
                <Row>
                  <div className="embla">
                    <div className="embla__viewport" ref={viewportRef}>
                      <div className="embla__container">
                        <div className="embla__slide">
                          <img src="/images/imgpr2.jpg" alt="" className={styles.image_carousel} />
                        </div>
                        <div className="embla__slide">
                          <img src="/images/imgpr2.jpg" alt="" className={styles.image_carousel} />
                        </div>
                        <div className="embla__slide">
                          <img src="/images/imgpr2.jpg" alt="" className={styles.image_carousel} />
                        </div>
                        <div className="embla__slide">
                          <img src="/images/imgpr2.jpg" alt="" className={styles.image_carousel} />
                        </div>
                        <div className="embla__slide">
                          <img src="/images/imgpr2.jpg" alt="" className={styles.image_carousel} />
                        </div>
                        <div className="embla__slide">
                          <img src="/images/imgpr2.jpg" alt="" className={styles.image_carousel} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </Col>
            </Container>
          </Container>
        </Container>
      </main>
      <Footer />
    </Layout>
  );
}
