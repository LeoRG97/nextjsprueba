/* eslint-disable react/no-danger */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { LoadingIndicator } from '@/components';
import styles from './lessonVideo.module.css';

const LessonVideo = ({
  data, prev, next, isFirst, isLast, unitsCourse,
}) => {
  const getMyUnit = () => {
    const UnitN = unitsCourse.find((obj) => obj._id === data.unidad);
    if (UnitN && UnitN.numero) {
      return UnitN.numero;
    }
    return '';
  };

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
          {!isFirst && <Link href={prev} passHref shallow><a><button className="icon-button icon-button--secondary position-absolute">a</button></a></Link>}
        </Col>
        <Col xs={8} className="text-center">
          <p className="text-sm">Unidad {getMyUnit()} - Lección {data.numeroLeccion}</p>
          <h1 className="title text-center">{data.nombre}</h1>
        </Col>
        <Col xs={2} className=" d-flex justify-content-end">
          {!isLast && <Link href={next} passHref shallow><a><button className="icon-button icon-button--secondary">b</button></a></Link>}
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
