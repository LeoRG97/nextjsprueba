/* eslint-disable react/no-danger */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from '../courseSpecific.module.css';
import UnitCourse from './UnitCourse';

const ContentCourse = ({ course, suscrito }) => {
  return (
    <Container className="content-n-p content-blog-autor mt-5">
      <div className={styles.centered}>
        <Row>
          <Col xs={12}>
            <h1 className="title">¿Qué encontrarás en el curso?</h1>
            {
              course.unidades.map((unit) => {
                const unitLessons = course.lecciones.filter((lesson) => lesson.unidad === unit._id);
                return (
                  <UnitCourse
                    key={unit._id}
                    unit={unit}
                    lessons={unitLessons}
                    suscrito={suscrito}
                  />
                );
              })
            }
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ContentCourse;
