/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import { useEmblaCarousel } from 'embla-carousel/react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/client';
import {
  Footer, Layout, BlogComponent, CarouselPrefArt,
} from '@/components';
import {
  getArticleBySlug,
  fetchArticleContent,
  rateArticle,
  postSaveThisArt,
  searchMySaveArt,
  deleteSaveThisArt,
} from '@/services/articles';
import { getProfileBySlug } from '@/services/profile';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import { BUCKET_URL, BASE_URL } from '@/global/constants';

// página para ver un artículo en específico
const ArticlePage = () => {
  const { query } = useRouter();
  const [session] = useSession();
  const [blog, setData] = useState({});
  const [autor, setAutor] = useState();
  const [htmlCode, setCode] = useState({});
  const [notFind, setFind] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOnView, setWatch] = useState(false);
  const [cssSaved, setSaved] = useState('');
  const [idSaved, setIdSaved] = useState('');

  const currentUrl = `${BASE_URL}trending-topics/${query.author}/${query.slug}`;
  const handleRateArticle = async () => {
    if (session) {
      const res = await rateArticle(blog._id, session.user.id);
      if (res.ok) {
        setData((prev) => ({ ...prev, likes: blog.likes + 1, liked: true }));
      }
    }
  };

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
      dataAutor._id = resp._id;
      setAutor(dataAutor);
    });
  };

  const checkIfSavedThisArt = async (idArt) => {
    if (session) {
      const params = {
        articulo_id: idArt,
        usuario_id: session.user.id,
      };
      const res = await searchMySaveArt(params, session.accessToken);
      if (res.ok) {
        setSaved('Btn-rounded__active');
        setIdSaved(res.data[0]._id);
      } else {
        setSaved('');
      }
    }
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
              checkIfSavedThisArt(resp._id);
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

  const saveThisArt = async () => {
    if (session) {
      const params = {
        articulo_id: blog._id,
        usuario_id: session.user.id,
      };
      const res = await postSaveThisArt(params, session.accessToken);
      if (res.ok) {
        setSaved('Btn-rounded__active');
        setIdSaved(res.data._id);
      }
    }
  };

  const quitSaveThisArt = async () => {
    if (session) {
      const res = await deleteSaveThisArt(idSaved, session.accessToken);
      if (res.ok) {
        setSaved('');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkscroll);
    if (query.slug) {
      getBlog();
    }
    if (blog._id) {
      checkIfSavedThisArt(blog._id);
    }
  }, [query, session]);

  return (
    <Layout>
      <Head>
        <title>Blog</title>
        <meta name="description" content="NTTDATA" />
        <link rel="icon" href="/favicon.ico" />
        <title>{blog && blog.portada ? blog.portada.titulo : ''}</title>
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={blog && blog.portada ? blog.portada.titulo : ''} />
        <meta property="og:image" content={blog && blog.portada ? (`${BUCKET_URL}${blog.portada.ruta_imagen}`) : ''} />
        <meta
          property="og:description"
          content={blog && blog.portada ? blog.portada.descripcion : ''}
        />
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
                        <BlogComponent
                          blogInfo={blog}
                          htmlCode={htmlCode}
                          autorInfo={autor}
                          onLike={handleRateArticle}
                          cssSaved={cssSaved}
                          quitSaved={quitSaveThisArt}
                          saveArt={saveThisArt}
                        />
                      </Col>
                      <Col xl="3" lg="3" sm="2" className="col-1">
                        <div className="content-fixed right">
                          {
                            (!isOnView) ? (
                              <div className="content-btns">
                                <button
                                  onClick={() => !blog.liked && handleRateArticle()}
                                  className={`Btn-rounded ${blog.liked && 'Btn-rounded__active'}`}
                                >
                                  c
                                </button>
                                {
                                  (cssSaved !== '') ? (
                                    <button className={`Btn-rounded ${cssSaved}`} title="Guardar" onClick={quitSaveThisArt}>U</button>
                                  ) : (
                                    <button className="Btn-rounded" title="Guardar" onClick={saveThisArt}>U</button>
                                  )
                                }
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
                            <CarouselPrefArt
                              blogId={blog._id}
                              categories={blog.categorias}
                            />
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
