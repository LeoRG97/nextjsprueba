// import React, { useEffect, useState } from 'react';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import { BUCKET_URL } from '@/global/constants';
import styles from '../course.module.css';

const ResoursesLect = React.memo(({ resourses }) => {
  const getResourses = (info) => {
    if (info.tipo === 'link') {
      return (
        <div key={info._id} className={styles.content_resourse}>
          <Row>
            <Col sm={1} className="col-2">
              <a href={info.ruta} target="_blank" rel="noreferrer">
                <button className="icon-button icon-button--secondary">
                  r
                </button>
              </a>
            </Col>
            <Col>
              <label className="text-md">{info.nombre} &nbsp;</label>
              <p className="text-md">{info.descripcion} &nbsp;</p>
            </Col>
          </Row>
        </div>
      );
    }
    const route = (`${BUCKET_URL}${info.ruta}`);
    const slug = route.split('.').pop();

    if (info.tipo === 'file' && slug !== 'zip') {
      return (
        <div key={info._id}>
          <Row>
            <Image
              src={route}
              alt={info.nombre}
              layout="responsive"
              objectFit="cover"
              width={720}
              height={480}
            />
            <label className="text-md">{info.descripcion}</label>
          </Row>
        </div>
      );
    }
    if (info.tipo === 'file' && (slug === 'zip' || slug === 'rar')) {
      return (
        <div key={info._id}>
          <Row>
            <Col sm={1} className="col-2">
              <a href={route} download target="_blank" rel="noreferrer">
                <button className="icon-button icon-button--secondary">
                  q
                </button>
              </a>
            </Col>
            <Col>
              <label className="text-md">{info.nombre} &nbsp;</label>
              <p className="text-md">{info.descripcion} &nbsp;</p>
            </Col>
          </Row>
        </div>
      );
    }
    return <></>;
  };

  return (
    <div>
      {
        resourses && resourses.recursos && resourses.recursos.map((info) => {
          return getResourses(info);
        })
      }
    </div>
  );
});

export default ResoursesLect;
