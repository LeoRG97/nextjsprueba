import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import { useEmblaCarousel } from 'embla-carousel/react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Footer, Layout, BlogComponent, CarouselPrefArt,
} from '@/components';
import { getArticleBySlug, fetchArticleContent } from '@/services/articles';
import { getProfileBySlug } from '@/services/profile';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';

// página para ver un artículo en específico
const ArticlePage = () => {
  const { query } = useRouter();
  const [blog, setData] = useState({});
  const [autor, setAutor] = useState();
  const [htmlCode, setCode] = useState({});
  const [notFind, setFind] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOnView, setWatch] = useState(false);

  const getPerfilAutor = (slug) => {
    const dataAutor = {
      picture: '/images/profile/no-profile-img.png',
      autorLink: '#',
      autor: '...',
    };
    getProfileBySlug(slug).then((resp) => {
      if (resp.name) {
        if (resp.apellidos) {
          dataAutor.autor = `${resp.name} ${resp.apellidos}`;
        } else {
          dataAutor.autor = `${resp.name}`;
        }
      }
      if (resp.picture) {
        dataAutor.picture = resp.picture;
      }
      if (resp.slug) {
        dataAutor.autorLink = `#/${resp.slug}`;
      }
      setAutor(dataAutor);
    });
  };

  const getBlog = () => {
    getArticleBySlug(query.slug).then((resp) => {
      if (resp) {
        if (!resp.code) {
          getPerfilAutor(query.author);
          fetchArticleContent(resp._id).then((response) => {
            if (response.html) {
              setData(resp);
              setCode(response.html);
            } else {
              setCode({ id: 'no-info', tag: '<h3>Información no encontrada</h3>' });
            }
            setLoading(false);
          });
        } else {
          setFind(true);
          setLoading(false);
        }
      } else {
        setFind(true);
        setLoading(false);
      }
    });
  };

  const checkscroll = () => {
    const elm = document.getElementById('contentCarousel');
    if (elm) {
      const domRect = elm.getBoundingClientRect();
      if (domRect) {
        if (domRect.top < 550) {
          setWatch(true);
        } else if (domRect.top > 550) {
          setWatch(false);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkscroll);
    if (query.slug) {
      getBlog();
    }
  }, [query]);

  return (
    <Layout>
      <Head>
        <title>Blog</title>
        <meta name="description" content="NTTDATA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container fluid className="blog-content">
          {
            (loading) ? (
              <div className="blog-loading btn_top">
                <LoadingIndicator classAdd="loader-big" />
              </div>
            ) : (
              <>
                {
                  (notFind) ? (
                    <Row>
                      <Col className="blog-not-find">
                        <h3 className="title">Articulo no encontrado</h3>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col xl="3" lg="3" sm="2" className="col-1">
                        <div className="content-fixed left">
                          {
                            (!isOnView) ? (
                              <div className="content-btns">
                                <label className="text-md">Ver en</label>
                                <button className="Btn-square">P</button>
                                <button className="Btn-square">S</button>
                                <button className="Btn-square">N</button>
                              </div>
                            ) : (<></>)
                          }
                        </div>
                      </Col>
                      <Col xl="6" lg="6" sm="8" className="col-12">
                        <BlogComponent blogInfo={blog} htmlCode={htmlCode} autorInfo={autor} />
                      </Col>
                      <Col xl="3" lg="3" sm="2" className="col-1">
                        <div className="content-fixed right">
                          {
                            (!isOnView) ? (
                              <div className="content-btns">
                                <button className="Btn-rounded">c</button>
                                <button className="Btn-rounded">U</button>
                                <button className="Btn-rounded">T</button>
                              </div>
                            ) : (<></>)
                          }
                        </div>
                      </Col>
                      <Row>
                        <Col xl="1" lg="1" sm="1" className=""> </Col>
                        <Col xl="10" lg="10" sm="12" className="">
                          <div id="contentCarousel">
                            <CarouselPrefArt />
                          </div>
                        </Col>
                        <Col xl="1" lg="1" sm="1" className=""> </Col>
                      </Row>
                    </Row>
                  )
                }
              </>
            )
          }
        </Container>
      </main>
      <Footer />
    </Layout>
  );
};

// getStaticPaths

// getStaticProps & revalidate

export default ArticlePage;
