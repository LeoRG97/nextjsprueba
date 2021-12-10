/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { useEmblaCarousel } from 'embla-carousel/react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/client';
import { useDispatch } from 'react-redux';
import {
  Footer, Layout, BlogComponent, CarouselPrefArt, TooltipContainer,
} from '@/components';
import {
  getArticleBySlug,
  fetchArticleContent,
  rateArticle,
  postSaveThisArt,
  searchMySaveArt,
  deleteSaveThisArt,
  checkIfLikedThisArt,
  fetchArticlesSSR,
} from '@/services/articles';
import { BASE_URL_PROYECT, BUCKET_URL } from '@/global/constants';
import { getProfileBySlug } from '@/services/profile';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import HeadArticle from '@/components/blog/HeadArticle';
import SocialShareModal from '@/components/modalsIndicators/SocialShareModal';
import { showSubscribeAlert } from '@/reducers/alert';

// página para ver un artículo en específico
const ArticlePage = ({ artInfo, artCode, authorInfo }) => {
  const { query } = useRouter();
  const [session] = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [blog, setData] = useState({});
  const [autor, setAutor] = useState();
  const [htmlCode, setCode] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOnView, setWatch] = useState(false);
  const [cssSaved, setSaved] = useState('');
  const [idSaved, setIdSaved] = useState('');
  const [isLiked, setLiked] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  const [rateTotal, setRateTotal] = useState(0);

  const currentUrl = `${BASE_URL_PROYECT}trending-topics/${query.author}/${query.slug}`;
  const handleRateArticle = async () => {
    if (session) {
      const res = await rateArticle(blog._id, session.user.id);
      if (res.message.toString() === 'liked') {
        setData((prev) => ({ ...prev, likes: blog.likes + 1, liked: true }));
      }
      if (res.message.toString() === 'unliked') {
        setData((prev) => ({ ...prev, likes: blog.likes - 1, liked: false }));
      }
    }
  };

  const getPerfilAutor = () => {
    const dataAutor = {
      picture: '/images/profile/no-profile-img.png',
      autorLink: '#',
      autor: '...',
      _id: '...',
    };
    if (authorInfo) {
      if (authorInfo.name) {
        if (authorInfo.apellidos) {
          dataAutor.autor = `${authorInfo.name} ${authorInfo.apellidos}`;
        } else {
          dataAutor.autor = `${authorInfo.name}`;
        }
      }
      if (authorInfo.picture) {
        dataAutor.picture = authorInfo.picture;
      }
      if (authorInfo.slug) {
        dataAutor.autorLink = `#/${authorInfo.slug}`;
      }
      dataAutor._id = authorInfo._id;
    }
    setAutor(dataAutor);
  };

  const checkIfSavedThisArt = async (idArt) => {
    if (session) {
      const params = {
        articulo_id: idArt,
        usuario_id: session.user.id,
      };
      window.setTimeout(() => {
        setSaved('');
      }, 100);

      const res = await searchMySaveArt(params, session.accessToken);
      if (res.ok) {
        setSaved('button__active');
        setIdSaved(res.data[0]._id);
      } else {
        setSaved('');
      }
    }
  };

  const checkIfLikedThisArtFunc = async () => {
    if (session) {
      const liked = await checkIfLikedThisArt(blog._id, session.accessToken);
      setRateTotal(liked.likes);
      if (liked.ok) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  };

  const getBlog = async () => {
    if (artInfo) {
      if (!artInfo.code) {
        getPerfilAutor();
        if (artCode.html) {
          const blogLike = artInfo;
          setData(blogLike);
          setCode(artCode.html);
          checkIfSavedThisArt(artInfo._id);
        } else {
          setCode({ id: 'no-info', tag: '<h3>Información no encontrada</h3>' });
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
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
        setSaved('button__active');
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
    return () => {
      window.removeEventListener('scroll', checkscroll);
    };
  }, [query]);

  useEffect(() => {
    if (session && blog) {
      checkIfLikedThisArtFunc();
    }
  }, [session, blog]);

  if (router.isFallback) {
    // mientras intenta generar la página
    return (
      <Layout className="d-flex justify-content-center align-items-center">
        <LoadingIndicator />
      </Layout>
    );
  }
  if (!artInfo) {
    // si no logró generar la página
    return (
      <Layout className="d-flex justify-content-center align-items-center">
        <h1 className="title">Artículo no encontrado</h1>
      </Layout>
    );
  }

  const renderResource = (resource, placement) => {
    switch (resource.tipo) {
      case 'reporte': {
        return (
          <TooltipContainer key={resource.ruta} placement={placement} tooltipText="Reporte">
            {session ? (
              <a href={`${BUCKET_URL}${resource.ruta}`} className="icon-button icon-button--secondary m-2" target="_blank" rel="noreferrer">
                P
              </a>
            )
              : (
                <button className="icon-button icon-button--secondary m-2" onClick={() => dispatch(showSubscribeAlert())}>
                  P
                </button>
              )}
          </TooltipContainer>
        );
      }
      case 'infografia': {
        return (
          <TooltipContainer key={resource.ruta} placement={placement} tooltipText="Infografía">
            {session ? (
              <a href={`${BUCKET_URL}${resource.ruta}`} className="icon-button icon-button--secondary m-2" target="_blank" rel="noreferrer">
                S
              </a>
            )
              : (
                <button className="icon-button icon-button--secondary m-2" onClick={() => dispatch(showSubscribeAlert())}>
                  S
                </button>
              )}
          </TooltipContainer>
        );
      }
      case 'video': {
        return (
          <TooltipContainer key={resource.ruta} placement={placement} tooltipText="Vídeo">
            {session ? (
              <a href={resource.ruta} className="icon-button icon-button--secondary m-2" target="_blank" rel="noreferrer">
                N
              </a>
            )
              : (
                <button className="icon-button icon-button--secondary m-2" onClick={() => dispatch(showSubscribeAlert())}>
                  N
                </button>
              )}
          </TooltipContainer>
        );
      }
      default: {
        return '';
      }
    }
  };

  return (
    <Layout>
      <HeadArticle
        dataArticle={artInfo}
        currentUrl={currentUrl}
      />
      <main>
        <Container fluid className="blog-content">
          {
            (loading) ? (
              <div className="blog-loading btn_top">
                <LoadingIndicator classAdd="loader-big" />
              </div>
            ) : (
              <>
                <Row>
                  <Col xl="3" lg="3" sm="2" className="col-1" />
                  <Col xl="6" lg="6" sm="8" className="col-12">
                    <BlogComponent
                      blogInfo={blog}
                      htmlCode={htmlCode}
                      autorInfo={autor}
                      onLike={handleRateArticle}
                      isLiked={isLiked}
                      rateTotal={rateTotal}
                      cssSaved={cssSaved}
                      quitSaved={quitSaveThisArt}
                      saveArt={saveThisArt}
                      shareArt={() => setModalShare(true)}
                      renderResource={renderResource}
                    />
                  </Col>
                  <Col xl="3" lg="3" sm="2" className="col-1">
                    <div className="content-fixed right">
                      {
                        (!isOnView) ? (
                          <div className="content-btns">
                            <TooltipContainer placement="left" tooltipText={!isLiked ? 'Valorar' : 'Quitar valoración'}>
                              <button
                                onClick={() => {
                                  session?.user
                                    ? handleRateArticle()
                                    : dispatch(showSubscribeAlert());
                                }}
                                className={`icon-button icon-button--secondary m-2 ${isLiked && 'button__active'}`}
                              >
                                {
                                  isLiked ? 'v' : 'c'
                                }
                              </button>
                            </TooltipContainer>
                            {
                              (cssSaved !== '') ? (
                                <TooltipContainer placement="left" tooltipText="Guardar">
                                  <button className={`icon-button icon-button--secondary m-2 ${cssSaved}`} onClick={quitSaveThisArt}>w</button>
                                </TooltipContainer>
                              ) : (
                                <TooltipContainer placement="left" tooltipText="Guardar">
                                  <button
                                    className="icon-button icon-button--secondary m-2"
                                    onClick={() => {
                                      session?.user
                                        ? saveThisArt() : dispatch(showSubscribeAlert());
                                    }}
                                  >U
                                  </button>
                                </TooltipContainer>
                              )
                            }
                            <TooltipContainer placement="left" tooltipText="Compartir">
                              <button className="icon-button icon-button--secondary m-2" onClick={() => setModalShare(true)}>T</button>
                            </TooltipContainer>
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
              </>
            )
          }
        </Container>
      </main>
      <SocialShareModal
        show={modalShare}
        onClose={() => setModalShare(false)}
        currentUrl={currentUrl}
        title={blog.portada ? blog.portada.titulo : ''}
      />
      <Footer />
    </Layout>
  );
};

// getStaticPaths
export async function getStaticPaths() {
  const res = await fetchArticlesSSR({ pageSize: 20 });

  const paths = res.data.map((article) => {
    return { params: { author: article.usuario_id.slug, slug: article.slug } };
  });

  return {
    paths,
    fallback: true,
  };
}

// getStaticProps & revalidate
export async function getStaticProps({ params }) {
  const authorInfo = await getProfileBySlug(params.author);
  const artInfo = await getArticleBySlug(params.slug);

  if (artInfo) {
    const artCode = await fetchArticleContent(artInfo._id);
    if (artCode) {
      return {
        props: {
          artInfo,
          authorInfo: authorInfo || null,
          artCode: artCode || null,
        },
        revalidate: 60,
      };
    }
  }

  return {
    notFound: true,
  };
}

export default ArticlePage;
