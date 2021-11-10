// import React, { useEffect, useState } from 'react';
import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Image from 'next/image';
import { BUCKET_URL } from '@/global/constants';
import styles from '../course.module.css';

const CertificateCourse = React.memo(({ certificate }) => {
  return (
    <Container className="centered-content">
      <Row>
        <Col className={styles.content_certificate}>
          <div>
            <Image
              src="/images/resourses/IconoCertificado.png"
              alt="Certificado"
              layout="intrinsic"
              objectFit="scale-down"
              width={200}
              height={200}
            />
          </div>
          <h3 className="title">¡Felicitaciones!</h3>
          <p className="text-md ">Has completado todas las unidades de este curso.</p>
          {
            certificate && (
              <div>
                <a href={`${BUCKET_URL}${certificate}`} download target="_blank" rel="noreferrer">
                  <button className="button button--theme-primary">
                    Descargar certificado
                  </button>
                </a>
              </div>
            )
          }
        </Col>
      </Row>
    </Container>
  );
});

export default CertificateCourse;
