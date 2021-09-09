import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { useEmblaCarousel } from 'embla-carousel/react';
import { ArticlesDetailComponent } from '@/components';
import { getArtByPref } from '@/services/articles';
import styles from './blog.module.css';

const CarouselPrefArt = () => {
  const [artPref, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const onSelect = useCallback(() => { }, [embla]);

  useEffect(() => {
    const params = {
      pageNum: 1,
      pageSize: 6,
      sort: '',
      type: '',
    };
    if (!artPref[0]) {
      getArtByPref(params).then((resp) => {
        setData(resp);
        setLoading(false);
      });
    } else {
      const dataCarousel = artPref;
      setData(dataCarousel);
    }
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div>
      <Container>
        <Row>
          <Col className={styles.more_title}>
            <h4 className="title">Publicaciones relacionadas</h4>
          </Col>
        </Row>
      </Container>
      {
        (loading) ? (<></>) : (
          <div className="embla fluid">
            <div className="embla__viewport " ref={viewportRef}>
              <div className="embla__container">
                {
                  (artPref.length !== 0 && artPref.length !== undefined) ? (
                    artPref.map((art) => {
                      return (
                        <div className="embla__slide" key={art._id}>
                          <div className="embla__slide__inner">
                            <ArticlesDetailComponent article={art} classContent="full-content" />
                          </div>
                        </div>
                      );
                    })) : (null)
                }
                <div className="embla__slide">
                  <div className="embla__slide__inner">
                    <div className={styles.content_more}>
                      <Link href="/trending-topics">
                        <a><button className="Btn-cancel">Ver mas</button></a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
};

export default CarouselPrefArt;
