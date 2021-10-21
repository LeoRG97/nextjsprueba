/* eslint-disable react/no-danger */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LoadingIndicator } from '@/components';
import styles from './lessonVideo.module.css';

const LessonVideo = ({
  data, prev, next, isFirst, isLast,
}) => {
  if (!data) {
    return (
      <div className={`${styles.container} ${styles.loading}`}>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Row className="mb-3">
        <Col xs={2} className=" d-flex justify-content-start">
          {!isFirst && <button className="icon-button icon-button--secondary position-absolute" onClick={prev}>a</button>}
        </Col>
        <Col xs={8} className="text-center">
          <p className="text-sm">Unidad {data.no_unidad} - Lección {data.no_leccion}</p>
          <h1 className="title text-center">{data.titulo}</h1>
        </Col>
        <Col xs={2} className=" d-flex justify-content-end">
          {!isLast && <button className="icon-button icon-button--secondary position-absolute" onClick={next}>b</button>}
        </Col>
      </Row>
      {
        data.video ? (
          <div
            dangerouslySetInnerHTML={{ __html: data.video }}
            className={styles.video}
          />
        ) : (
          <div className={`${styles.video} ${styles.empty}`} />
        )
      }
      <p className="text-regular text--theme-light">{data.descripcion}</p>
    </div>
  );
};

export default LessonVideo;
